import "dotenv/config";
interface IDotEnv {
  PORT: number;
  MONGODB_URI: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  SALT: string;
  SMTP_EMAIL: string;
  SMTP_PASSWORD: string;
}
const config: IDotEnv = {
  PORT: 0,
  MONGODB_URI: "",
  JWT_SECRET: "",
  JWT_EXPIRES_IN: "",
  SALT: "",
  SMTP_EMAIL: "",
  SMTP_PASSWORD: "",
};
try {
  config.PORT = process.env.PORT ? parseInt(process.env.PORT) : 5000;
  config.MONGODB_URI = process.env.MONGODB_URI as string;
  config.JWT_SECRET = process.env.JWT_SECRET as string;
  config.JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN as string;
  config.SALT = process.env.SALT as string;
  config.SMTP_EMAIL = process.env.SMTP_EMAIL as string;
  config.SMTP_PASSWORD = process.env.SMTP_PASSWORD as string;
} catch (error) {
  console.log(error);
}
export default config;
