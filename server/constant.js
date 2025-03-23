import Razorpay from "razorpay";

export const cookieOptions = {
  secure: process.env.NODE_ENV === "production", // Only send cookie over HTTPS in production
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  sameSite: "Lax",
};

export const paymentInstance = new Razorpay({
  key_id: "rzp_test_r9x0083Lr1W1nI",
  key_secret: "to6zeo3KtATuNruXklQ1uuRP",
});
