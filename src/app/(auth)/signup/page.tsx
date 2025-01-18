// <======================== page to implement the signup =====================>

// importing the required modules
import SpinnerWrapper from "@/components/partials/spinner/SpinnerWrapper";
import SignupComponent from "@/components/signup/SignupComponent";
import React from "react";

const Signup = () => {
  return (
    <div>
      <SpinnerWrapper>
        <SignupComponent />
      </SpinnerWrapper>
    </div>
  );
};

export default Signup;
