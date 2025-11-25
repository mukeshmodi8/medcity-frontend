import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaTable,
  FaUserAlt,
  FaLock,
  FaFileAlt,
  FaCogs,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";

const PRIMARY_ACCENT = "#00bfa6";
const SECONDARY_ACCENT = "#233d87";
const ACTIVE_BG = "#eff6ff";
const ACTIVE_TEXT = "#1f3a8a";

export default function Sidebar() {
  const [open, setOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // route change -> mobile menu close
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

 const pages = [
  { to: "/admin/dashboard", label: "Dashboard", icon: <FaHome size={18} /> },
  
  { to: "/admin/dashboard/home",        label: "Home Content",  icon: <FaFileAlt size={18} /> },
  { to: "/admin/dashboard/services",    label: "Services",      icon: <FaCogs size={18} /> },
  { to: "/admin/dashboard/doctors",     label: "Doctors",       icon: <FaUserAlt size={18} /> },
  { to: "/admin/dashboard/gallery",     label: "Gallery",       icon: <FaTable size={18} /> },
  { to: "/admin/dashboard/contact",     label: "Contact",       icon: <FaLock size={18} /> },
  { to: "/admin/dashboard/appointment", label: "Appointments",  icon: <FaFileAlt size={18} /> },
];


  const handleLogout = () => {
    // yaha jo bhi auth data ho, clear kar sakte ho
    localStorage.removeItem("role");
    // agar token use kar rahe ho to:
    // localStorage.removeItem("token");

    navigate("/admin"); // auth page (login/register)
  };

  const NavLink = ({ to, label, icon }) => {
    const active = location.pathname === to;

    return (
      <Link
        to={to}
        className={`flex items-center gap-3 py-3 px-3 rounded-lg transition-all duration-200 group ${
          active ? "font-semibold shadow-sm" : "hover:bg-gray-50"
        }`}
        style={{
          backgroundColor: active ? ACTIVE_BG : "transparent",
          color: active ? ACTIVE_TEXT : "#64748b",
        }}
      >
        <span
          className={`flex items-center justify-center ${
            active ? "" : "group-hover:text-gray-800"
          }`}
          style={{ color: active ? ACTIVE_TEXT : SECONDARY_ACCENT }}
        >
          {icon}
        </span>
        <span
          className={`truncate text-sm ${
            open ? "opacity-100" : "lg:opacity-0 lg:w-0"
          } transition-all duration-300`}
        >
          {label}
        </span>
      </Link>
    );
  };

  return (
    <>
      {/* MOBILE HEADER */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b z-30 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileOpen(true)}
            className="p-2 rounded-md hover:bg-gray-100 text-gray-700 focus:outline-none"
          >
            <FaBars className="w-6 h-6" style={{ color: SECONDARY_ACCENT }} />
          </button>
          <span
            className="text-lg font-bold tracking-tight"
            style={{ color: SECONDARY_ACCENT }}
          >
            Medcity Admin
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
          A
        </div>
      </div>

      {/* MOBILE SIDEBAR OVERLAY */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-gray-900/50 backdrop-blur-sm"
          onClick={() => setMobileOpen(false)}
        />

        <aside
          className={`absolute left-0 top-0 bottom-0 w-72 bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="h-16 flex items-center justify-between px-6 border-b">
            <h2
              className="text-xl font-bold"
              style={{ color: SECONDARY_ACCENT }}
            >
              Medcity Panel
            </h2>
            <button
              onClick={() => setMobileOpen(false)}
              className="p-2 rounded-full hover:bg-gray-100 text-gray-500"
            >
              <FaTimes size={18} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
            {pages.map((p) => (
              <NavLink key={p.to} {...p} />
            ))}
          </div>

          <div className="p-4 border-t bg-gray-50">
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 text-red-500 w-full p-2 hover:bg-red-50 rounded-lg transition"
            >
              <FaSignOutAlt size={18} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </aside>
      </div>

      {/* DESKTOP SIDEBAR */}
      <aside
        className={`hidden lg:flex flex-col bg-white border-r h-full transition-all duration-300 ease-in-out z-20 ${
          open ? "w-64" : "w-20"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b">
          <span
            className={`font-bold text-xl text-[#233d87] whitespace-nowrap overflow-hidden transition-all ${
              open ? "w-auto opacity-100" : "w-0 opacity-0"
            }`}
          >
            Medcity
          </span>
          <button
            onClick={() => setOpen(!open)}
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
          >
            <FaBars size={18} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1 custom-scrollbar">
          {pages.map((p) => (
            <NavLink key={p.to} {...p} />
          ))}
        </nav>

        <div className="p-4 border-t">
          <div
            className={`flex items-center gap-3 ${
              !open && "justify-center"
            }`}
          >
            <div className="w-8 h-8 rounded-full bg-teal-100 text-teal-600 flex items-center justify-center font-bold text-sm shrink-0">
              A
            </div>
            <div
              className={`overflow-hidden transition-all ${
                open ? "w-auto opacity-100" : "w-0 opacity-0"
              }`}
            >
              <p className="text-sm font-medium text-gray-700">Admin User</p>
              <p className="text-xs text-gray-400">admin@medcity.com</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
