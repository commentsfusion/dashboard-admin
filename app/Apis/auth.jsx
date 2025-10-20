import axiosInstance from "../utils/axios/axiosInstance";
import { ENDPOINTS } from "@/app/constant/apiEndpoints/endpoints";

export const authAPI = {
  LOGIN: async (payload) => {
    try {
      // payload = { email, password }
      const response = await axiosInstance.post(ENDPOINTS.LOGIN.DATA, payload);

      // Extract token and user from response
      const { token, user, success, message } = response.data;

      // ✅ If login is successful and token exists
      if (success && token) {
        // Save token in localStorage for interceptor
        localStorage.setItem("token", token);

        // Optional: also store user info if needed later
        localStorage.setItem("userInfo", JSON.stringify(user));

        // 🔍 Log to console so you can confirm
        console.log("✅ Token stored successfully:", token);
      } else {
        console.warn("⚠️ No token found in login response:", response.data);
      }

      return response.data;
    } catch (error) {
      console.error("❌ Login error:", error);
      throw error.response?.data || { message: "Login failed" };
    }
  },

  ADDUSER: async (payload) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.ADDUSER.DATA,
        payload
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  },
  VERIFY: async (payload) => {
    try {
      const response = await axiosInstance.post(
        ENDPOINTS.ADDUSER.VERIFY,
        payload
      );
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  },
  MEE: async () => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.ME.DATA);
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Login failed" };
    }
  },
};
