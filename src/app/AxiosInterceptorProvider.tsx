// <================================ creating a provider for the interceptor ===================>

// importing the required modules
"use client";
import { ReactNode } from "react";
import useAxiosInterceptor from "@/lib/axios/useAxiosInterceptor";

export function AxiosInterceptorProvider({
  children,
}: {
  children: ReactNode;
}) {
  useAxiosInterceptor();
  return <>{children}</>;
}
