// <================ component for showing footer according to the route ===========>
"use client";

// importing the required
import { usePathname } from "next/navigation";
import React from "react";
import Footer from "./Footer";

const ConditionalFooter = () => {
  const pathname = usePathname();
  const isAdminFooter = pathname.startsWith("/admin");
  return isAdminFooter ? "" : <Footer />;
};

export default ConditionalFooter;
