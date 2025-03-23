/* eslint-disable @typescript-eslint/no-explicit-any */
// <========================== file to show the most order per day ================>
"use client";

// importing the required modules
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts"; // ✅ Import ApexOptions
import axiosInstance from "@/lib/axios/axiosInstance";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

const OrderPerDay = () => {
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
      const response = await axiosInstance.get("/admin/most-order-per-day");
      if (response.status === 200) {
        console.log("response", response.data);
        const dailyData = response.data;

        if (!Array.isArray(dailyData) || dailyData.length === 0) {
          console.warn("No daily data found.");
          return;
        }

        const dates = dailyData.map((day: any) =>
          new Date(day.date).toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
          })
        );
        const sales = dailyData.map((day: any) => day.totalSales);

        setChartData({
          series: [{ name: "Total Sales", data: sales }],
          options: {
            chart: { type: "bar", height: 350, toolbar: { show: false } },
            xaxis: {
              categories: dates,
              labels: {
                style: { fontSize: "12px", fontWeight: "bold" },
              },
              title: { text: "Days" },
            },
            yaxis: {
              labels: { style: { fontSize: "14px", fontWeight: "bold" } },
              title: { text: "Total Sales" },
            },
            plotOptions: {
              bar: {
                horizontal: false,
                columnWidth: "60%",
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
      <h2 className="text-2xl font-bold text-gray-800 mb-4">📊 Weekly Sales</h2>
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

export default OrderPerDay;
