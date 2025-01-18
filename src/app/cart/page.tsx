// file for cart

// importing the required modules
import CartComponents from "@/components/cart/CartComponents";
import SpinnerWrapper from "@/components/partials/spinner/SpinnerWrapper";
import React from "react";

const page = () => {
  return (
    <div>
      <SpinnerWrapper>
        <CartComponents />
      </SpinnerWrapper>
    </div>
  );
};

export default page;
