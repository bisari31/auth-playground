export const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";
export const JWT_REFRESH_SECRET =
  process.env.JWT_REFRESH_SECRET || "default_refresh_secret_key";

export const ACCESS_TOKEN_EXPIRES_IN = 60 * 10; // 10분
export const REFRESH_TOKEN_EXPIRES_IN = 60 * 60 * 24 * 7; // 7일
