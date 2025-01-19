// <================== for showing the contact us page =============>

// importing the required modules
import ContactComponent from "@/components/contact/ContactComponent";
import SpinnerWrapper from "@/components/partials/spinner/SpinnerWrapper";
import React from "react";

const page = () => {
  return (
    <div>
      <SpinnerWrapper>
        <ContactComponent />
      </SpinnerWrapper>
    </div>
  );
};

export default page;
