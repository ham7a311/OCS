import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth/server";
import { isOAuthSignInRequest, limitOAuthStart } from "@/lib/rate-limit";

const { GET, POST: betterAuthPost } = toNextJsHandler(auth);

export { GET };

export async function POST(request: Request) {
  if (isOAuthSignInRequest(request)) {
    const limited = await limitOAuthStart(request);
    if (!limited.ok) {
      return new Response("Too many sign-in attempts. Please wait a few minutes and try again.", {
        status: 429,
        headers: {
          "Retry-After": String(limited.retryAfterSeconds),
          "Content-Type": "text/plain; charset=utf-8",
        },
      });
    }
  }

  return betterAuthPost(request);
}
