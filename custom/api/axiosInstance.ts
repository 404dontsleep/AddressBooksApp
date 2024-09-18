import axios from "axios";
import { Platform } from "react-native";

const axiosInstance = axios.create({
  baseURL:
    Platform.OS === "web" ? "http://localhost:3000" : "http://10.0.2.2:3000",
  validateStatus: (status) => true,
});

export default axiosInstance;
