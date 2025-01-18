// <========================== file to implementing login page ==================>

// importing the required modules
import AdminLoginComponent from "@/components/admin/login/AdminLogin";
import SpinnerWrapper from "@/components/partials/spinner/SpinnerWrapper";
import React from "react";

const Login = () => {
  return (
    <div>
      <SpinnerWrapper>
        <AdminLoginComponent />
      </SpinnerWrapper>
    </div>
  );
};

export default Login;
