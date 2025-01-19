// <======================== component for showing the address =============>

// importing the required modules
import AddressComponent from "@/components/address/AddressComponent";
import SpinnerWrapper from "@/components/partials/spinner/SpinnerWrapper";
import React from "react";

const page = () => {
  return (
    <div>
      <SpinnerWrapper>
        <AddressComponent />
      </SpinnerWrapper>
    </div>
  );
};

export default page;
