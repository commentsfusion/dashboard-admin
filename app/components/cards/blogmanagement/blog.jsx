"use client";
import Link from "next/link";
import { FiEdit, FiEye } from "react-icons/fi"; // Edit and View icons
import { FiUser } from "react-icons/fi";
import { SlCalender } from "react-icons/sl";

const blogPosts = [
  {
    id: 1,
    title: "10 Best Practices for Comment Moderation",
    author: "Sarah Johnson",
    date: "2024-08-10",
    views: 2847,
    status: "Published",
    tag: "High Engagement",
  },
  {
    id: 2,
    title: "How AI is Transforming Customer Support",
    author: "Mike Chen",
    date: null,
    views: null,
    status: "Draft",
  },
  {
    id: 3,
    title: "Comments Fusion Integration Guide",
    author: "Sarah Johnson",
    date: "2024-08-20",
    views: null,
    status: "Scheduled",
  },
];

export default function BlogManagement() {
  return (
    <div className="grid grid-col-1">
      <div className="p-6 border rounded-lg shadow-md mt-5">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-lg ">Blog Management System</h1>
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
        <div className="space-y-3">
          {blogPosts.map((post) => (
            <div
              key={post.id}
              className="border rounded-lg p-4 flex justify-between items-start md:items-center"
            >
              {/* Left side: Title and info */}
              <div className="space-y-1">
                <h2 className="text-md ">{post.title}</h2>
                <div className="flex flex-wrap gap-2 text-gray-500 text-sm items-center">
                  <span className="flex gap-1 items-center">
                    <FiUser /> {post.author}
                  </span>
                  {post.date && (
                    <span className="flex items-center gap-2">
                      <SlCalender /> {post.date}
                    </span>
                  )}
                  {post.views && (
                    <span>👁 {post.views.toLocaleString()} views</span>
                  )}
                </div>
                {/* Status badges */}
                <div className="flex gap-2 mt-2">
                  {post.status && (
                    <span
                      className={`px-2 py-1 text-xs rounded-md font-semibold ${
                        post.status === "Published"
                          ? "bg-green-100 text-green-700"
                          : post.status === "Draft"
                          ? "bg-gray-100 text-gray-700"
                          : "bg-blue-100 text-blue-700"
                      }`}
                    >
                      {post.status}
                    </span>
                  )}
                  {post.tag && (
                    <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-800 font-medium">
                      {post.tag}
                    </span>
                  )}
                </div>
              </div>

              {/* Right side: Action buttons */}
              <div className="flex gap-4 mt-3 md:mt-0">
                <button className="text-gray-600 hover:text-black">
                  <FiEdit size={18} />
                </button>
                <button className="text-gray-600 hover:text-black">
                  <FiEye size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
