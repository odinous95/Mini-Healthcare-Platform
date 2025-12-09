import "dotenv/config";

interface Config {
  port: number;
  nodeEnv: string;
  USE_MOCK: string;
  DATABASE_URL: string;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  USE_MOCK: process.env.USE_MOCK!,
  DATABASE_URL: process.env.DATABASE_URL || "",
};

export default config;
