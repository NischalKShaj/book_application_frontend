// <========================== file to implementing login page ==================>

// importing the required modules
import LoginComponent from "@/components/login/LoginComponent";
import SpinnerWrapper from "@/components/partials/spinner/SpinnerWrapper";
import React from "react";

const Login = () => {
  return (
    <div>
      <SpinnerWrapper>
        <LoginComponent />
      </SpinnerWrapper>
    </div>
  );
};

export default Login;
