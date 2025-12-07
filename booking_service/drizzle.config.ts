import { defineConfig } from "drizzle-kit";
import config from "./src/configs/app.config";

export default defineConfig({
  out: "./src/external.infrastructure/pg-db/migrations",
  schema: "./src/external.infrastructure/pg-db/schema",
  dialect: "postgresql",
  dbCredentials: {
    url: config.DATABASE_URL!,
  },
});
