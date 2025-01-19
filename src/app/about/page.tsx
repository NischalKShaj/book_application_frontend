// <====================== file for creating the about page ===========>

// importing the required modules
import AboutComponent from "@/components/about/AboutComponent";
import SpinnerWrapper from "@/components/partials/spinner/SpinnerWrapper";
import React from "react";

const page = () => {
  return (
    <div>
      <SpinnerWrapper>
        <AboutComponent />
      </SpinnerWrapper>
    </div>
  );
};

export default page;
