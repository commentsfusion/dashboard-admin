"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { blogAPI } from "../../../Apis/blog";
import { toast } from "react-hot-toast";

export default function NewPost() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    postedBy: "",
    metaTags: "",          // comma-separated
    metaDescription: "",   // short SEO text (≤ 300 chars)
    category: "",
  });
  const [content, setContent] = useState(""); // full HTML from Quill
  const [coverFile, setCoverFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    if (!form.title.trim()) { toast.error("Title is required"); return false; }
    if (!content || content.trim() === "" || content === "<p><br></p>") {
      toast.error("Content is required"); return false;
    }
    return true;
  };

  const buildPayload = () => {
    const fd = new FormData();
    fd.append("title", form.title);
    if (form.postedBy) fd.append("postedBy", form.postedBy);
    if (form.metaTags) fd.append("metaTags", form.metaTags); // backend normalizes
    if (form.metaDescription) fd.append("metaDescription", form.metaDescription);
    if (form.category) fd.append("category", form.category);
    if (content) fd.append("content", content);               // <-- keep HTML as-is
    if (coverFile) fd.append("coverImage", coverFile);        // matches upload.single("coverImage")
    return fd;
  };

  const resetForm = () => {
    setForm({ title:"", postedBy:"", metaTags:"", metaDescription:"", category:"" });
    setContent("");
    setCoverFile(null);
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onFile = (e) => {
    const f = e.target.files?.[0];
    if (f) setCoverFile(f);
  };

  const addBlog = async (e) => {
    e.preventDefault();
    if (loading) return;
    if (!validate()) return;

    try {
      setLoading(true);
      const res = await blogAPI.CREATE(buildPayload());
      if (!res?.success) throw new Error(res?.message || "Failed to create blog");

      toast.success(res?.message || "Blog created");
      resetForm();
      router.push("/dashboard/blog");  // choose your success route
    } catch (err) {
      toast.error(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={addBlog} className="mt-10 border rounded-lg shadow bg-white">
      {/* Header */}
      <div className="border-b px-6 py-4">
        <h1 className="text-xl font-semibold">Add New Post</h1>
      </div>

      <div className="grid grid-cols-2 gap-6 px-6 mt-5">
        <div>
          <label className="block text-sm mb-1">Title *</label>
          <input name="title" value={form.title} onChange={onChange}
            type="text" placeholder="Enter title here"
            className="w-full border rounded-md px-3 py-2 text-md" />
        </div>

        <div>
          <label className="block text-sm mb-1">Posted by</label>
          <input name="postedBy" value={form.postedBy} onChange={onChange}
            type="text" placeholder="Author or user id"
            className="w-full border rounded-md px-3 py-2 text-md" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 px-6 mt-5">
        <div>
          <label className="block text-sm mb-1">Meta Tags (comma-separated)</label>
          <input name="metaTags" value={form.metaTags} onChange={onChange}
            type="text" placeholder="ai, linkedin, marketing"
            className="w-full border rounded-md px-3 py-2 text-md" />
        </div>

        <div>
          <label className="block text-sm mb-1">Meta Description (≤ 300 chars)</label>
          <input name="metaDescription" value={form.metaDescription} onChange={onChange}
            type="text" placeholder="Short SEO summary"
            className="w-full border rounded-md px-3 py-2 text-md" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 pb-6 mt-5">
        <div className="col-span-3">
          <label className="block text-sm mb-2">Content *</label>
          <ReactQuill theme="snow" value={content} onChange={setContent}
            className="h-96 mb-10" placeholder="Write your blog here..." />
        </div>

        {/* Sidebar */}
        <div className="md:col-span-1 border rounded p-4">
          <h2 className="font-semibold mb-2">Categories</h2>
          <select name="category" value={form.category} onChange={onChange}
            className="w-full max-w-full border rounded px-2 py-1 text-sm">
            <option value="">-- Select Category --</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>

          <div className="mt-4">
            <label className="block text-sm mb-1">Cover Image</label>
            <input type="file" accept="image/*" onChange={onFile}
              className="block w-full text-sm" />
          </div>

          <button type="submit" disabled={loading}
            className="mt-4 w-full bg-black text-white py-2 rounded-md">
            {loading ? "Saving..." : "Publish"}
          </button>
        </div>
      </div>
    </form>
  );
}
