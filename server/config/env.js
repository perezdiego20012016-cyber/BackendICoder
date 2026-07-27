import "dotenv/config";
export const env = {
  port: Number(process.env.PORT) || 8080,
  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/ecommerce",
  persistence: (process.env.PERSISTENCE || "MONGO").toUpperCase(),
};
