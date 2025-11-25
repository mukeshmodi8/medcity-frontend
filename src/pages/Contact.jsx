import React, { useState, useEffect } from "react";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaClipboardList,
  FaInfoCircle,
  FaPaperPlane,
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";

import Thumb1 from "../assets/1.jpg";
import Thumb2 from "../assets/AC.jpg";
import Thumb3 from "../assets/3 (1).jpg";
import Thumb4 from "../assets/3.jpg";

import TestimonialThumb from "../assets/testimonials.jpg";

const PRIMARY_COLOR = "#21CDC0"; 
const SECONDARY_COLOR = "#283B6A";

export default function ContactSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [currentThumbIndex, setCurrentThumbIndex] = useState(0);

  const testimonials = [
    {
      quote:
        "Their Doctors Include Highly Qualified Practitioners Who Come From A Range Of Backgrounds And Bring With Them A Diversity Of Skills And Special Interests.",
      author: "Sami Wade",
      role: "7oroof Inc"
    },
    {
      quote:
        "Our team is committed to providing outstanding patient care and treatment, and we pride ourselves on having highly qualified practitioners.",
      author: "Ahmed",
      role: "Web Inc"
    },
    {
      quote:
        "We are dedicated to delivering quality care in a courteous, respectful, and compassionate manner.",
      author: "Sonia Blake",
      role: "Web Inc"
    }
  ];

  const thumbs = [Thumb1, Thumb2, Thumb3, Thumb4];

  useEffect(() => {
    const iv = setInterval(() => {
      setCurrentTestimonial((s) => (s + 1) % testimonials.length);
      setCurrentThumbIndex((s) => (s + 1) % thumbs.length);
    }, 6000);
    return () => clearInterval(iv);
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    console.log("Contact form data:", data);
    alert("Request submitted (demo). Check console.");
    e.target.reset();
  };

  const onThumbPrev = () => {
    setCurrentThumbIndex((prev) => (prev === 0 ? thumbs.length - 1 : prev - 1));
  };
  const onThumbNext = () => {
    setCurrentThumbIndex((prev) => (prev === thumbs.length - 1 ? 0 : prev + 1));
  };


  const onThumbClick = (idx) => {
    setCurrentThumbIndex(idx);
    setCurrentTestimonial(idx % testimonials.length);
  };

  return (
    <section className="relative w-full bg-white">
      <div className="w-full h-[300px] md:h-[380px] lg:h-[450px] overflow-hidden">
        <iframe
          title="Google Map"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          src="https://www.google.com/maps/embed?origin=mfe&pb=!1m4!2m1!1sSuite+100+San+Francisco,+LA+94107+United+States!5e0!6i10"
        ></iframe>
      </div>

      {/* CONTACT FORM CARD */}
      <div className="max-w-[1100px] mx-auto px-4 md:px-6 -mt-20 md:-mt-28 lg:-mt-32 relative z-20">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-3">

          {/* LEFT FORM */}
          <div className="lg:col-span-2 p-6 md:p-10">
            <h3 className="text-2xl md:text-3xl font-bold" style={{ color: SECONDARY_COLOR }}>
              How Can We Help?
            </h3>

            <p className="mt-3 text-gray-500 text-base leading-relaxed">
              Please feel welcome to contact our friendly reception staff with any general or medical
              enquiry. Our doctors will receive or return any urgent calls.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">

              {/* Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaUser />
                  </span>
                  <input
                    name="name"
                    required
                    placeholder="Name"
                    className="w-full py-4 pl-12 pr-4 border border-gray-300 rounded-full text-gray-700 focus:ring-2 focus:ring-[rgba(33,205,192,0.15)] outline-none"
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaEnvelope />
                  </span>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    className="w-full py-4 pl-12 pr-4 border border-gray-300 rounded-full text-gray-700 focus:ring-2 focus:ring-[rgba(33,205,192,0.15)] outline-none"
                  />
                </div>
              </div>

              {/* Phone + Subject */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaPhone />
                  </span>
                  <input
                    name="phone"
                    placeholder="Phone"
                    className="w-full py-4 pl-12 pr-4 border border-gray-300 rounded-full text-gray-700 focus:ring-2 focus:ring-[rgba(33,205,192,0.15)] outline-none"
                  />
                </div>

                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    <FaClipboardList />
                  </span>
                  <select
                    name="subject"
                    defaultValue=""
                    className="w-full py-4 pl-12 pr-12 border border-gray-300 rounded-full text-gray-700 appearance-none focus:ring-2 focus:ring-[rgba(33,205,192,0.15)] outline-none"
                  >
                    <option value="" disabled>Subject</option>
                    <option value="appointment">Appointment</option>
                    <option value="general">General Enquiry</option>
                  </select>

                  <span className="absolute right-5 top-1/2 -translate-y-1/2 text-[#283B6A]">
                    ▾
                  </span>
                </div>
              </div>

              {/* Message */}
              <div className="relative">
                <span className="absolute left-4 top-4 text-gray-400">
                  <FaInfoCircle />
                </span>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Message"
                  className="w-full py-4 pl-12 pr-4 border border-gray-300 rounded-xl text-gray-700 focus:ring-2 focus:ring-[rgba(33,205,192,0.15)] outline-none"
                ></textarea>
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 rounded-full text-white font-semibold text-lg shadow-lg flex items-center justify-center gap-2"
                style={{ backgroundColor: SECONDARY_COLOR }}
              >
                <FaPaperPlane /> Submit Request →
              </button>
            </form>
          </div>

          {/* RIGHT BOX */}
          <div
            className="p-8 md:p-10 flex items-start"
            style={{
              background: `linear-gradient(180deg, ${PRIMARY_COLOR}, ${SECONDARY_COLOR})`,
              color: "white",
            }}
          >
            <div className="w-full">
              <h4 className="text-3xl font-bold mb-4">Quick Contacts</h4>

              <p className="text-sm opacity-90 mb-8 leading-relaxed">
                Please feel free to contact our friendly staff with any medical enquiry.
              </p>

              <ul className="space-y-6 text-lg">
                <li className="flex gap-3 items-center">
                  <FaPhoneAlt className="text-xl" />
                  <span>Emergency Line: <span className="font-semibold">082380 28844</span></span>
                </li>

                <li className="flex gap-3 items-center">
                  <FaMapMarkerAlt className="text-xl" />
                  <span>Location: <span className="font-semibold">Ahmedabad, India, Gujarat</span></span>
                </li>

                <li className="flex gap-3 items-center">
                  <FaClock className="text-xl" />
                  <span>Mon - Fri: <span className="font-semibold">9:00 am - 8:00 pm</span></span>
                </li>
              </ul>

              <button
                className="mt-8 px-8 py-3 rounded-full border-2 border-white text-white hover:bg-white hover:text-[#21CDC0] transition font-semibold"
              >
                Contact Us
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* INSPIRING STORIES SECTION */}
      <section className="mt-20 max-w-[1100px] mx-auto px-4">
        <h2 className="text-3xl font-extrabold mb-6" style={{ color: SECONDARY_COLOR }}>
          Inspiring Stories!
        </h2>

        {/* Quote + author */}
        <div className="mb-10">
          <p className="text-lg leading-relaxed mb-6" style={{ color: SECONDARY_COLOR }}>
            “{testimonials[currentTestimonial].quote}”
          </p>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <img
                src={TestimonialThumb}
                className="w-14 h-14 rounded-full object-cover border-2"
                style={{ borderColor: PRIMARY_COLOR }}
                alt="author"
              />
              <div>
                <div className="font-semibold" style={{ color: SECONDARY_COLOR }}>
                  {testimonials[currentTestimonial].author}
                </div>
                <div className="text-xs text-gray-400">{testimonials[currentTestimonial].role}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Thumbnail slider */}
        <div className="relative">

          {/* left arrow */}
          <button
            onClick={onThumbPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full z-20"
            aria-label="prev"
          >
            <FaChevronLeft style={{ color: SECONDARY_COLOR }} />
          </button>

          {/* thumbs container */}
          <div className="overflow-hidden">
            <div
              className="flex gap-4 transition-transform duration-400"
              style={{
                // translate by thumb width + gap (250 + 10) = 260
                transform: `translateX(-${currentThumbIndex * 260}px)`
              }}
            >
              {thumbs.map((src, idx) => (
                <button
                  key={idx}
                  onClick={() => onThumbClick(idx)}
                  className="w-[250px] h-[160px] rounded-xl overflow-hidden shadow-md focus:outline-none transform hover:scale-[1.02] transition"
                  aria-label={`thumb-${idx+1}`}
                >
                  <img src={src} alt={`thumb-${idx}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* right arrow */}
          <button
            onClick={onThumbNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white shadow-md w-10 h-10 flex items-center justify-center rounded-full z-20"
            aria-label="next"
          >
            <FaChevronRight style={{ color: SECONDARY_COLOR }} />
          </button>
        </div>
      </section>

      <div className="h-20"></div>
    </section>
  );
}
