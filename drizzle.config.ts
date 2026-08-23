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
  // generate walks the TypeScript schema. neon_auth is not imported, so it is
  // never emitted. Keep it out of schemaFilter as a second guard.
  schemaFilter: ["public", "auth"],
  dbCredentials: {
    url: process.env.DATABASE_URL_UNPOOLED,
  },
});
