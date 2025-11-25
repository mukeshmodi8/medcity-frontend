// src/pages/Doctors.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Doctor UI
import DoctorProfile from "../components/DoctorProfile";

const API_BASE = "https://medcity-backend-t66f.onrender.com";
const SECONDARY_COLOR = "#233d87";

// name se slug banane ka helper (fallback)
const slugFromName = (name = "") =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function Doctors() {
  const { doctorId } = useParams(); // /doctors/:doctorId
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 doctors list backend se
  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/pages/home`);
        const data = await res.json();

        if (Array.isArray(data.doctors)) {
          setDoctors(data.doctors);
        } else {
          setDoctors([]);
        }
      } catch (err) {
        console.error("Failed to load doctors:", err);
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading doctors...</div>
      </section>
    );
  }

  // ✅ agar URL me :doctorId hai, to specific doctor nikaalo
  let selectedDoctor = null;
  if (doctorId) {
    selectedDoctor =
      doctors.find((d) => d._id === doctorId) ||
      doctors.find((d) => slugFromName(d.name) === doctorId);
  }

  // ❌ agar doctor nahi mila
  if (doctorId && !selectedDoctor) {
    return (
      <section className="min-h-screen bg-gray-50 py-20 text-center">
        <h1
          className="text-3xl font-bold mb-4"
          style={{ color: SECONDARY_COLOR }}
        >
          Doctor Not Found
        </h1>
        <p className="text-gray-500">
          The doctor you are looking for does not exist.
        </p>
      </section>
    );
  }

  // ✅ DETAIL PAGE – yahan tumhara DoctorProfile use ho raha hai
  if (selectedDoctor) {
    const biographyHtml =
      selectedDoctor.biography ||
      `<p>${selectedDoctor.description || ""}</p>`;

    return (
      <DoctorProfile
        // images
        profileImage={selectedDoctor.imageUrl}
        heroImage={selectedDoctor.imageUrl}

        // basic info
        name={selectedDoctor.name}
        designation={selectedDoctor.specialization}
        shortDesc={selectedDoctor.description}

        // rating + reviews text admin se
        rating={selectedDoctor.rating || "4.9"}
        reviewsText={
          selectedDoctor.reviewsText || "based on 7541 reviews"
        }

        // long biography
        biography={biographyHtml}

        // specialties cards
        specialties={[
          {
            title: "Speciality",
            value: selectedDoctor.specialization || "Specialist",
          },
          {
            title: "Degrees",
            value: selectedDoctor.degrees || "M.D. of Medicine",
          },
          {
            title: "Areas Of Expertise",
            value:
              selectedDoctor.expertise ||
              "Cardiac Imaging — Non-invasive.",
          },
        ]}
      />
    );
  }

  // ✅ /doctors – sabhi doctors ka simple grid (list)
  return (
    <section className="min-h-screen bg-gray-50 py-20 text-center">
      <h1
        className="text-4xl font-bold mb-6"
        style={{ color: SECONDARY_COLOR }}
      >
        Doctors 👩‍⚕️👨‍⚕️
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto mb-10">
        Meet our professional and highly qualified doctors who provide
        exceptional medical care and patient support.
      </p>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
        {doctors.map((doc) => (
          <div
            key={doc._id}
            className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center"
          >
            <img
              src={
                doc.imageUrl ||
                "https://via.placeholder.com/128x128?text=Doctor"
              }
              alt={doc.name}
              className="w-32 h-32 mx-auto rounded-full mb-4 object-cover"
            />
            {/* 👇 yahan speciality upar, description niche */}
            <p className="text-sm text-gray-500 mb-1">
              {doc.specialization || "Specialist"}
            </p>
            <h3
              className="text-lg font-semibold mb-2"
              style={{ color: SECONDARY_COLOR }}
            >
              {doc.name}
            </h3>
            <p className="text-gray-500 text-sm">
              {doc.description || "Description..."}
            </p>
          </div>
        ))}
        {doctors.length === 0 && (
          <div className="col-span-full text-gray-400 italic">
            No doctors added yet.
          </div>
        )}
      </div>
    </section>
  );
}
