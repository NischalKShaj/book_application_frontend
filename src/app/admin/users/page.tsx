// file to show the users page

// importing the required modules
import UserComponent from "@/components/admin/user/UserComponent";
import SpinnerWrapper from "@/components/partials/spinner/SpinnerWrapper";
import React from "react";

const page = () => {
  return (
    <div>
      <SpinnerWrapper>
        <UserComponent />
      </SpinnerWrapper>
    </div>
  );
};

export default page;
