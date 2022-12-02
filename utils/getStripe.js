import { Stripe, loadStripe } from "@stripe/stripe-js";

let stripePromise;
const getStripe = () => {
  if (!stripePromise) {
    const secretKey =
      "pk_test_51LSkosJBjJajf7w2Rtg9RhHtGp7NJf3AOaunrKbsSOiSPxwx8Qo2cglCPP3392JF1UmknXRJdeifgumTDmdHuOhf001yryjkYZ";
    // stripePromise = loadStripe(process.env.TEST_PUBLISHABLE_KEY);
    stripePromise = loadStripe(secretKey);
  }
  return stripePromise;
};

export default getStripe;
