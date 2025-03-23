// <=========================================== file for admin dashboard ==================>

// importing the required modules
import OrderPerDay from "@/components/graphs/OrderPerDay";
import TopProduct from "@/components/graphs/TopProduct";
import React from "react";

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 ml-20">
        Admin Dashboard
      </h1>
      <div className="flex justify-start">
        {/* Moves slightly left */}
        <TopProduct />
        <OrderPerDay />
      </div>
    </div>
  );
};

export default AdminDashboard;
