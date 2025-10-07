"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
export default function NewPost() {
  const [content, setContent] = useState("");
  return (
    <div className=" mt-10 border rounded-lg shadow bg-white">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <h1 className="text-xl font-semibold">Add New Post</h1>
      </div>

      <div className="grid grid-cols-2">
        <div className="px-6 mt-5">
             <label>Title</label>
          <input
            type="text"
            placeholder="Enter title here"
            className="w-full border rounded-md px-3 py-2 text-md"
          />
        </div>
        <div className="px-6 mt-5">
            <label>Posted by</label>
          <input
            type="text"
            placeholder="Enter title here"
            className="w-full border rounded-md px-3 py-2 text-md"
          />
        </div>
      </div>
        <div className="grid grid-cols-2">
        <div className="px-6 mt-5">
          <label>Meta Tags</label>
          <input
            type="text"
            placeholder="Enter title here"
            className="w-full border rounded-md px-3 py-2 text-md"
          />
        </div>
        <div className="px-6 mt-5">
            <label>Meta Description</label>
          <input
            type="text"
            placeholder="Enter title here"
            className="w-full border rounded-md px-3 py-2 text-md"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 pb-6 mt-5">
        <div className="col-span-3">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="h-96 mb-10"
            placeholder="Write your blog here..."
          />
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1 border rounded p-4">
          <h2 className="font-semibold mb-2">Categories</h2>
          <select className="w-full max-w-full border rounded px-2 py-1 text-sm">
            <option value="">-- Select Category --</option>
            <option value="tech">Technology</option>
            <option value="business">Business</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
      </div>
    </div>
  );
}
