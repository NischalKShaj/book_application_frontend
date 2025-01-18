// <======================= file to show the products ========================>

// importing the required modules
import SpinnerWrapper from "@/components/partials/spinner/SpinnerWrapper";
import ProductComponent from "@/components/product/ProductComponent";
import React from "react";

const Product = () => {
  return (
    <div>
      <SpinnerWrapper>
        <ProductComponent />
      </SpinnerWrapper>
    </div>
  );
};

export default Product;
