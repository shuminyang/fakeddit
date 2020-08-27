import dotenv from "dotenv"

process.env.NODE_ENV = process.env.NODE_ENV || "development"

const envFound = dotenv.config();
const port = process.env.PORT || 4000;

if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

const config = {
  __prod__: process.env.NODE_ENV === "production",
  port,
  dbName: process.env.DB_NAME,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
}

export default config