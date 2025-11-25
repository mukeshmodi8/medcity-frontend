import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLongArrowAltRight,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock,
  FaArrowUp
} from "react-icons/fa";

const PRIMARY = "#00bfa6";  
const NAVY = "#15243f";        
const CONTACT_BG = "#ffffff";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: NAVY, color: "white" }}>
      {/* main container */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

          {/* Logo & About */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-md flex items-center justify-center bg-white/10">
                {/* small logo placeholder (replace with img tag if you have one) */}
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path d="M3 12h18" stroke={PRIMARY} strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 3v18" stroke="white" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold" style={{ color: "white" }}>Medcity</h3>
            </div>

            <p className="text-gray-300 text-sm mb-6 max-w-xs">
              Our goal is to deliver quality of care in a courteous, respectful, and compassionate manner.
              We hope you will allow us to care for you and strive to be the first and best choice for family healthcare.
            </p>

            <Link
              to="/appointment"
              className="inline-flex items-center gap-2 text-sm font-semibold"
              style={{ color: PRIMARY }}
            >
              Make Appointment <FaLongArrowAltRight />
            </Link>
          </div>

          {/* Departments */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-semibold mb-6" style={{ color: "white" }}>Departments</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/department/neurology" className="hover:text-white transition-colors">Neurology Clinic</Link></li>
              <li><Link to="/department/cardiology" className="hover:text-white transition-colors">Cardiology Clinic</Link></li>
              <li><Link to="/department/pathology" className="hover:text-white transition-colors">Pathology Clinic</Link></li>
              <li><Link to="/department/laboratory" className="hover:text-white transition-colors">Laboratory Analysis</Link></li>
              <li><Link to="/department/pediatric" className="hover:text-white transition-colors">Pediatric Clinic</Link></li>
              <li><Link to="/department/cardiac" className="hover:text-white transition-colors">Cardiac Clinic</Link></li>
            </ul>
          </div>

          {/* Links */}
          <div className="lg:col-span-1">
            <h4 className="text-xl font-semibold mb-6" style={{ color: "white" }}>Links</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/our-clinic" className="hover:text-white transition-colors">Our Clinic</Link></li>
              <li><Link to="/doctors" className="hover:text-white transition-colors">Our Doctors</Link></li>
              <li><Link to="/news" className="hover:text-white transition-colors">News & Media</Link></li>
              <li><Link to="/appointments" className="hover:text-white transition-colors">Appointments</Link></li>
            </ul>
          </div>

          {/* Contact Card (white) */}
          <div className="lg:col-span-1">
            <div className="relative rounded-2xl overflow-visible">
              <div
                className="absolute -left-6 top-6 h-[calc(100%-1.5rem)] w-1 rounded-md"
                style={{ backgroundColor: PRIMARY }}
              />
              <div
                className="p-8 rounded-2xl shadow-2xl bg-white relative"
                style={{ color: NAVY }}
              >
                <h4 className="text-xl font-bold mb-3">Quick Contacts</h4>
                <p className="text-sm text-gray-600 mb-4">
                  If you have any questions or need help, feel free to contact our team.
                </p>

                <a href="tel:+918238028844" className="block text-2xl font-bold mb-3" style={{ color: NAVY }}>
                  +9182380 28844
                </a>

                <p className="text-sm text-gray-600 mb-4">
                  Elite 32 Multispeciality Dental Clinic 11GF, B-2, Goyal Palladium, Near Vodafone Tower, 80ft Prahladnagar Corporate Road, Ahmedabad 380051, Gujarat
                </p>

                <div className="flex items-center justify-between">
                  <a
                    href="https://maps.app.goo.gl/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold"
                    style={{ color: PRIMARY }}
                  >
                    <FaMapMarkerAlt /> Get Directions
                  </a>

                  <div className="flex items-center gap-3">
                    <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center bg-[#0f2b4a] text-white hover:opacity-90 transition">
                      <FaFacebookF />
                    </a>
                    <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center bg-[#0f2b4a] text-white hover:opacity-90 transition">
                      <FaInstagram />
                    </a>
                    <a href="#" className="w-9 h-9 rounded-full flex items-center justify-center bg-[#0f2b4a] text-white hover:opacity-90 transition">
                      <FaTwitter />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* bottom row */}
        <div className="mt-12 pt-8 border-t border-white/10 text-sm text-gray-400">
          <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4 md:gap-0">
            <p>© 2020 DataSoft. All Rights Reserved. With Love by <Link to="/" className="font-semibold" style={{ color: PRIMARY }}>Medcity</Link></p>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex items-center gap-4">
                <Link to="/terms" className="hover:text-white">Terms & Conditions</Link>
                <Link to="/privacy" className="hover:text-white">Privacy Policy</Link>
                <Link to="/cookies" className="hover:text-white">Cookies</Link>
              </div>
              <div className="flex items-center gap-4 md:gap-6">
                <div className="flex items-center gap-2 text-gray-300">
                  <FaPhoneAlt /> <span className="text-sm">+91 82380 28844</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <FaClock /> <span className="text-sm">Mon - Fri: 10:00 - 20:00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-50"
        style={{ backgroundColor: PRIMARY, color: "white" }}
        aria-label="Scroll to top"
      >
        <FaArrowUp />
      </button>
    </footer>
  );
}
