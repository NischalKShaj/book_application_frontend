// <=========================== component for showing the products ==================>

// importing the required modules
import AdminProductsPage from "@/components/admin/products/AdminProductsPage";
import SpinnerWrapper from "@/components/partials/spinner/SpinnerWrapper";
import React from "react";

const AdminProducts = () => {
  return (
    <div>
      <SpinnerWrapper>
        <AdminProductsPage />
      </SpinnerWrapper>
    </div>
  );
};

export default AdminProducts;
