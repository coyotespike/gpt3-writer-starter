import { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { Grid, Stack, Box } from "@mui/material";

import getStripe from "./getStripe";
import ElementsForm from "../../components/CheckoutForm";

const CheckoutPage = () => {
  const [paymentIntent, setPaymentIntent] = useState(null);

  const fetchPaymentIntent = async () => {
    const response = await fetch("/api/secret");
    const data = await response.json();
    setPaymentIntent(data.clientSecret);
  };
  useEffect(() => {
    fetchPaymentIntent();
  }, []);

  const appearance = {
    variables: {
      fontFamily: ' "Gill Sans", sans-serif',
      fontLineHeight: "2",
      borderRadius: "10px",
      colorBackground: "#F6F8FA",
      colorPrimaryText: "#262626",
    },
    rules: {
      ".Block": {
        backgroundColor: "var(--colorBackground)",
        boxShadow: "none",
      },
      ".Input:disabled, .Input--invalid:disabled": {
        color: "lightgray",
      },
      ".Tab": {
        padding: "10px 12px 8px 12px",
        border: "none",
      },
      ".Tab:hover": {
        border: "none",
        boxShadow:
          "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Tab--selected, .Tab--selected:focus, .Tab--selected:hover": {
        border: "none",
        backgroundColor: "#fff",
        boxShadow:
          "0 0 0 1.5px var(--colorPrimaryText), 0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 7px rgba(18, 42, 66, 0.04)",
      },
      ".Label": {
        fontWeight: "500",
      },
    },
  };
  return (
    <Stack alignItems="center" spacing={4}>
      {paymentIntent ? (
        <Box>
          <Elements
            stripe={getStripe()}
            options={{
              appearance,
              clientSecret: paymentIntent,
            }}
          >
            <ElementsForm />
          </Elements>
        </Box>
      ) : (
        <p>Loading...</p>
      )}
    </Stack>
  );
};

export default CheckoutPage;
