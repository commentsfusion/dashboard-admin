import axiosInstance from "../utils/axios/axiosInstance";
import { ENDPOINTS } from "@/app/constant/apiEndpoints/endpoints";

export const authAPI = {
  LOGIN: async (payload) => {
    try {
      // payload = { email, password }
      const response = await axiosInstance.post(ENDPOINTS.LOGIN.DATA, payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  },
  ADDUSER: async (payload) => {
    try {
   
      const response = await axiosInstance.post(ENDPOINTS.ADDUSER.DATA, payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  },
   VERIFY: async (payload) => {
    try {
   
      const response = await axiosInstance.post(ENDPOINTS.ADDUSER.VERIFY, payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  },
};
