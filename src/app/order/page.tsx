// <================ file for loading the order history page ==========>

// importing the required modules
import OrderComponent from "@/components/order/OrderComponent";
import SpinnerWrapper from "@/components/partials/spinner/SpinnerWrapper";
import React from "react";

const page = () => {
  return (
    <div>
      <SpinnerWrapper>
        <OrderComponent />
      </SpinnerWrapper>
    </div>
  );
};

export default page;
