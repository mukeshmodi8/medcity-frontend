import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaPhoneAlt,
  FaFileAlt,
  FaClock,
} from "react-icons/fa";
import { BsCalendar2Check } from "react-icons/bs";

import HeroImg from "../assets/TWS01558.jpg";
import ProfileImg from "../assets/TWS01558.jpg";

export default function DoctorProfile({
  heroImage = HeroImg,
  profileImage = ProfileImg,

  name = "Dr. Poonam Maheta",
  designation = "Dental Specialist",
  shortDesc = "Absolute elation of stunning skin & smile with Elite 32 Dental & Cosmetic Clinic",
  rating = "4.9",
  reviewsText = "based on 7541 reviews",
  biography = `<p>A neurologist is a medical doctor with specialized training in diagnosing, treating, and managing disorders of the brain and nervous system including, but not limited to, Alzheimer's disease, amyotrophic lateral sclerosis (ALS), concussion, epilepsy, migraine, multiple sclerosis, Parkinson's disease, and stroke.</p>
    <p>He then traveled to Philadelphia, Pennsylvania to complete a Fellowship in Intervention Cardiology at Hahnemann Hospital in conjunction with Drexel University, where he received extensive training in coronary as well as peripheral interventions and limb salvage procedures.</p>`,
  specialties = [
    { title: "Speciality", value: "Cardiology" },
    { title: "Degrees", value: "M.D. of Medicine" },
    { title: "Areas Of Expertise", value: "Cardiac Imaging — Non-invasive." },
  ],
}) {
  return (
    <section className="w-full bg-white text-slate-800">
      {/* HERO */}
      <div
        className="h-56 md:h-72 lg:h-40 relative"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,191,166,0.85) 0%, rgba(92,210,200,0.85) 60%), url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-end px-4 md:px-6">
          <div className="flex items-center gap-6">
            <div className="text-white text-right hidden md:block">
              <div className="text-3xl font-bold">{rating}</div>
              <div className="text-xs opacity-80">{reviewsText}</div>
            </div>
            <button className="bg-white text-teal-600 px-4 py-2 rounded-full shadow-md flex items-center gap-2">
              <BsCalendar2Check />
              Appointment
            </button>
          </div>
        </div>
      </div>

      {/* MAIN: profile + bio */}
      <div className="max-w-[1200px] mx-auto -mt-20 px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT column */}
          <div className="lg:col-span-4 flex flex-col items-center lg:items-start">
            <div className="w-full max-w-xs bg-white rounded-xl shadow-lg overflow-hidden relative z-20">
              <div className="overflow-hidden rounded-t-xl">
                <img src={profileImage} alt={name} className="w-full h-64 object-cover block" />
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                <div className="text-sm text-teal-500 mb-3">{designation}</div>
                <p className="text-gray-500 text-sm">{shortDesc}</p>

                <div className="flex items-center gap-3 mt-4">
                  <a href="#" className="p-2 rounded-full bg-slate-50 text-slate-700 border border-slate-100 hover:bg-slate-100"><FaFacebookF /></a>
                  <a href="#" className="p-2 rounded-full bg-slate-50 text-slate-700 border border-slate-100 hover:bg-slate-100"><FaTwitter /></a>
                  <a href="tel:+918238028844" className="p-2 rounded-full bg-slate-50 text-slate-700 border border-slate-100 hover:bg-slate-100"><FaPhoneAlt /></a>
                </div>
              </div>

              <div className="h-1 w-full bg-gradient-to-r from-teal-400 to-teal-300" />
            </div>

            {/* Emergency box */}
            <div className="w-full max-w-xs bg-gradient-to-br from-teal-400 to-teal-300 text-white rounded-xl p-6 mt-8 shadow-md">
              <h4 className="font-semibold mb-2">Emergency Cases</h4>
              <p className="text-sm opacity-90">Please feel welcome to contact our friendly reception staff with any general or medical enquiry call us.</p>
              <div className="mt-4 inline-flex items-center gap-3 font-semibold">
                <div className="bg-white/20 p-2 rounded-full"><FaPhoneAlt /></div>
                <span>01061245741</span>
              </div>
            </div>
          </div>
          <div className="lg:col-span-8 bg-white rounded-xl p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Biography</h2>

            <div className="prose prose-sm max-w-none text-gray-700 mb-6" dangerouslySetInnerHTML={{ __html: biography }} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              {specialties.map((s, idx) => (
                <div key={idx} className="bg-teal-50 p-4 rounded-lg">
                  <div className="text-xs text-teal-500 font-semibold">{s.title}</div>
                  <div className="text-sm text-gray-700 mt-2">{s.value}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Areas of Expertise</h3>
              <ul className="list-disc list-inside text-gray-700">
                <li>Advanced diagnostic procedures</li>
                <li>Minimally invasive interventions</li>
                <li>Long-term rehabilitation planning</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-[1200px] mx-auto px-4 lg:px-8 mt-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-4 flex flex-col gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-teal-50 rounded-md text-teal-600"><FaClock /></div>
                <div>
                  <h5 className="font-semibold">Opening Hours</h5>
                  <div className="text-sm text-gray-600 mt-3 space-y-1">
                    <div className="flex justify-between"><span>Monday - Friday</span><span>10:00 - 8:00 pm</span></div>
                    <div className="flex justify-between"><span>Saturday</span><span>Close</span></div>
                    <div className="flex justify-between"><span>Sunday</span><span>Close</span></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <button className="w-full bg-teal-500 hover:bg-teal-600 text-white rounded-md px-4 py-3 flex items-center justify-center gap-3 shadow">
                <FaFileAlt /> 2020 Patient Reports
              </button>
            </div>
          </aside>
          <div className="lg:col-span-8 space-y-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">Doctor’s Services</h3>
              <p className="text-gray-600 mt-3">
                He actively participates in clinical research trials and has been published in peer reviewed journals. Our clinic provides modern facilities and trained staff for all major procedures.
              </p>
            </div>

            {/* Booking card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl shadow-xl">
              <div className="bg-white rounded-xl p-8 md:p-10">
                <h4 className="text-xl font-semibold mb-3">Book An Appointment</h4>
                <p className="text-sm text-gray-600 mb-6">
                  Please feel welcome to contact our friendly reception staff with any general or medical enquiry.
                </p>

                <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <select className="p-3 border rounded-md">
                    <option>Choose Clinic</option>
                    <option>Main Clinic</option>
                    <option>Dental Clinic</option>
                  </select>

                  <select className="p-3 border rounded-md">
                    <option>Choose Doctor</option>
                    <option>Dr. Ruchira Shah</option>
                    <option>Dr. Poonam Maheta</option>
                  </select>

                  <input type="text" placeholder="Name" className="p-3 border rounded-md" />
                  <input type="email" placeholder="Email" className="p-3 border rounded-md" />

                  <input type="tel" placeholder="Phone" className="p-3 border rounded-md" />
                  <input type="date" className="p-3 border rounded-md" />

                  <div className="md:col-span-2 flex items-center gap-3">
                    <select className="p-3 border rounded-md flex-1">
                      <option>Time</option>
                      <option>09:00 AM</option>
                      <option>10:00 AM</option>
                    </select>
                    <button type="button" className="bg-teal-500 hover:bg-teal-600 text-white px-6 py-3 rounded-full font-semibold">
                      Book Appointment →
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="h-16" />
    </section>
  );
}
