"use client";
import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { FiEdit, FiEye, FiUser } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";
import { blogAPI } from "../../../Apis/blog";
import toast from "react-hot-toast";

export default function BlogManagement() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await blogAPI.LIST(1); // API call
      let posts = response?.items || [];
      posts = posts.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setItems(posts.slice(0, 3));
    } catch (err) {
      console.error("API Error:", err);
      setError(err?.message || "An error occurred");
      toast.error("Failed to fetch blog posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="grid grid-col-1">
      <div className="p-6 border rounded-lg shadow-md mt-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-lg font-semibold">Blog Management System</h1>
            <p className="text-gray-500 text-sm">
              Create, edit, and publish blog posts directly
            </p>
          </div>
          <Link
            href="/dashboard/blog-post"
            className="bg-black text-sm text-white md:px-4 md:py-2 py-1 px-2 rounded-md gap-1"
          >
            + New Post
          </Link>
        </div>

        {/* Blog Posts List */}
        {loading ? (
          <div className="text-center py-6 text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-center py-6 text-red-400">{error}</div>
        ) : items.length === 0 ? (
          <div className="text-center py-6 text-gray-400">
            No posts available.
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((post) => (
              <div
                key={post._id}
                className="border rounded-lg p-4 flex justify-between items-start md:items-center"
              >
                <div className="space-y-1">
                  <h2 className="text-md font-semibold">{post.title}</h2>
                  <div className="flex flex-wrap gap-2 text-gray-500 text-sm items-center">
                    <span className="flex gap-1 items-center">
                      <FiUser /> {post.postedBy || "Unknown"}
                    </span>
                    {post.createdAt && (
                      <span className="flex items-center gap-2">
                        <SlCalender />{" "}
                        {new Date(post.createdAt).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-md font-medium">
                      {post.category || "General"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
