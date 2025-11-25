// src/admin/AdminDoctorsEditor.jsx
import React, { useState, useEffect } from "react";
import {
  FaUserPlus,
  FaUserEdit,
  FaTrashAlt,
  FaUpload,
  FaCheckCircle,
} from "react-icons/fa";

const PRIMARY_COLOR = "#00bfa6";
const SECONDARY_COLOR = "#233d87";
const API_BASE = "https://medcity-backend-t66f.onrender.com";

// 🔹 Single doctor card
const DoctorEditorCard = ({
  doctor,
  index,
  onDelete,
  onChange,
  onImageChange,
}) => (
  <div
    className="bg-white p-4 rounded-xl shadow-lg border-l-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
    style={{ borderColor: PRIMARY_COLOR }}
  >
    <div className="flex-1 w-full space-y-3">
      <h4 className="font-bold" style={{ color: SECONDARY_COLOR }}>
        Editing Doctor {index + 1}
      </h4>

      {/* Name */}
      <input
        type="text"
        value={doctor.name || ""}
        onChange={(e) => onChange(doctor._localId, "name", e.target.value)}
        placeholder="Doctor Name"
        className="w-full p-2 border border-gray-300 rounded-md text-sm"
      />

      {/* Specialization (Spaciality) */}
      <input
        type="text"
        value={doctor.specialization || ""}
        onChange={(e) =>
          onChange(doctor._localId, "specialization", e.target.value)
        }
        placeholder="Specialization (e.g. Dental Specialist)"
        className="w-full p-2 border border-gray-300 rounded-md text-sm"
      />

      {/* Degrees */}
      <input
        type="text"
        value={doctor.degrees || ""}
        onChange={(e) => onChange(doctor._localId, "degrees", e.target.value)}
        placeholder="Degrees (e.g. M.D. of Medicine)"
        className="w-full p-2 border border-gray-300 rounded-md text-sm"
      />

      {/* Expertise */}
      <input
        type="text"
        value={doctor.expertise || ""}
        onChange={(e) => onChange(doctor._localId, "expertise", e.target.value)}
        placeholder="Areas of expertise (short text)"
        className="w-full p-2 border border-gray-300 rounded-md text-sm"
      />

      {/* Short description (list + profile दोनों में) */}
      <textarea
        rows="2"
        value={doctor.description || ""}
        onChange={(e) =>
          onChange(doctor._localId, "description", e.target.value)
        }
        placeholder="Short description (shown on cards & top of profile)"
        className="w-full p-2 border border-gray-300 rounded-md text-sm"
      />

      {/* Rating + reviews text (DoctorProfile top right) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          type="text"
          value={doctor.rating || ""}
          onChange={(e) => onChange(doctor._localId, "rating", e.target.value)}
          placeholder="Rating (e.g. 4.9)"
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
        />
        <input
          type="text"
          value={doctor.reviewsText || ""}
          onChange={(e) =>
            onChange(doctor._localId, "reviewsText", e.target.value)
          }
          placeholder="Reviews text (e.g. based on 7541 reviews)"
          className="w-full p-2 border border-gray-300 rounded-md text-sm"
        />
      </div>

      {/* Long biography (DoctorProfile main bio) */}
      <textarea
        rows="4"
        value={doctor.biography || ""}
        onChange={(e) =>
          onChange(doctor._localId, "biography", e.target.value)
        }
        placeholder="Full biography (HTML allowed, simple text bhi chalega)"
        className="w-full p-2 border border-gray-300 rounded-md text-sm"
      />

      {/* Optional manual path (agar base64 nahi use karna) */}
      <input
        type="text"
        value={doctor.imageUrl || ""}
        onChange={(e) =>
          onChange(doctor._localId, "imageUrl", e.target.value)
        }
        placeholder="Image URL / Path (optional)"
        className="w-full p-2 border border-gray-300 rounded-md text-sm"
      />
    </div>

    {/* Actions & Image */}
    <div className="flex flex-col items-center gap-3 md:w-40 w-full">
      <img
        src={doctor.imageUrl || "https://via.placeholder.com/80"}
        alt={`Image of ${doctor.name}`}
        className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
      />

      {/* Upload image */}
      <div className="flex flex-col items-center">
        <input
          id={`doctor-image-${doctor._localId}`}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) =>
            onImageChange(doctor._localId, e.target.files?.[0] || null)
          }
        />
        <label
          htmlFor={`doctor-image-${doctor._localId}`}
          className="text-xs text-gray-600 hover:text-blue-500 flex items-center gap-1 cursor-pointer"
        >
          <FaUpload /> Change Image
        </label>
        <span className="text-[10px] text-gray-400">
          (image DB me base64 ke रूप में save hogi)
        </span>
      </div>

      <div className="flex gap-2 w-full">
        {/* Individual Save – sirf UI */}
        <button
          type="button"
          className="flex-1 px-3 py-2 text-white rounded-md bg-green-500 hover:bg-green-600 text-sm"
        >
          <FaUserEdit className="inline mr-1" /> Save
        </button>

        {/* Delete with confirm */}
        <button
          type="button"
          onClick={() => onDelete(doctor._localId)}
          className="flex-1 px-3 py-2 text-white rounded-md bg-red-500 hover:bg-red-600 text-sm"
        >
          <FaTrashAlt className="inline mr-1" /> Delete
        </button>
      </div>
    </div>
  </div>
);

export default function AdminDoctorsEditor() {
  const [doctors, setDoctors] = useState([]);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ helper: frontend ke liye local id
  const addLocalIds = (arr) =>
    (arr || []).map((d, idx) => ({
      ...d,
      _localId: d._localId || d._id || Date.now() + idx,
    }));

  // 🔹 Backend se load
  useEffect(() => {
    let ignore = false;

    async function load() {
      try {
        setLoading(true);

        const res = await fetch(`${API_BASE}/pages/home`);
        const data = await res.json();

        console.log("📥 LOADED HOME PAGE FROM API:", data);

        if (ignore) return;

        if (Array.isArray(data.doctors)) {
          setDoctors(addLocalIds(data.doctors));
        } else {
          setDoctors([]);
        }
      } catch (err) {
        console.error("Doctor load error:", err);
        if (!ignore) setDoctors([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    }

    load();
    return () => {
      ignore = true;
    };
  }, []);

  const handleAddDoctor = () => {
    const newDoctor = {
      _localId: Date.now(),
      name: "New Doctor",
      specialization: "Specialty",
      degrees: "",
      expertise: "",
      description: "Description...",
      rating: "",
      reviewsText: "",
      biography: "",
      imageUrl: "",
    };
    setDoctors((prev) => [...prev, newDoctor]);
  };

  const handleDeleteDoctor = (localId) => {
    const doc = doctors.find((d) => d._localId === localId);
    const name = doc?.name || "this doctor";

    if (!window.confirm(`Do you really want to delete ${name}?`)) return;

    setDoctors((prev) => prev.filter((d) => d._localId !== localId));
  };

  const handleDoctorChange = (localId, field, value) => {
    setDoctors((prev) =>
      prev.map((d) =>
        d._localId === localId ? { ...d, [field]: value } : d
      )
    );
  };

  const handleDoctorImageChange = (localId, file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result;

      setDoctors((prev) =>
        prev.map((d) =>
          d._localId === localId ? { ...d, imageUrl: base64 } : d
        )
      );
    };
    reader.readAsDataURL(file);
  };

  const saveDoctorsToDB = async () => {
    try {
      setSaving(true);

      // local helper id hatake DB ko clean data bhej
      const payloadDoctors = doctors.map(({ _localId, _id, ...rest }) => rest);

      const res = await fetch(`${API_BASE}/pages/home`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ doctors: payloadDoctors }),
      });

      if (!res.ok) {
        throw new Error("Request failed");
      }

      const data = await res.json();
      console.log("💾 Save response:", data);

      alert("✅ Doctors saved to database!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save doctors");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className="p-4 md:p-8 min-h-screen"
      style={{ backgroundColor: "#f4f7f9" }}
    >
      <div className="flex items-center justify-between mb-4 gap-4 flex-wrap">
        <div>
          <h1
            className="text-3xl font-extrabold mb-1"
            style={{ color: SECONDARY_COLOR }}
          >
            Doctors Management
          </h1>
          <p className="text-gray-500">
            Add, edit, or remove expert doctor profiles displayed on the
            website.
          </p>
        </div>

        <button
          onClick={saveDoctorsToDB}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold transition-all duration-200 shadow-md"
          style={{ backgroundColor: PRIMARY_COLOR, opacity: saving ? 0.7 : 1 }}
        >
          {saving ? (
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <FaCheckCircle />
          )}
          {saving ? "Saving..." : "Save All Doctors"}
        </button>
      </div>

      <button
        onClick={handleAddDoctor}
        className="flex items-center gap-2 px-6 py-3 rounded-full text-white font-semibold mb-8 transition-all duration-200 shadow-md"
        style={{ backgroundColor: PRIMARY_COLOR }}
      >
        <FaUserPlus /> Add New Doctor
      </button>

      {loading ? (
        <div className="text-gray-500">Loading doctors...</div>
      ) : (
        <div className="space-y-6">
          {doctors.map((doctor, index) => (
            <DoctorEditorCard
              key={doctor._localId}
              doctor={doctor}
              index={index}
              onDelete={handleDeleteDoctor}
              onChange={handleDoctorChange}
              onImageChange={handleDoctorImageChange}
            />
          ))}

          {doctors.length === 0 && (
            <div className="text-gray-400 italic">No doctors added yet.</div>
          )}
        </div>
      )}
    </div>
  );
}
