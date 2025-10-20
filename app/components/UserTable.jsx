"use client";
import React, { useEffect, useState } from "react";
import { Users } from "../Apis/users";
import { FiCheck, FiTrash2 } from "react-icons/fi";
import toast from "react-hot-toast";

export default function UserTable({
  users = [],
  loading = false,
  currentPage = 1,
  pageSize = 15,
  edited = {},             
  onChangeRole,         
  onClickUpdate,         
  onClickDelete,
  roleBadge, 
  searchValue = "",
  onSearchChange,
}) {

  const [input, setInput] = useState(searchValue);
  useEffect(() => setInput(searchValue ?? ""), [searchValue]);
  useEffect(() => {
    const t = setTimeout(() => {
      if (input !== searchValue) onSearchChange?.(input);
    }, 400);
    return () => clearTimeout(t);
  }, [input, searchValue, onSearchChange]);
  const handleClear = () => { setInput(""); onSearchChange?.(""); };
  
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmTarget, setConfirmTarget] = useState(null);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const [actionRowId, setActionRowId] = useState(null);

  const openConfirm = (user, newRole) => {
    setConfirmTarget({ user, newRole });
    setConfirmOpen(true);
  };

  const openDeleteConfirm = (user) => {
    setDeleteTarget(user);
    setDeleteConfirmOpen(true);
  };

  const confirmCancel = () => {
    if (actionLoading) return;
    setConfirmOpen(false);
    setConfirmTarget(null);
  };

  const deleteConfirmCancel = () => {
    if (actionLoading) return;
    setDeleteConfirmOpen(false);
    setDeleteTarget(null);
  };

  const confirmYes = async () => {
    if (!confirmTarget) return;

    const { user, newRole } = confirmTarget;
    const uid = user?.id ?? user?._id ?? null;
    const emailToSend = (user?.email ?? user?.Email ?? "").trim();
    const roleToSend = String(newRole ?? "").trim();

    if (!emailToSend || !roleToSend) {
      toast.error("Missing email or role");
      return;
    }

    try {
      setActionLoading(true);
      if (uid != null) setActionRowId(uid);
      const res = await Users.ROLE({ email: emailToSend, role: roleToSend });
      if (!res?.success) throw new Error(res?.message || "Role update failed");
      toast.success(res?.message || "Role updated successfully");
      onClickUpdate?.(user, roleToSend);
      setConfirmOpen(false);
      setConfirmTarget(null);
    } catch (err) {
      toast.error(err?.message || "Role update failed");
    } finally {
      setActionLoading(false);
      setActionRowId(null);
    }
  };
 
  const confirmDelete = async () => {
    if (!deleteTarget) return;

    const uid = deleteTarget?.id ?? deleteTarget?._id ?? null;
    const emailToSend = (deleteTarget?.email ?? deleteTarget?.Email ?? "").trim();

    if (!emailToSend) {
      toast.error("Missing email");
      return;
    }

    try {
      setActionLoading(true);
      if (uid != null) setActionRowId(uid);
      const res = await Users.DELETE({ email: emailToSend });
      if (!res?.success) throw new Error(res?.message || "Delete failed");
      toast.success(res?.message || "User deleted successfully");
      onClickDelete?.(deleteTarget);
      // Close the delete confirmation modal
      setDeleteConfirmOpen(false);
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err?.message || "Delete failed");
    } finally {
      setActionLoading(false);
      setActionRowId(null);
    }
  };
 
  return (
    <>
      <form className="mt-6 flex justify-end" onSubmit={(e) => e.preventDefault()}>
        <div className="flex items-center gap-2 w-auto">
          <input
            type="text"
            placeholder="Search by name or email…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Search users by name or email"
          />
          <button
            type="button"
            onClick={searchValue ? handleClear : undefined}
            className={`px-4 py-2 rounded-lg text-white ${
              searchValue ? "bg-gray-700 hover:bg-gray-800" : "bg-blue-600 hover:bg-blue-700"
            }`}
            title={searchValue ? "Clear search" : "Search (typing auto-filters)"}
          >
            {searchValue ? "Clear" : "Search"}
          </button>
        </div>
      </form>

      {/* Table */}
<div className="mt-4 mx-4 md:mx-0">
  {/* horizontal scroll container */}
  <div className="overflow-x-auto border border-gray-200 rounded-xl shadow-sm">
    <table className="min-w-[960px] w-full table-fixed text-left text-sm border-collapse">
      <colgroup>
        <col className="w-12" />             {/* # */}
        <col className="w-[26%]" />          {/* User */}
        <col className="w-[30%]" />          {/* Email */}
        <col className="w-[14%]" />          {/* Current Role */}
        <col className="w-[14%]" />          {/* Change To */}
        <col className="w-[16%]" />          {/* Action */}
      </colgroup>

      <thead className="bg-gray-50">
        <tr className="text-gray-600">
          <th className="px-5 py-3 font-medium whitespace-nowrap">#</th>
          <th className="px-5 py-3 font-medium whitespace-nowrap">User</th>
          <th className="px-5 py-3 font-medium whitespace-nowrap">Email</th>
          <th className="px-5 py-3 font-medium whitespace-nowrap">Current Role</th>
          <th className="px-5 py-3 font-medium whitespace-nowrap">Change To</th>
          <th className="px-5 py-3 font-medium text-right whitespace-nowrap">Action</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {loading ? (
          <tr>
            <td colSpan={6} className="px-5 py-8 text-center text-gray-500">Loading…</td>
          </tr>
        ) : users?.length ? (
          users.map((u, i) => {
            const uid = u.id ?? u._id ?? i;
            const pending = edited[uid] ?? u.role;
            const changed = pending !== u.role;
            const index = (currentPage - 1) * pageSize + (i + 1);
            const rowBusy = actionLoading && actionRowId === uid;

            return (
              <tr
                key={uid}
                className={`${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100/70 transition`}
              >
                <td className="px-5 py-4 font-medium text-gray-700 whitespace-nowrap">{index}</td>

                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-700">
                      {(u.name || "")
                        .split(" ")
                        .map((s) => s?.[0])
                        .filter(Boolean)
                        .slice(0, 2)
                        .join("")
                        .toUpperCase()}
                    </div>
                    <div className="flex flex-col">
                      {/* no truncate */}
                      <span className="font-medium whitespace-nowrap">{u.name}</span>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4 whitespace-nowrap">
                  {/* no overflow hidden / no ellipsis */}
                  <span title={u.email} className="block whitespace-nowrap">
                    {u.email}
                  </span>
                </td>

                <td className="px-5 py-4 whitespace-nowrap">
                  {roleBadge?.(u.role) ?? u.role}
                </td>

                <td className="px-5 py-4 whitespace-nowrap">
                  <select
                    className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-black/10"
                    value={pending}
                    onChange={(e) => onChangeRole?.(uid, e.target.value)}
                    disabled={rowBusy}
                  >
                    <option value="user">user</option>
                    <option value="admin">admin</option>
                    <option value="employee">employee</option>
                  </select>
                </td>

                <td className="px-5 py-4 whitespace-nowrap">
                  <div className="flex justify-start md:justify-end gap-2">
                    <button
                      type="button"
                      title={changed ? "Update role (will ask to confirm)" : "No changes to update"}
                      onClick={() => changed && openConfirm(u, pending)}
                      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition ${
                        changed ? "bg-gray-900 text-white hover:opacity-90" : "bg-gray-400 text-white cursor-not-allowed"
                      }`}
                      disabled={!changed || rowBusy}
                    >
                      Update {changed ? <FiCheck className="h-4 w-4" /> : null}
                    </button>

                    <button
                      type="button"
                      title="Delete user"
                      onClick={() => openDeleteConfirm(u)}
                      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium bg-red-600 text-white hover:bg-red-700 transition"
                      disabled={rowBusy}
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={6} className="px-5 py-8 text-center text-gray-500">No users found.</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</div>



      {/* Role Update Confirm Modal */}
      {confirmOpen && confirmTarget ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={confirmCancel} />
          {/* dialog */}
          <div className="relative z-10 w-[92%] max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Confirm role update</h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to change{" "}
              <span className="font-medium">{confirmTarget.user?.name}</span>&apos;s role to{" "}
              <span className="font-medium">{confirmTarget.newRole}</span>?
            </p>

            <div className="mt-6 flex justify- gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                onClick={confirmCancel}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg text-white ${
                  actionLoading ? "bg-gray-600" : "bg-gray-900 hover:opacity-90"
                }`}
                onClick={confirmYes}
                disabled={actionLoading}
                title={actionLoading ? "Updating..." : "Yes, update role"}
              >
                {actionLoading ? "Updating…" : "Yes"}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Delete Confirm Modal */}
      {deleteConfirmOpen && deleteTarget ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/40" onClick={deleteConfirmCancel} />
          {/* dialog */}
          <div className="relative z-10 w-[92%] max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold mb-2">Confirm user deletion</h3>
            <p className="text-sm text-gray-600">
              Are you sure you want to delete user{" "}
              <span className="font-medium">{deleteTarget?.name}</span> ({deleteTarget?.email})?
              <br />
              <span className="text-red-600 font-medium">This action cannot be undone.</span>
            </p>

            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
                onClick={deleteConfirmCancel}
                disabled={actionLoading}
              >
                Cancel
              </button>
              <button
                type="button"
                className={`px-4 py-2 rounded-lg text-white ${
                  actionLoading ? "bg-gray-600" : "bg-red-600 hover:bg-red-700"
                }`}
                onClick={confirmDelete}
                disabled={actionLoading}
                title={actionLoading ? "Deleting..." : "Yes, delete user"}
              >
                {actionLoading ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}