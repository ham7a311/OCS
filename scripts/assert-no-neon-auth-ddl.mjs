#!/usr/bin/env node
/**
 * drizzle-kit generate walks every table in the TypeScript schema.
 * neon_auth is managed by Neon Auth and must stay untouched during the
 * Better Auth migration. Historical REFERENCES to neon_auth."user" in
 * already-applied migrations are allowed; new CREATE/ALTER/DROP against
 * neon_auth is not.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "drizzle");
const files = readdirSync(dir).filter((name) => name.endsWith(".sql"));
const forbidden =
  /(?:CREATE|ALTER|DROP)\s+(?:SCHEMA|TABLE)\s+"neon_auth"|DROP\s+SCHEMA\s+IF\s+EXISTS\s+"neon_auth"/i;

for (const file of files) {
  const sql = readFileSync(join(dir, file), "utf8");
  if (forbidden.test(sql)) {
    console.error(`${file} must not create, alter, or drop neon_auth.`);
    process.exit(1);
  }
}
