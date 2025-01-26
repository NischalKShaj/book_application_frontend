// file to show the order

// importing the required modules
import OrderComponent from "@/components/admin/orders/OrderComponent";
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
