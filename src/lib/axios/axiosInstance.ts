// <========================= file to create the axios interceptors =====================>

// importing the required modules
import axios from "axios";

// creating the instance
const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default axiosInstance;
