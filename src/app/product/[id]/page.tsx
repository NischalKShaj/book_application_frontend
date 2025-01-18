// <================= component for showing the individual product page =================>

// importing the required modules
import SpinnerWrapper from "@/components/partials/spinner/SpinnerWrapper";
import SingleProductComp from "@/components/product/product_id/SingleProductComp";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const singleProduct = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <SpinnerWrapper>
      <SingleProductComp id={id} />
    </SpinnerWrapper>
  );
};

export default singleProduct;
