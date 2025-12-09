import { defineConfig } from "drizzle-kit";
import config from "./src/configs/app.config";

export default defineConfig({
  out: "./src/external.infrastructure/postgres.database/migrations",
  schema: "./src/external.infrastructure/postgres.database/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: config.DATABASE_URL!,
  },
});
