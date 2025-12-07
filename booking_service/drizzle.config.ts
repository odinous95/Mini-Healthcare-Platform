import { defineConfig } from "drizzle-kit";
import config from "./src/configs/app.config";

export default defineConfig({
  out: "./src/external.infrastructure/db-pg/migrations",
  schema: "./src/external.infrastructure/db-pg/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: config.DATABASE_URL!,
  },
});
