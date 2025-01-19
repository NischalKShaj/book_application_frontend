// <=================== file for the otp submission ===========>

// importing the required modules
import OtpComponent from "@/components/otp/OtpComponent";
import SpinnerWrapper from "@/components/partials/spinner/SpinnerWrapper";
import React from "react";

const page = () => {
  return (
    <div>
      <SpinnerWrapper>
        <OtpComponent />
      </SpinnerWrapper>
    </div>
  );
};

export default page;
