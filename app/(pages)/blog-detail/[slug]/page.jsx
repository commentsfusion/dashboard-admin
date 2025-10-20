// app/blog-detail/[slug]/page.jsx
"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { blogAPI } from "../../../Apis/blog";

function getImageUrl(item) {
  const base = process.env.NEXT_PUBLIC_ASSETS_BASE_URL || "";
  if (item?.coverImageUrl) return item.coverImageUrl;
  const src = item?.coverImage || "";
  if (!src) return "";
  if (/^https?:\/\//.test(src)) return src;
  const left = base.replace(/\/$/, "");
  const right = src.replace(/^\//, "");
  return `${left}/${right}`;
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString();
  } catch {
    return "";
  }
}

export default function BlogDetailPage() {
  const { slug } = useParams();
  const router = useRouter();

  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // edit state
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    metaDescription: "",
    metaTags: "",       // comma-separated string in UI
    category: "",
    postedBy: "",
    content: "",
  });
  const [coverPreview, setCoverPreview] = useState(""); // preview URL (existing or selected)
  const [coverFile, setCoverFile] = useState(null);     // File object
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await blogAPI.DETAIL(slug); // your API returns a single blog object
      setItem(data);

      // seed edit form from loaded item
      setForm({
        title: data.title || "",
        metaDescription: data.metaDescription || "",
        metaTags: Array.isArray(data.metaTags) ? data.metaTags.join(", ") : (data.metaTags || ""),
        category: data.category || "",
        postedBy: data.postedBy || "",
        content: data.content || "",
      });
      setCoverPreview(getImageUrl(data));
      setCoverFile(null);
    } catch (err) {
      setError(err?.message || "Failed to load blog");
    } finally {
      setLoading(false);
    }
  }, [slug]);

  useEffect(() => {
    if (slug) load();
  }, [slug, load]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  };

  const onPickCover = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const isDirty = useMemo(() => {
    if (!item) return false;
    const baseTags = Array.isArray(item.metaTags) ? item.metaTags.join(", ") : (item.metaTags || "");
    return (
      form.title !== (item.title || "") ||
      form.metaDescription !== (item.metaDescription || "") ||
      form.metaTags !== baseTags ||
      form.category !== (item.category || "") ||
      form.postedBy !== (item.postedBy || "") ||
      form.content !== (item.content || "") ||
      !!coverFile
    );
  }, [form, item, coverFile]);

  const handleSave = async () => {
    if (!item?.slug) return;
    if (!isDirty) {
      toast("No changes to save");
      setEditing(false);
      return;
    }

    try {
      setSaving(true);

      // Build FormData for PATCH (multipart)
      const fd = new FormData();
      // only append fields that changed (safe & minimal)
      if (form.title !== (item.title || "")) fd.append("title", form.title);
      if (form.metaDescription !== (item.metaDescription || ""))
        fd.append("metaDescription", form.metaDescription);

      const baseTags = Array.isArray(item.metaTags) ? item.metaTags.join(", ") : (item.metaTags || "");
      if (form.metaTags !== baseTags) fd.append("metaTags", form.metaTags);

      if (form.category !== (item.category || "")) fd.append("category", form.category);
      if (form.postedBy !== (item.postedBy || "")) fd.append("postedBy", form.postedBy);
      if (form.content !== (item.content || "")) fd.append("content", form.content);

      if (coverFile) fd.append("coverImage", coverFile);

      const res = await blogAPI.UPDATE(item.slug, fd); // PATCH /api/blog/:slug
      // res: { message, blog } from your controller
      const updated = res?.blog || res; // support either shape

      toast.success(res?.message || "Changes saved");

      // If slug changed on the backend, navigate
      if (updated?.slug && updated.slug !== item.slug) {
        router.replace(`/blog-detail/${updated.slug}`);
      }

      // Update local state with fresh data
      setItem(updated);
      setEditing(false);
      setCoverFile(null);
      setCoverPreview(getImageUrl(updated));
      setForm({
        title: updated.title || "",
        metaDescription: updated.metaDescription || "",
        metaTags: Array.isArray(updated.metaTags) ? updated.metaTags.join(", ") : (updated.metaTags || ""),
        category: updated.category || "",
        postedBy: updated.postedBy || "",
        content: updated.content || "",
      });
    } catch (err) {
      toast.error(err?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 grid place-items-center text-gray-600">
        Loading…
      </div>
    );
  }

  if (error || !item) {
    return (
      <div className="min-h-screen p-6 grid place-items-center">
        <div className="max-w-lg text-center">
          <p className="text-red-600 font-medium mb-4">{error || "Not found"}</p>
          <Link href="../../dashboard//blog/page.jsx" className="text-blue-600 hover:underline">
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <div className="mx-auto max-w-4xl">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4">
          <Link href="../../dashboard/blog" className="text-sm text-gray-600 hover:underline">
            ← Back to blog
          </Link>

          <div className="flex items-center gap-2">
            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-50"
              >
                Edit
              </button>
            ) : (
              <>
                <button
                  onClick={() => {
                    // reset to original
                    setEditing(false);
                    setCoverFile(null);
                    setCoverPreview(getImageUrl(item));
                    setForm({
                      title: item.title || "",
                      metaDescription: item.metaDescription || "",
                      metaTags: Array.isArray(item.metaTags) ? item.metaTags.join(", ") : (item.metaTags || ""),
                      category: item.category || "",
                      postedBy: item.postedBy || "",
                      content: item.content || "",
                    });
                  }}
                  disabled={saving}
                  className="px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-60"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !isDirty}
                  className="px-3 py-1.5 text-sm rounded-md bg-black text-white hover:bg-gray-900 disabled:opacity-60"
                >
                  {saving ? "Saving…" : "Save Changes"}
                </button>
              </>
            )}
          </div>
        </div>

        {/* Cover */}
        <div className="w-full">
          {coverPreview ? (
            <img
              src={coverPreview}
              alt={item.title || "cover"}
              className="w-full h-64 object-cover rounded-2xl border border-gray-200"
            />
          ) : (
            <div className="w-full h-64 rounded-2xl border border-dashed border-gray-300 grid place-items-center text-gray-400">
              No Cover
            </div>
          )}

          {editing && (
            <div className="mt-3">
              <label className="text-sm font-medium text-gray-700">Change cover image</label>
              <input
                type="file"
                accept="image/*"
                onChange={onPickCover}
                className="mt-1 block w-full text-sm"
              />
            </div>
          )}
        </div>

        {/* Title + Meta */}
        {!editing ? (
          <>
            <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-gray-900">
              {item.title}
            </h1>

            <div className="mt-2 flex items-center gap-3 text-sm text-gray-600 flex-wrap">
              <span>By {item.postedBy || "—"}</span>
              <span>•</span>
              <span>{formatDate(item.createdAt)}</span>
              {item.category && (
                <>
                  <span>•</span>
                  <span className="inline-flex items-center rounded-full border border-gray-200 px-2.5 py-0.5 text-xs font-medium">
                    {item.category}
                  </span>
                </>
              )}
              {!!item.metaTags?.length && (
                <>
                  <span>•</span>
                  <span className="text-xs">{item.metaTags.slice(0, 6).join(", ")}</span>
                </>
              )}
            </div>

            {item.metaDescription && (
              <p className="mt-4 text-gray-700">{item.metaDescription}</p>
            )}
          </>
        ) : (
          <div className="mt-6 grid gap-4">
            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300"
                placeholder="Post title"
              />
            </div>

            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">Meta Description</label>
              <textarea
                name="metaDescription"
                value={form.metaDescription}
                onChange={onChange}
                rows={3}
                className="w-full px-3 py-2 rounded-md border border-gray-300"
                placeholder="Short SEO description"
              />
            </div>

            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">Meta Tags (comma separated)</label>
              <input
                name="metaTags"
                value={form.metaTags}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300"
                placeholder="e.g. linkedin, ai, marketing"
              />
            </div>

            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <input
                name="category"
                value={form.category}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300"
                placeholder="Category"
              />
            </div>

            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">Posted By</label>
              <input
                name="postedBy"
                value={form.postedBy}
                onChange={onChange}
                className="w-full px-3 py-2 rounded-md border border-gray-300"
                placeholder="Author or user id"
              />
            </div>

            <div className="grid gap-1">
              <label className="text-sm font-medium text-gray-700">Content (HTML allowed)</label>
              <textarea
                name="content"
                value={form.content}
                onChange={onChange}
                rows={10}
                className="w-full px-3 py-2 rounded-md border border-gray-300 font-mono text-sm"
                placeholder="<p>Write content…</p>"
              />
            </div>
          </div>
        )}

        {/* Render content in view mode */}
        {!editing && item.content && (
          <div
            className="prose prose-gray mt-6 max-w-none"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        )}
      </div>
    </div>
  );
}
