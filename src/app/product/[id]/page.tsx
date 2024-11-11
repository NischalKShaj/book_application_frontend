// <================= component for showing the individual product page =================>

// importing the required modules
import SingleProductComp from "@/components/product/product_id/SingleProductComp";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const singleProduct = async ({ params }: Props) => {
  const { id } = await params;
  return <SingleProductComp id={id} />;
};

export default singleProduct;
