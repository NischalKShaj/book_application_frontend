// <================================ creating a provider for the interceptor ===================>

// importing the required modules
"use client";
import { ReactNode } from "react";
import useAxiosInterceptor from "@/lib/axios/useAxiosInterceptor";

export function AxiosInterceptorProvider({
  children,
  className,
}: {
  children: ReactNode;
  className: string;
}) {
  useAxiosInterceptor();
  return <div className={className}>{children}</div>;
}
