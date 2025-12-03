export const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4002";

export const GOOGLE_OAUTH_CALLBACK_URL =
  import.meta.env.VITE_GOOGLE_OAUTH_CALLBACK_URL ||
  "http://localhost:4002/user/oauth/callback";

export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || "";
