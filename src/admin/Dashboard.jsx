import React from "react";
import {
  FaCog,
  FaArrowRight,
  FaEllipsisH,
  FaPlus,
  FaDownload,
  FaClipboardList,
  FaUsers,
  FaChartLine,
  FaAmbulance,
  FaFileAlt,
  FaStethoscope,
} from "react-icons/fa";

const PRIMARY_COLOR = "#00BFA6";
const DARK_BLUE = "#1f3258";
const LIGHT_BG = "#f8fafc";

const StatCard = ({ title, value, icon, color, trend }) => (
  <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 relative overflow-hidden group transition-all hover:shadow-md">
    <div className="flex items-start justify-between relative z-10">
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
          {title}
        </p>
        <h3 className="text-2xl font-bold mt-1 text-gray-800">{value}</h3>
        {trend && (
          <p className="text-[10px] font-semibold mt-2 flex items-center gap-1 text-green-600 bg-green-50 w-fit px-2 py-0.5 rounded-full">
            +{trend}% this week
          </p>
        )}
      </div>
      <div
        className="p-3 rounded-lg text-white shadow-sm"
        style={{ backgroundColor: color }}
      >
        <span className="flex items-center justify-center w-6 h-6">
          {icon}
        </span>
      </div>
    </div>
  </div>
);

const QuickAction = ({ icon, text, link, color }) => (
  <a
    href={link}
    className="flex items-center p-3 rounded-lg bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-md transition-all cursor-pointer group"
  >
    <div
      className="p-2 rounded-md mr-3 bg-white shadow-sm group-hover:scale-110 transition-transform"
      style={{ color: color }}
    >
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <span className="font-medium text-sm text-gray-700 flex-1">{text}</span>
    <FaArrowRight
      className="text-gray-300 group-hover:text-gray-600"
      size={16}
    />
  </a>
);

export default function Dashboard() {
  return (
    <div className="min-h-screen w-full bg-slate-50 pt-20 lg:pt-8 px-4 md:px-8 pb-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back, Admin.</p>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 text-gray-600 text-sm font-semibold rounded-lg shadow-sm hover:bg-gray-50 active:scale-95 transition">
            <FaDownload size={16} />
            <span className="hidden sm:inline">Report</span>
          </button>
          <button
            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 text-white text-sm font-semibold rounded-lg shadow-md hover:opacity-90 active:scale-95 transition"
            style={{ backgroundColor: PRIMARY_COLOR }}
          >
            <FaPlus size={16} />
            <span>New Appt</span>
          </button>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
        <StatCard
          title="Appointments"
          value="420"
          trend="12"
          icon={<FaClipboardList size={24} />}
          color={PRIMARY_COLOR}
        />
        <StatCard
          title="New Patients"
          value="75"
          trend="5"
          icon={<FaUsers size={24} />}
          color="#3B82F6"
        />
        <StatCard
          title="Website Visits"
          value="12.5K"
          trend="8"
          icon={<FaChartLine size={24} />}
          color="#8B5CF6"
        />
        <StatCard
          title="Emergencies"
          value="12"
          icon={<FaAmbulance size={24} />}
          color="#EF4444"
        />
      </div>

      {/* MAIN CONTENT GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* LEFT COLUMN (Table) */}
        <div className="xl:col-span-2 flex flex-col gap-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h2 className="text-base font-bold text-gray-800">
                Recent Requests
              </h2>
              <button className="text-xs font-bold text-teal-600 hover:text-teal-700">
                VIEW ALL
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600 whitespace-nowrap">
                <thead className="bg-gray-50 text-gray-500 font-semibold text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3">Patient</th>
                    <th className="px-6 py-3">Dept</th>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3 text-right">...</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {[
                    {
                      name: "Amit Sharma",
                      dept: "Cardiology",
                      date: "22 Nov",
                      status: "Pending",
                      color: "bg-blue-100 text-blue-600",
                      statusColor: "bg-yellow-100 text-yellow-700",
                    },
                    {
                      name: "Riya Jain",
                      dept: "Neurology",
                      date: "22 Nov",
                      status: "Confirmed",
                      color: "bg-purple-100 text-purple-600",
                      statusColor: "bg-green-100 text-green-700",
                    },
                    {
                      name: "Mohit Kumar",
                      dept: "General",
                      date: "23 Nov",
                      status: "Cancelled",
                      color: "bg-pink-100 text-pink-600",
                      statusColor: "bg-red-100 text-red-700",
                    },
                    {
                      name: "Suman Singh",
                      dept: "Dental",
                      date: "24 Nov",
                      status: "Confirmed",
                      color: "bg-orange-100 text-orange-600",
                      statusColor: "bg-green-100 text-green-700",
                    },
                  ].map((row, i) => (
                    <tr
                      key={i}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-3 font-medium text-gray-900 flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${row.color}`}
                        >
                          {row.name.charAt(0)}
                        </div>
                        {row.name}
                      </td>
                      <td className="px-6 py-3">{row.dept}</td>
                      <td className="px-6 py-3">{row.date}</td>
                      <td className="px-6 py-3">
                        <span
                          className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${row.statusColor}`}
                        >
                          {row.status}
                        </span>
                      </td>
                      <td className="px-6 py-3 text-right text-gray-400">
                        <FaEllipsisH
                          size={16}
                          className="cursor-pointer hover:text-gray-600"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (Quick Actions) */}
        <div className="flex flex-col gap-6">
          <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
            <h2 className="text-base font-bold mb-4 text-gray-800">
              Quick Actions
            </h2>
            <div className="flex flex-col gap-3">
              <QuickAction
                icon={<FaFileAlt />}
                text="Edit Homepage"
                link="#"
                color="#3B82F6"
              />
              <QuickAction
                icon={<FaStethoscope />}
                text="Add Doctor"
                link="#"
                color={PRIMARY_COLOR}
              />
              <QuickAction
                icon={<FaCog />}
                text="Settings"
                link="#"
                color="#6B7280"
              />
            </div>
          </div>

          <div className="bg-blue-900 rounded-xl p-6 text-white relative overflow-hidden shadow-lg">
            <div className="absolute top-0 right-0 -mt-2 -mr-2 w-24 h-24 bg-white opacity-10 rounded-full"></div>
            <h3 className="font-bold text-lg relative z-10">Need Help?</h3>
            <p className="text-blue-200 text-sm mt-1 relative z-10 mb-4">
              Check our documentation for admin panel guide.
            </p>
            <button className="text-xs font-bold bg-white text-blue-900 px-4 py-2 rounded shadow-sm relative z-10 hover:bg-blue-50 transition">
              Documentation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
