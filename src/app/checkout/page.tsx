// <================== file to show the checkout page for the application ===========>

// importing the required modules
import CheckoutComponent from "@/components/checkout/CheckoutComponent";
import SpinnerWrapper from "@/components/partials/spinner/SpinnerWrapper";
import React from "react";

const page = () => {
  return (
    <div>
      <SpinnerWrapper>
        <CheckoutComponent />
      </SpinnerWrapper>
    </div>
  );
};

export default page;
