interface Config {
  port: number;
  mongoUrl: string;
}

const config: Config = {
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  mongoUrl: process.env.MONGO_URL || "",
};

export default config;
