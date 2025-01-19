// <==================== file for the profile component ============>

// importing the required modules
import SpinnerWrapper from "@/components/partials/spinner/SpinnerWrapper";
import ProfileComponent from "@/components/profile/ProfileComponent";
import React from "react";

const page = () => {
  return (
    <div>
      <SpinnerWrapper>
        <ProfileComponent />
      </SpinnerWrapper>
    </div>
  );
};

export default page;
