import React from "react";
import { FaPhoneAlt, FaHeartbeat, FaStethoscope, FaCheckCircle } from "react-icons/fa";

import Doc1 from "../assets/1.jpg";
import Doc2 from "../assets/1.jpg";
import Doc3 from "../assets/1.jpg";
import ReportPdf from  "../assets/testimonials.jpg";


const PRIMARY_COLOR = "#21CDC0";
const SECONDARY_COLOR = "#283B6A";

export default function ServicesExtras() {
  const investigations = [
    { name: "Umbilical Cord Appearance", price: "$50" },
    { name: "Cardiac Electrophysiology", price: "$45" },
    { name: "Blood Test Panel", price: "$35" },
    { name: "MRI Scan", price: "$120" },
  ];

  const treatments = [
    { name: "Colonoscopy", price: "$50" },
    { name: "Allergy testing", price: "$45" },
    { name: "Minor Surgery", price: "$80" },
    { name: "Physiotherapy Session", price: "$30" },
  ];

  return (
    <>
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2">
              <h3 className="text-3xl font-extrabold mb-4" style={{ color: SECONDARY_COLOR }}>
                Our Core Values
              </h3>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Today the hospital is recognised as a world renowned institution, not only providing outstanding care and treatment,
                but improving outcomes for all through a comprehensive medical research programme. For over 20 years our hospital has touched
                lives of millions of people, and provide care and treatment for the sickest in our community including rehabilitation and aged care.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-[#E8F7F5] rounded-2xl p-6 shadow">
                  <h4 className="text-lg font-semibold mb-4" style={{ color: SECONDARY_COLOR }}>
                    Investigations Price List
                  </h4>
                  <ul className="space-y-4">
                    {investigations.map((it, i) => (
                      <li key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/60 shadow-sm">
                            <FaStethoscope className="text-[#21CDC0]" />
                          </span>
                          <span className="text-sm text-gray-700">{it.name}</span>
                        </div>
                        <span
                          className="text-sm font-semibold px-3 py-1 rounded-full"
                          style={{ backgroundColor: "#ffffff", color: SECONDARY_COLOR }}
                        >
                          {it.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Treatments Price List */}
                <div className="bg-white rounded-2xl p-6 shadow border">
                  <h4 className="text-lg font-semibold mb-4" style={{ color: SECONDARY_COLOR }}>
                    Treatments Price List
                  </h4>
                  <ul className="space-y-4">
                    {treatments.map((t, i) => (
                      <li key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/90 shadow-sm">
                            <FaHeartbeat className="text-[#21CDC0]" />
                          </span>
                          <span className="text-sm text-gray-700">{t.name}</span>
                        </div>
                        <span className="text-sm font-semibold px-3 py-1 rounded-full bg-[#F3F8F9]" style={{ color: SECONDARY_COLOR }}>
                          {t.price}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom small CTA row */}
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold"
                  style={{ backgroundColor: PRIMARY_COLOR, color: "white" }}
                >
                  <FaCheckCircle /> Make Appointment
                </button>

                <a href="/values" className="text-sm font-medium text-gray-600">
                  Our Core Values →
                </a>
              </div>
            </div>

            {/* Right: Emergency Cases box */}
            <aside className="px-4">
              <div className="bg-[#0F2540] text-white rounded-2xl p-6 shadow-lg relative overflow-hidden">
                {/* decorative stripe */}
                <div className="absolute left-0 top-0 h-full w-1 bg-[#21CDC0]"></div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <FaPhoneAlt className="text-white text-lg" />
                  </div>
                  <div>
                    <h5 className="text-xl font-bold">Emergency Cases</h5>
                    <p className="text-sm opacity-90 mt-1">Please feel welcome to contact our friendly reception staff</p>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-2xl font-bold">+91 82380 28844</div>
                  <div className="text-sm opacity-90 mt-2">Mon - Fri: 9:00 am - 8:00 pm</div>

                  <a
                    href="tel:+9101061245741"
                    className="inline-block mt-6 px-6 py-2 rounded-full border border-white text-white font-semibold hover:bg-white hover:text-[#21CDC0] transition"
                  >
                    Call Now
                  </a>
                </div>
              </div>

              {/* small card under emergency */}
              <div className="mt-6">
                <div className="bg-white rounded-xl p-4 shadow">
                  <h6 className="font-semibold mb-2" style={{ color: SECONDARY_COLOR }}>Need Help?</h6>
                  <p className="text-sm text-gray-600">If you have an urgent enquiry please call our emergency number or visit the reception desk.</p>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Meet Our Doctors Section  */}
      <section className="py-20 bg-white">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-extrabold mb-4 text-[#283B6A]">
                Meet Our Doctors
              </h2>

              <p className="text-gray-500 mb-8 max-w-xl">
                Our administration and support staff all have exceptional people skills
                and are trained to assist you with all medical enquiries.
              </p>

              {/* DOCTOR */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                {/* Doctor 1 */}
                <div className="flex flex-col items-start gap-4">
                  <div className="w-full rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={Doc1}
                      className="w-full h-48 object-cover rounded-lg"
                      alt="Maria Andaloro"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#283B6A]">Maria Andaloro</h4>
                    <p className="text-sm text-[#21CDC0] mt-1">Pediatrician</p>
                  </div>
                </div>

                {/* Doctor 2 */}
                <div className="flex flex-col items-start gap-4">
                  <div className="w-full rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={Doc2}
                      className="w-full h-48 object-cover rounded-lg"
                      alt="Dupree Black"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#283B6A]">Dupree Black</h4>
                    <p className="text-sm text-[#21CDC0] mt-1">Urologist</p>
                  </div>
                </div>

                {/* Doctor 3 */}
                <div className="flex flex-col items-start gap-4">
                  <div className="w-full rounded-lg overflow-hidden shadow-sm">
                    <img
                      src={Doc3}
                      className="w-full h-48 object-cover rounded-lg"
                      alt="Markus Skar"
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-[#283B6A]">Markus Skar</h4>
                    <p className="text-sm text-[#21CDC0] mt-1">Laboratory</p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE (SIDEBAR) */}
            <aside className="space-y-6">
              {/* Opening Hours Card */}
              <div className="bg-white border rounded-xl shadow p-6">
                <h5 className="text-xl font-bold text-[#283B6A] mb-4">Opening Hours</h5>

                <ul className="text-sm text-gray-600 space-y-3">
                  <li className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="font-semibold text-[#283B6A]">8.00 - 7:00 pm</span>
                  </li>

                  <li className="flex justify-between">
                    <span>Saturday</span>
                    <span className="font-semibold text-[#283B6A]">9.00 - 10:00 pm</span>
                  </li>

                  <li className="flex justify-between">
                    <span>Sunday</span>
                    <span className="font-semibold text-[#283B6A]">10.00 - 12:00 pm</span>
                  </li>
                </ul>
              </div>

              {/* PDF Download */}
              <div className="bg-white rounded-xl shadow p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-[#21CDC0] flex items-center justify-center text-white text-lg">
                    PDF
                  </div>
                  <div>
                    <h6 className="text-base font-semibold text-[#283B6A]">
                      2020 Patient Reports
                    </h6>
                    <p className="text-xs text-gray-400">Download Complete File</p>
                  </div>
                </div>

                <a
                  href={ReportPdf}
                  download
                  className="px-4 py-2 bg-[#21CDC0] text-white rounded-full text-sm font-semibold text-center"
                >
                  Download PDF
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
