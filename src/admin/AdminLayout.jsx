import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function AdminLayout() {
  // simple guard (optional)
  const role = localStorage.getItem("role") || "admin";  // test ke liye admin

  if (role !== "admin") {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
    </div>
  );
}
