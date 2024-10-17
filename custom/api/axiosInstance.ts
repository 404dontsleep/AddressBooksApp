import axios from "axios";
import { Platform } from "react-native";

const axiosInstance = axios.create({
  baseURL: "http://192.168.137.1:3000",
  // Platform.OS === "web" ? "http://localhost:3000" : "http://10.0.2.2:3000",
  validateStatus: (status) => true,
});

export default axiosInstance;
