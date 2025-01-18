import AddProduct from "@/components/admin/products/addProduct/AddProduct";
import SpinnerWrapper from "@/components/partials/spinner/SpinnerWrapper";
import React from "react";

const page = () => {
  return (
    <div>
      <SpinnerWrapper>
        <AddProduct />
      </SpinnerWrapper>
    </div>
  );
};

export default page;
