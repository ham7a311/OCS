import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });

if (!process.env.DATABASE_URL_UNPOOLED) {
  throw new Error("DATABASE_URL_UNPOOLED is not set in .env.local");
}

export default defineConfig({
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  // push / pull / introspect only. generate still walks the TypeScript schema;
  // neon_auth.user is intentionally unexported so generate skips it.
  schemaFilter: ["public"],
  tablesFilter: ["profiles", "profile_consent_events"],
  dbCredentials: {
    url: process.env.DATABASE_URL_UNPOOLED,
  },
});
