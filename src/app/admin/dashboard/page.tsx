// <======================== file for creating the admin login ======================>

// importing the required modules
import AdminDashboard from "@/components/admin/dashboard/AdminDashboard";
import SpinnerWrapper from "@/components/partials/spinner/SpinnerWrapper";
import React from "react";

const Dashboard = () => {
  return (
    <div>
      <SpinnerWrapper>
        <AdminDashboard />
      </SpinnerWrapper>
    </div>
  );
};

export default Dashboard;
