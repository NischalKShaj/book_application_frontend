// <==================== creating custom hook for the axios interceptor ==============>

// importing the required modules
"use client";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import axiosInstance from "./axiosInstance";

const useAxiosInterceptor = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isAdminPage = pathname?.startsWith("/admin");
      const requestInterceptor = axiosInstance.interceptors.request.use(
        (config) => {
          const token = localStorage.getItem(
            isAdminPage ? "admin_access_token" : "access_token"
          );
          if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;
          }

          if (
            config.data instanceof FormData &&
            !config.headers["Content-Type"]
          ) {
            config.headers["Content-Type"] = "multipart/form-data";
          } else if (!config.headers["Content-Type"]) {
            config.headers["Content-Type"] = "application/json";
          }

          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );

      const responseInterceptor = axiosInstance.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          if (error.response && error.response.status === 401) {
            router.push("/login");
          }
          return Promise.reject(error);
        }
      );

      // clean up function
      return () => {
        axiosInstance.interceptors.request.eject(requestInterceptor);
        axiosInstance.interceptors.response.eject(responseInterceptor);
      };
    }
  }, [router]);
};

export default useAxiosInterceptor;
