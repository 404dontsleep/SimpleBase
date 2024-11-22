import "dotenv/config";
interface IDotEnv {
  PORT: number;
  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  JWT_COOKIE_EXPIRES_IN: string;
}
const config: IDotEnv = {
  PORT: 0,
  MONGODB_URI: "",
  JWT_SECRET: "",
  JWT_EXPIRES_IN: "",
  JWT_COOKIE_EXPIRES_IN: "",
};
try {
  config.PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
  config.MONGODB_URI = process.env.MONGODB_URI as string;
  config.JWT_SECRET = process.env.JWT_SECRET as string;
  config.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;
  config.JWT_COOKIE_EXPIRES_IN = process.env.JWT_COOKIE_EXPIRES_IN as string;
} catch (error) {
  console.log(error);
}
export default config;
