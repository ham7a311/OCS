#!/usr/bin/env node
/**
 * drizzle-kit generate walks every table in the TypeScript schema.
 * neon_auth is managed by Neon Auth — generated SQL must never create or
 * alter it. Cross-schema REFERENCES to neon_auth."user" are allowed.
 */
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const dir = join(process.cwd(), "drizzle");
const files = readdirSync(dir).filter((name) => name.endsWith(".sql"));
const forbidden =
  /CREATE\s+SCHEMA\s+"neon_auth"|CREATE\s+TABLE\s+"neon_auth"|ALTER\s+TABLE\s+"neon_auth"/i;

for (const file of files) {
  const sql = readFileSync(join(dir, file), "utf8");
  if (forbidden.test(sql)) {
    console.error(`${file} must not create or alter neon_auth.`);
    process.exit(1);
  }
}
