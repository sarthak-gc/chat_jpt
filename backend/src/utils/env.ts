import { config } from "dotenv";

config();

const env = {
  DATABASE_URL: process.env.DATABASE_URL,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY,
  GOOGLE_GENERATIVE_AI_API_KEY: process.env.GOOGLE_GENERATIVE_AI_API_KEY,
  MEM0_API_KEY: process.env.MEM0_API_KEY || "",
  JWT_SECRET: process.env.JWT_SECRET || "sfsdfsdf",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || "",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID || "",
  REDIRECT_URI:
    process.env.BACKEND_URL + "/user/oauth/callback" ||
    "http://localhost:4002/user/oauth/callback",
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:5173",
  PORT: process.env.PORT || 4002,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || "",
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || "",
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || "",
  FREEPIK_API_KEY: process.env.FREEPIK_API_KEY || "",
};

export default env;
