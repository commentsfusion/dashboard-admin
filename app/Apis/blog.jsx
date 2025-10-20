// Apis/blog.js
import axiosInstance from "../utils/axios/axiosInstance";
import { ENDPOINTS } from "@/app/constant/apiEndpoints/endpoints";

export const blogAPI = {
  CREATE: async (formData) => {
    return axiosInstance.post(ENDPOINTS.BLOGS.CREATE, formData, {
      headers: {
        // Let axios set proper boundary; still force multipart to override any defaults
        "Content-Type": "multipart/form-data",
      },
      // IMPORTANT: don’t stringify FormData
      transformRequest: (data) => data,
    }).then(r => r.data)
      .catch(err => {
        console.error("❌ Blog create error:", err);
        throw err?.response?.data || { message: "Create blog failed" };
      });
  },
  LIST: async (page = 1) => {
    try {
      const response = await axiosInstance.get(ENDPOINTS.BLOGS.LIST, {
        params: { page },
      });
      return response.data;
    } catch (error) {
      throw error?.response?.data || { message: "User Data Fetch" };
    }
  },
  DELETE_BY_SLUG: async (slug) => {
    try {
      const response = await axiosInstance.delete(`${ENDPOINTS.BLOGS.DELETE}/${slug}`);
      return response.data;
    } catch (error) {
      throw error?.response?.data || { message: "Delete blog failed" };
    }
  },
  DETAIL: async (slug) => {
    try {
      const response = await axiosInstance.get(`${ENDPOINTS.BLOGS.DETAIL}/${slug}`);
      return response.data;
    } catch (error) {
      throw error?.response?.data || { message: "Fetch blog detail failed" };
    }
  },
  UPDATE: async (slug, formData) => {
    return axiosInstance.post(`${ENDPOINTS.BLOGS.UPDATE}/${slug}`, formData, {
      headers: {
        // Let axios set proper boundary; still force multipart to override any defaults
        "Content-Type": "multipart/form-data",
      },
      // IMPORTANT: don’t stringify FormData
      transformRequest: (data) => data,
    }).then(r => r.data)
      .catch(err => {
        console.error("❌ Blog update error:", err);
        throw err?.response?.data || { message: "Update blog failed" };
      });
  }

};

