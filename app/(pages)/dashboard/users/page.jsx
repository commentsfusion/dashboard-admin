"use client";
import React, { useCallback, useEffect, useState } from "react";
import { Users } from "../../../Apis/users";
import Userinfo from "../../../components/cards/overview/userinfo.jsx";
import CustomPagination from "@/app/components/pagination.jsx";
import UserTable from "../../../components/UserTable";

// Small debounce hook
function useDebouncedValue(value, delay = 400) {
  const [debounced, setDebounced] = useState(value);
  React.useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(t);
  }, [value, delay]);
  return debounced;
}

export default function UsersPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // pagination + search
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebouncedValue(search, 400);

  // visual-only changed roles
  const [edited, setEdited] = useState({});

  // When search changes (after debounce), jump to page 1
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearch]);

  const fetchData = useCallback(async (page, q) => {
    try {
      setLoading(true);
      setError(null);

      // If there's a query, hit server-side search; otherwise, fetch all
      const response = q?.trim()
        ? await Users.SEARCH({ q: q.trim(), page })
        : await Users.USER(page);

      setData(response);
      setTotalPages(response?.totalPages ?? 1);
      setCurrentPage(response?.page ?? page);
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData(currentPage, debouncedSearch);
  }, [currentPage, debouncedSearch, fetchData]);
const roleBadge = (role = "user") => (
  <span
    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
      role === "admin"
        ? "bg-emerald-600 text-white"
        : role === "employee"
        ? "bg-blue-400 text-white"
        : role === "user"
        ? "bg-gray-500 text-white"
        : "bg-zinc-600 text-white" // <-- final else (unknown role)
    }`}
  >
    {role ? role.charAt(0).toUpperCase() + role.slice(1) : "User"}
  </span>
);

  const handlePageChange = (page) => setCurrentPage(page);
  const handleChangeRole = (userId, nextRole) =>
    setEdited((prev) => ({ ...prev, [userId]: nextRole }));

  const handleUpdate = (user, nextRole) => {
    // visual only; wire to API later
    console.log("Update user:", user.id || user._id, "to", nextRole);
  };

  const handleDelete = (user) => {
    // visual only; wire to API later
    console.log("Delete user:", user.id || user._id);
  };

  const users = data?.users ?? [];
  const pageSize = data?.pageSize ?? data?.perPage ?? 15;

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">User Management</h1>
          <p className="text-sm text-gray-500">
            View users and prep role changes.
          </p>
        </div>
      </div>

      <div className="mt-5">
        <Userinfo />
      </div>

      <UserTable
        users={users}
        loading={loading}
        currentPage={currentPage}
        pageSize={pageSize}
        edited={edited}
        onChangeRole={handleChangeRole}
        onClickUpdate={handleUpdate}
        onClickDelete={handleDelete}
        roleBadge={roleBadge}
        // Controlled search (parent owns it so it can call server)
        searchValue={search}
        onSearchChange={setSearch}
      />

      {/* Pagination */}
      <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />

      {error ? <p className="text-sm text-red-600">{error}</p> : null}
    </div>
  );
}
