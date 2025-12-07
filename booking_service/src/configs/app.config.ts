import "dotenv/config";

interface Config {
  port: number;
  nodeEnv: string;
  USE_MOCK: boolean;
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  USE_MOCK: process.env.USE_MOCK === "true",
};

export default config;
