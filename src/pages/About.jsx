import React from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { RiPlayCircleLine } from 'react-icons/ri';
import { FaStethoscope, FaHeartbeat, FaAmbulance, FaLongArrowAltRight } from 'react-icons/fa';


import g2 from '../assets/1 (1).jpg';
import bg10 from "../assets/10.jpg"; 


const PRIMARY_COLOR = '#21CDC0';   
const SECONDARY_COLOR = '#283B6A';

export default function AboutUs() {
  return (
    <main className="about-page">
     <section
      className="relative w-full bg-cover bg-center flex items-center"
      style={{
        backgroundImage: `url(${bg10})`,  
        minHeight: "70vh",
      }}
    >
      {/* Blur Overlay */}
      <div className="absolute inset-0 bg-white/40 backdrop-blur-[3px]"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1200px] mx-auto px-6 py-16">
        <div className="max-w-2xl">
          
          {/* TITLE */}
          <h1
            className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight"
            style={{ color: SECONDARY_COLOR }}
          >
            Caring For The Health & <br /> Well Being Of Family.
          </h1>

          {/* SUBTEXT */}
          <p className="text-base md:text-lg font-medium mb-10" style={{ color: SECONDARY_COLOR }}>
            Medcity has been present in Europe since 1990, offering innovative solutions,
            specializing in medical services for treatment of medical infrastructure.
          </p>


          <div className="flex items-center gap-6">
            <button
              className="px-8 py-3 rounded-full text-white text-base font-semibold shadow-lg transition-all"
              style={{ backgroundColor: PRIMARY_COLOR }}
            >
              Find A Doctor →
            </button>

            <button
              className="px-8 py-3 rounded-full text-base font-semibold shadow-lg bg-white transition-all"
              style={{ color: SECONDARY_COLOR }}
            >
              Our Services →
            </button>
          </div>
        </div>
      </div>
    </section>

      <section className="max-w-[1200px] mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <p className="text-sm uppercase tracking-widest font-semibold mb-3" style={{ color: PRIMARY_COLOR }}>
            Helping Patients From Around The Globe!!
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4" style={{ color: SECONDARY_COLOR }}>
            Improving The Quality Of Your Life Through Better Health.
          </h2>

          <p className="text-gray-700 mb-6">
            Our goal is to deliver quality of care in a courteous, respectful, and compassionate manner.
            We will work with you to develop individualised care plans, including management of chronic diseases.
            We are committed to being the region's premier healthcare network providing patient-centered care
            that inspires clinical and service excellence.
          </p>

          <div className="flex items-center gap-4">
            <Link
              to="/doctors"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold shadow-md transition-all duration-200"
              style={{ backgroundColor: PRIMARY_COLOR, color: 'white' }}
            >
              Find A Doctor <IoIosArrowForward />
            </Link>

            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold border-2"
              style={{ borderColor: SECONDARY_COLOR, color: SECONDARY_COLOR }}
            >
              Our Services <FaLongArrowAltRight />
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <strong style={{ color: SECONDARY_COLOR }}>30</strong>
              </div>
              <div>
                <div className="text-sm font-semibold" style={{ color: SECONDARY_COLOR }}>Years Of Experience</div>
                <div className="text-xs text-gray-500">Trusted by thousands of patients</div>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-3 ml-6">
              <div className="text-sm">—</div>
              <div className="text-sm text-gray-600">Michael Brian<br /><span className="text-xs text-gray-400">Dermatologist</span></div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center lg:justify-end">
          <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-2xl">
            <img src={g2} alt="About video thumbnail" className="w-full h-64 object-cover filter blur-[0.6px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-md transition-transform transform hover:scale-105"
                onClick={() => alert('Play video (demo)')}
              >
                <RiPlayCircleLine className="text-3xl" style={{ color: PRIMARY_COLOR }} />
              </button>
            </div>
          </div>
        </div>
      </section>

    
      <section className="py-16" style={{ backgroundColor: 'rgba(33,205,192,0.03)' }}>
        <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-xl font-bold mb-3" style={{ color: SECONDARY_COLOR }}>Providing Care For The Sickest In Community.</h3>
            <p className="text-gray-600 mb-6">
              Medcity has been present in Europe since 1990, offering innovative solutions, specializing in medical services for treatment of medical infrastructure.
            </p>

            <div className="flex gap-4 items-center">
              <Link to="/appointment" className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-[#21CDC0] text-white font-semibold shadow">
                Make Appointment
              </Link>
              <Link to="/values" className="inline-flex items-center gap-2 px-5 py-3 rounded-full border" style={{ borderColor: SECONDARY_COLOR, color: SECONDARY_COLOR }}>
                Our Core Values
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start gap-4">
              <div className="text-3xl p-2 rounded-md" style={{ color: PRIMARY_COLOR }}><FaStethoscope /></div>
              <h4 className="font-semibold" style={{ color: SECONDARY_COLOR }}>Medical Advices & Check Ups</h4>
              <p className="text-xs text-gray-500">Regular check-ups and expert advice for long-term health.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start gap-4">
              <div className="text-3xl p-2 rounded-md" style={{ color: PRIMARY_COLOR }}><FaHeartbeat /></div>
              <h4 className="font-semibold" style={{ color: SECONDARY_COLOR }}>Trusted Medical Treatment</h4>
              <p className="text-xs text-gray-500">Modern treatments backed by years of experience.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start gap-4">
              <div className="text-3xl p-2 rounded-md" style={{ color: PRIMARY_COLOR }}><FaAmbulance /></div>
              <h4 className="font-semibold" style={{ color: SECONDARY_COLOR }}>Emergency Help Available 24/7</h4>
              <p className="text-xs text-gray-500">Immediate support when you need it most.</p>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 flex flex-col items-start gap-4">
              <div className="text-3xl p-2 rounded-md" style={{ color: PRIMARY_COLOR }}>⚕️</div>
              <h4 className="font-semibold" style={{ color: SECONDARY_COLOR }}>Medical Research Professionals</h4>
              <p className="text-xs text-gray-500">Research driven approach for better outcomes.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h4 className="text-xl font-bold mb-3" style={{ color: SECONDARY_COLOR }}>Want To Know More?</h4>
          <p className="text-gray-600 mb-6">Contact our team for details about our services, procedures and patient support.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#21CDC0] text-white font-semibold shadow">
            Contact Us
          </Link>
        </div>
      </section>
    </main>
  );
}
