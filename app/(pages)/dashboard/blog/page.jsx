// app/blog/page.jsx
"use client";

import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import { blogAPI } from "../../../Apis/blog";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

// Build a safe image URL from API item using env base URL
function getImageUrl(item) {
  const base = process.env.NEXT_PUBLIC_ASSETS_BASE_URL || ""; // e.g. http://localhost:5000
  if (item?.coverImageUrl) return item.coverImageUrl; // absolute from backend
  const src = item?.coverImage || "";
  if (!src) return "";
  if (/^https?:\/\//.test(src)) return src; // already absolute
  const left = base.replace(/\/$/, "");
  const right = src.replace(/^\//, "");
  return `${left}/${right}`;
}

function formatDate(iso) {
  try {
    const d = new Date(iso);
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yy = d.getFullYear();
    return `${dd}/${mm}/${yy}`;
  } catch {
    return "";
  }
}

function estimateReadMin({ content = "", metaDescription = "" }) {
  const toText = (html) => html?.replace(/<[^>]*>/g, " ") || "";
  const words =
    (toText(content) + " " + (metaDescription || ""))
      .trim()
      .split(/\s+/)
      .filter(Boolean).length || 0;
  return Math.max(1, Math.ceil(words / 200)); // ~200 wpm
}

/** Minimal confirm modal */
function ConfirmDialog({ open, title, description, confirmText = "Delete", cancelText = "Cancel", onConfirm, onCancel, loading }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] bg-black/50 grid place-items-center p-4">
      <div className="w-full max-w-md rounded-2xl bg-white shadow-xl border border-gray-200">
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {description && (
            <p className="mt-2 text-sm text-gray-600">{description}</p>
          )}
          <div className="mt-5 flex items-center justify-end gap-2">
            <button
              onClick={onCancel}
              disabled={loading}
              className="px-4 py-2 text-sm rounded-md border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-60"
            >
              {cancelText}
            </button>
            <button
              onClick={onConfirm}
              disabled={loading}
              className="px-4 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
            >
              {loading ? "Deleting..." : confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // confirm modal state
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingSlug, setPendingSlug] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const fetchData = useCallback(async (page) => {
    try {
      setLoading(true);
      setError(null);
      const res = await blogAPI.LIST(page);
      setItems(res?.items || []);
      setTotalPages(res?.pages || 1);
    } catch (err) {
      setError(err?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, fetchData]);

  // open confirm popup
  const askDelete = (slug) => {
    if (!slug) return toast.error("Missing slug");
    setPendingSlug(slug);
    setConfirmOpen(true);
  };

  // confirmed deletion
  const confirmDelete = async () => {
    if (!pendingSlug) return;
    try {
      setDeleting(true);
      const res = await blogAPI.DELETE_BY_SLUG(pendingSlug);
      toast.success(res?.message || "Blog deleted");
      setConfirmOpen(false);
      setPendingSlug(null);
      // refresh
      fetchData(currentPage);
    } catch (err) {
      toast.error(err?.message || "Delete failed");
    } finally {
      setDeleting(false);
    }
  };

  const cancelDelete = () => {
    setConfirmOpen(false);
    setPendingSlug(null);
  };

  return (
    <div className="min-h-screen p-4">
      {/* Status */}
      {loading && <div className="text-sm text-gray-600 mb-3">Loading…</div>}
      {error && <div className="text-sm text-red-600 mb-3">{error}</div>}

      {/* Grid of cards */}
      <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {items.map((it) => {
          const cover = getImageUrl(it);
          const readMin = estimateReadMin(it);
          const category = it?.category?.trim() || "Uncategorized";
          const tags = Array.isArray(it?.metaTags) ? it.metaTags : [];

          return (
            <article
              key={it._id}
              className="w-full rounded-3xl bg-white shadow-sm border border-gray-200 overflow-hidden"
            >
              {/* Cover */}
              {cover ? (
                <img
                  src={cover}
                  alt={it.title || "cover"}
                  className="h-40 w-full object-cover"
                />
              ) : (
                <div className="h-40 bg-gray-100 grid place-items-center text-gray-400 text-sm">
                  No Cover
                </div>
              )}

              {/* Body */}
              <div className="p-4">
                {/* Top row: Category + Date + Read time */}
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="inline-flex items-center rounded-full border border-gray-200 px-3 py-1 text-xs font-medium text-gray-700 bg-white">
                    {category}
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.8"
                        d="M8 7V3m8 4V3M3 9h18M5 12h14M5 21h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2z"
                      />
                    </svg>
                    {formatDate(it?.createdAt)}
                  </span>

                  <span className="inline-flex items-center gap-1 text-xs text-gray-500">
                    • {readMin} min read
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-3 text-xl font-extrabold tracking-tight text-gray-900 line-clamp-2">
                  {it.title}
                </h3>

                {/* Excerpt / metaDescription */}
                <p className="mt-1 text-gray-600 text-sm leading-relaxed line-clamp-2">
                  {it.metaDescription}
                </p>

                {/* Footer: author + actions + tags */}
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-sm font-medium text-gray-900">
                    {(it.postedBy || "").trim() || "—"}
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Edit */}
                    <Link href={`/blog-detail/${it.slug}`} title="Edit">
                      <button
                        className="p-2 rounded-md hover:bg-gray-100"
                        aria-label="Edit"
                      >
                        <FiEdit2 className="h-5 w-5" />
                      </button>
                    </Link>

                    {/* Delete -> opens confirm modal */}
                    <button
                      onClick={() => askDelete(it.slug)}
                      className="p-2 rounded-md hover:bg-red-50 text-red-600"
                      aria-label="Delete"
                      title="Delete"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>

                {/* tags */}
                <div className="mt-3 flex items-center gap-2">
                  {tags.slice(0, 2).map((tg) => (
                    <span
                      key={tg}
                      className="inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-700 text-xs px-2.5 py-1"
                    >
                      {tg}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Pager (if your API supports it) */}
      <div className="mx-auto max-w-6xl flex items-center justify-center gap-3 mt-6">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage <= 1}
          className="px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white disabled:opacity-50"
        >
          Prev
        </button>
        <span className="text-sm text-gray-600">
          Page {currentPage} / {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage >= totalPages}
          className="px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Confirm delete modal */}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete this blog post?"
        description={
          pendingSlug
            ? `You’re about to delete: "${pendingSlug}". This action cannot be undone.`
            : "This action cannot be undone."
        }
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
        loading={deleting}
      />
    </div>
  );
}
