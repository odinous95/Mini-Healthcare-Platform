import "dotenv/config";

interface Config {
  port: number;
  nodeEnv: string;
  USE_MOCK: boolean;
  DATABASE_URL: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  USE_MOCK: process.env.USE_MOCK === "true",
  DATABASE_URL: process.env.DATABASE_URL || "",
};

export default config;
