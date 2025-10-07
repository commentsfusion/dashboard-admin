// Apis/users.js
import axiosInstance from "../utils/axios/axiosInstance";
import { ENDPOINTS } from "@/app/constant/apiEndpoints/endpoints";

export const Users = {
  USER: async (page = 1) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.USER.DATA, {
        params: { page },
      });
      return response.data;
    } catch (error) {
      throw error?.response?.data || { message: "User Data Fetch" };
    }
  },

  SEARCH: async ({ q, page = 1 }) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.USER.SEARCH, {
        params: { q, page },
      });
      return response.data;
    } catch (error) {
      throw error?.response?.data || { message: "User Search Fetch" };
    }
  },

    ROLE: async (payload) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.USER.ROLE, payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
    
  },
  DELETE: async (payload) => {
    try {
      const response = await axiosInstance.post(ENDPOINTS.USER.DELETE, payload);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  }

};
