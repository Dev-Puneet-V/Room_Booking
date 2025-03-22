export const cookieOptions = {
  secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  sameSite: "none",
};
