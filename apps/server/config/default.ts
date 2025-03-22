import dotenv from "dotenv";

dotenv.config();

export default {
  PORT: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  // Add more configuration variables as needed
  // DATABASE_URL: process.env.DATABASE_URL
};
