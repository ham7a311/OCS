import "server-only";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Distributed rate limits via Upstash Redis (atomic sliding windows).
 *
 * Failure policy:
 * - Profile writes: fail CLOSED if env is missing or Redis errors/times out.
 *   Abuse protection must not be bypassed by an outage.
 * - OAuth initiation: fail OPEN if env is missing or Redis errors/times out.
 *   A Redis blip must not permanently block Google/Microsoft/GitHub sign-in.
 *
 * Never log UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN.
 */

const PROFILE_ERROR =
  "Too many save attempts. Please wait a few minutes and try again.";
const PROFILE_UNAVAILABLE_ERROR =
  "Your profile could not be saved right now. Please try again in a moment.";

type RedisEnv = { url: string; token: string };

function redisEnv(): RedisEnv | null {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();
  if (!url || !token) return null;
  return { url, token };
}

let profileLimiter: Ratelimit | null = null;
let oauthLimiter: Ratelimit | null = null;

function getProfileLimiter(): Ratelimit | null {
  const env = redisEnv();
  if (!env) return null;
  if (!profileLimiter) {
    profileLimiter = new Ratelimit({
      redis: new Redis({ url: env.url, token: env.token }),
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "ocs:profile",
      // Do not fail-open on hang; timeout is treated as a closed failure below.
      timeout: 3_000,
      analytics: false,
    });
  }
  return profileLimiter;
}

function getOauthLimiter(): Ratelimit | null {
  const env = redisEnv();
  if (!env) return null;
  if (!oauthLimiter) {
    oauthLimiter = new Ratelimit({
      redis: new Redis({ url: env.url, token: env.token }),
      limiter: Ratelimit.slidingWindow(10, "10 m"),
      prefix: "ocs:oauth",
      timeout: 3_000,
      analytics: false,
    });
  }
  return oauthLimiter;
}

function retryAfterSeconds(resetMs: number): number {
  return Math.max(1, Math.ceil((resetMs - Date.now()) / 1000));
}

/**
 * 5 profile saves per authenticated Better Auth user id per 10 minutes.
 * Identifier must be the verified session user id — never a client-supplied id.
 */
export async function limitProfileWrite(
  userId: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const limiter = getProfileLimiter();
  if (!limiter) {
    console.error("Profile rate limit is not configured (UPSTASH_REDIS_REST_URL / UPSTASH_REDIS_REST_TOKEN).");
    return { ok: false, error: PROFILE_UNAVAILABLE_ERROR };
  }

  try {
    const result = await limiter.limit(userId);
    if (!result.success || result.reason === "timeout") {
      if (result.reason === "timeout") {
        console.error("Profile rate limit timed out contacting Upstash; refusing the write.");
        return { ok: false, error: PROFILE_UNAVAILABLE_ERROR };
      }
      return { ok: false, error: PROFILE_ERROR };
    }
    return { ok: true };
  } catch (error) {
    console.error("Profile rate limit failed; refusing the write.", error instanceof Error ? error.message : "unknown");
    return { ok: false, error: PROFILE_UNAVAILABLE_ERROR };
  }
}

/**
 * Client IP for OAuth initiation limits.
 *
 * On Vercel, `x-vercel-forwarded-for` is set by the platform and is the
 * identifier to use. `x-forwarded-for` is not used: clients can send that
 * header, and if a proxy appends rather than replaces, the first hop is
 * spoofable. `x-real-ip` is only read when `VERCEL=1`, where Vercel sets it.
 *
 * Locally (no Vercel headers) every caller shares `"unknown"` — a stricter
 * shared bucket, not an open bypass.
 */
export function clientIp(headers: Headers): string {
  const vercel = headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim();
  if (vercel) return vercel;

  if (process.env.VERCEL === "1") {
    const realIp = headers.get("x-real-ip")?.trim();
    if (realIp) return realIp;
  }

  return "unknown";
}

export function isOAuthSignInRequest(request: Request): boolean {
  if (request.method !== "POST") return false;
  try {
    const pathname = new URL(request.url).pathname;
    return pathname === "/api/auth/sign-in/social" || pathname.endsWith("/sign-in/social");
  } catch {
    return false;
  }
}

/**
 * 10 OAuth initiation attempts per client IP per 10 minutes.
 * Fail-open: a Redis outage must not block sign-in.
 */
export async function limitOAuthStart(
  request: Request,
): Promise<{ ok: true } | { ok: false; retryAfterSeconds: number }> {
  const limiter = getOauthLimiter();
  if (!limiter) {
    console.error("OAuth rate limit is not configured; allowing sign-in (fail-open).");
    return { ok: true };
  }

  try {
    const result = await limiter.limit(clientIp(request.headers));
    if (result.reason === "timeout") {
      console.error("OAuth rate limit timed out contacting Upstash; allowing sign-in (fail-open).");
      return { ok: true };
    }
    if (!result.success) {
      return { ok: false, retryAfterSeconds: retryAfterSeconds(result.reset) };
    }
    return { ok: true };
  } catch (error) {
    console.error("OAuth rate limit failed; allowing sign-in (fail-open).", error instanceof Error ? error.message : "unknown");
    return { ok: true };
  }
}
