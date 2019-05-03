import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";

const StripeBtn = () => {
  const publishableKey = "pk_test_p1ld7stU6rIRXMCQpUsxGS3Q00jyguokjd";
  const onToken = token => {
    const body = {
      amount: 999,
      token: token
    };
    axios
      .post("http://localhost:8000/payment", body)
      .then(response => {
        alert("Payment Success");
      })
      .catch(error => {
        console.log("Payment Error: ", error);
        alert("Payment Success");
      });
  };
  return (
    <StripeCheckout
      label="Upgrade" //Component button text
      name="Golf Guys" //Modal Header
      description=""
      panelLabel="Submit" //Submit button in modal
      token={onToken}
      stripeKey={publishableKey}
      billingAddress={false}
    />
  );
};

export default StripeBtn;
