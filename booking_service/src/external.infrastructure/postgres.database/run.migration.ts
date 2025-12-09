import { migrate } from "drizzle-orm/node-postgres/migrator";
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

async function runMigrations() {
  try {
    console.log("Starting database migrations...");
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool);
    migrate(db, {
      migrationsFolder: "./src/external.infrastructure/pg.db/migrations",
    });
    console.log("Database migrations completed successfully.");
    pool.end();
  } catch (error) {
    console.error("Error during database migrations:", error);
  }
}

runMigrations();
