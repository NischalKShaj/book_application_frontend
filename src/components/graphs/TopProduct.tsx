/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
// file to create the graphs for the admin dashboard

// importing the required modules
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts"; // ✅ Import ApexOptions
import axiosInstance from "@/lib/axios/axiosInstance";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const TopProduct = () => {
  const [chartData, setChartData] = useState<{
    series: { name: string; data: number[] }[];
    options: ApexOptions;
  }>({
    series: [{ name: "Total Sales", data: [] }],
    options: {
      chart: { type: "bar", height: 350 },
      xaxis: { categories: [] },
    },
  });

  // for fetching the data for the top product graph
  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/admin/top-product-graph");
      if (response.status === 200) {
        console.log("response", response.data);
        const products = response.data; // Ensure it's an array
        if (!Array.isArray(products) || products.length === 0) {
          console.warn("No products found.");
          return;
        }

        const productNames = products.map((p: any) => p.bookName);
        const salesData = products.map((p: any) => p.totalSales);

        console.log("Products:", productNames); // Debugging

        setChartData({
          series: [{ name: "Total Sales", data: salesData }],
          options: {
            chart: { type: "bar", height: 350, toolbar: { show: false } },
            xaxis: {
              categories: [...new Set(productNames)],
              labels: {
                style: { fontSize: "12px", fontWeight: "bold" },
              },

              title: { text: "Books" },
            },
            yaxis: {
              labels: { style: { fontSize: "14px", fontWeight: "bold" } },
              title: { text: "Price (₹)" },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "60%", // Reduced columnWidth to increase gap
                borderRadius: 3,
              },
            },
            dataLabels: { enabled: false },
            colors: ["#4F46E5"],
          },
        });
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="p-6 bg-gray-300 shadow-lg rounded-lg w-[500px] ml-20">
      <h2 className="text-2xl font-bold text-  text-gray-800 mb-4">
        📊 Top Selling Books
      </h2>
      <div className="flex justify-start">
        <ApexChart
          options={chartData.options}
          series={chartData.series}
          type="bar"
          height={350}
          width="100%"
        />
      </div>
    </div>
  );
};

export default TopProduct;
