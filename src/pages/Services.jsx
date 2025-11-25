import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { RiPlayCircleLine } from "react-icons/ri";
import { FaStethoscope, FaHeartbeat, FaAmbulance, FaFlask } from "react-icons/fa";

import ServiceHero from "../assets/11.jpg";
import AboutVideoImage from "../assets/3.jpg";
import ServiceThumb1 from "../assets/1.jpg";
import ServiceThumb2 from "../assets/AC.jpg";
import ServiceThumb3 from "../assets/3 (1).jpg";
import ServicesExtras from "../components/ServicesExtras";

const PRIMARY_COLOR = "#21CDC0";
const SECONDARY_COLOR = "#283B6A";

export default function ServiceSection() {
  const services = [
    { title: "Neurology Clinic", icon: <FaStethoscope />, to: "/services/neurology" },
    { title: "Cardiology Clinic", icon: <FaHeartbeat />, to: "/services/cardiology" },
    { title: "Pathology Clinic", icon: <FaFlask />, to: "/services/pathology" },
    { title: "Laboratory Clinic", icon: <FaFlask />, to: "/services/laboratory" },
    { title: "Pediatric Clinic", icon: <FaStethoscope />, to: "/services/pediatric" },
    { title: "Cardiac Clinic", icon: <FaHeartbeat />, to: "/services/cardiac" }
  ];

  return (
    <section className="w-full bg-white overflow-hidden">
      <div
        className="w-full bg-cover bg-center h-56 md:h-64 lg:h-100 relative"
        style={{
          backgroundImage: `url(${ServiceHero})`,
          backgroundBlendMode: "overlay"
        }}
      >
        <div className="absolute inset-0 bg-white/60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="rounded-full bg-white/90 p-4 shadow-lg mb-4">
            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center border-2 border-white/40">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke={SECONDARY_COLOR} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 7h20M7 7v13M17 7v13M7 20h10" />
              </svg>
            </div>
          </div>

          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center" style={{ color: SECONDARY_COLOR }}>
            Pathology Clinic
          </h2>

          <p className="mt-3 text-sm md:text-base text-gray-600 max-w-3xl text-center px-6">
            Pathology is the study of disease. It is the bridge between science and medicine. It underpins every aspect of patient care,
            from diagnostic testing and treatment advice to using cutting-edge genetic technologies and preventing disease.
          </p>

          <div className="mt-6">
            <div className="w-10 h-10 bg-white rounded-full shadow flex items-center justify-center text-[#21cdc0]">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={PRIMARY_COLOR} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M19 12l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-12 py-20 grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="text-sm text-gray-700 leading-relaxed">
            <p>
              A neurologist is a medical doctor with specialized training in diagnosing, treating, and managing disorders
              of the brain and nervous system including, but not limited to, Alzheimer's disease, amyotrophic lateral sclerosis (ALS),
              concussion, epilepsy, migraine, multiple sclerosis, Parkinson's disease, and stroke.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            <div className="rounded-xl overflow-hidden shadow-xl bg-white">
              <div className="relative">
                <img src={AboutVideoImage} alt="video-thumb" className="w-full h-64 md:h-72 object-cover" />
                <button
                  type="button"
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-md"
                  aria-label="Play lab tour"
                >
                  <RiPlayCircleLine className="text-3xl" style={{ color: PRIMARY_COLOR }} />
                </button>
              </div>
              <div className="p-5">
                <h4 className="text-lg font-semibold" style={{ color: SECONDARY_COLOR }}>Watch Our Lab Tour</h4>
                <p className="text-sm text-gray-500 mt-2">Take a virtual tour of our pathology labs and see how tests are processed end-to-end.</p>
              </div>
            </div>

            <div className="relative">
              <div className="p-6 rounded-xl bg-gradient-to-r from-white to-white shadow-md" style={{ borderLeft: `4px solid ${PRIMARY_COLOR}` }}>
                <h5 className="text-lg font-bold mb-3" style={{ color: SECONDARY_COLOR }}>Medical Services</h5>
                <p className="text-sm text-gray-600 mb-4">Qualified doctors and labs available six days a week. Choose a department below to learn more.</p>

                <ul className="space-y-3">
                  {services.map((s, idx) => (
                    <li key={idx}>
                      <a
                        href={s.to}
                        className="flex items-center justify-between bg-white rounded-full px-4 py-3 shadow-sm hover:shadow-md transition"
                        style={{ color: SECONDARY_COLOR }}
                      >
                        <div className="flex items-center gap-3">
                          <span className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-[18px]" style={{ color: PRIMARY_COLOR }}>{s.icon}</span>
                          <span className="font-medium">{s.title}</span>
                        </div>
                        <IoIosArrowForward />
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-6">
                  <a
                    href="/doctors"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border font-semibold"
                    style={{ borderColor: SECONDARY_COLOR, color: SECONDARY_COLOR }}
                  >
                    Find A Doctor <IoIosArrowForward />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white rounded-xl shadow p-6 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-white/50 flex items-center justify-center mb-4" style={{ color: PRIMARY_COLOR }}>
                <FaStethoscope />
              </div>
              <h6 className="font-semibold" style={{ color: SECONDARY_COLOR }}>Advanced Testing</h6>
              <p className="text-sm text-gray-500 mt-2">State-of-the-art diagnostic equipment and certified technicians.</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-white/50 flex items-center justify-center mb-4" style={{ color: PRIMARY_COLOR }}>
                <FaFlask />
              </div>
              <h6 className="font-semibold" style={{ color: SECONDARY_COLOR }}>Accredited Labs</h6>
              <p className="text-sm text-gray-500 mt-2">ISO certified labs with rapid result turnaround.</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6 text-center">
              <div className="w-14 h-14 mx-auto rounded-full bg-white/50 flex items-center justify-center mb-4" style={{ color: PRIMARY_COLOR }}>
                <FaAmbulance />
              </div>
              <h6 className="font-semibold" style={{ color: SECONDARY_COLOR }}>24/7 Emergency</h6>
              <p className="text-sm text-gray-500 mt-2">Emergency sample pickup and rapid reporting available.</p>
            </div>
          </div>
        </div>
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h5 className="text-lg font-bold mb-4" style={{ color: SECONDARY_COLOR }}>Services</h5>

              <ul className="space-y-3">
                {services.map((s, idx) => (
                  <li key={idx}>
                    <a href={s.to} className="flex items-center justify-between gap-4 py-3 px-3 rounded-full hover:bg-gray-50 transition">
                      <div className="flex items-center gap-3">
                        <span className="text-lg" style={{ color: PRIMARY_COLOR }}>{s.icon}</span>
                        <span className="font-medium" style={{ color: SECONDARY_COLOR }}>{s.title}</span>
                      </div>
                      <IoIosArrowForward />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6">
                <a href="/contact" className="inline-block px-4 py-2 rounded-full bg-[#21CDC0] text-white font-semibold">Make Appointment</a>
              </div>
            </div>
          </div>
        </aside>
      </div>
      <ServicesExtras />
    </section>
  );
}
