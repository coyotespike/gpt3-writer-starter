const stripe = require("stripe")(process.env.TEST_STRIPE_SECRET_KEY);

async function CreateStripeSession(req, res) {
  // const { item } = JSON.parse(req.body);

  const redirectURL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "https://robotcard.vercel.app/";

  console.log("contacting stripe");

  const paymentIntent = await stripe.paymentIntents.create({
    amount: 1099,
    currency: "usd",
    automatic_payment_methods: { enabled: true },
  });

  res.status(200).json({ clientSecret: paymentIntent.client_secret });
}

export default CreateStripeSession;
