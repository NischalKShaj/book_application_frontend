// file to set the header according to the routes
"use client";

// importing the required modules
import React from "react";
import { usePathname } from "next/navigation";
import Header from "./Header";
import AdminHeader from "./AdminHeader";

const ConditionalHeader = () => {
  const pathname = usePathname();

  // checking if the path starts with admin or not
  const isPathAdmin = pathname.startsWith("/admin");

  return isPathAdmin ? <AdminHeader /> : <Header />;
};

export default ConditionalHeader;
