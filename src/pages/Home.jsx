import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { RiHealthBookLine, RiPlayCircleLine, } from 'react-icons/ri';
// import React, { useState } from "react";
// import { useHomeContent } from "../context/HomeContentContext";


import {
  FaStethoscope,
  FaHeartbeat,
  FaAmbulance,
  FaLongArrowAltRight,
  FaCheckCircle,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaClock
} from 'react-icons/fa';
import { PiSyringe, PiStethoscope, PiFlask } from 'react-icons/pi';
import {
  MdOutlineMedicalServices,
  MdOutlinePeople,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineCalendarMonth,
  MdOutlineAccessTime
} from 'react-icons/md';

import ServiceImage1 from "../assets/1.jpg";
import ServiceImage2 from "../assets/AC.jpg";
import ServiceImage3 from "../assets/3 (1).jpg";
import AboutVideoImage from '../assets/3.jpg';
import HeroBackgroundImage from '../assets/4.jpg';
import HeroSlide2 from '../assets/5.jpg';
import DoctorImage1 from '../assets/doctor1.jpg';
import DoctorImage2 from '../assets/doctor2.jpg';
import DoctorImage3 from '../assets/doctor3.jpg';
import TestimonialThumb from '../assets/testimonials.jpg';

// 👉 context import
import { useHomeContent } from "../context/HomeContentContext";

// Small constants
const PRIMARY_COLOR = '#00bfa6';
const SECONDARY_COLOR = '#233d87';

// 🔹 DEFAULT DATA (fallback jab backend me kuch na ho)

const defaultHeroSlides = [
  {
    id: 1,
    image: HeroBackgroundImage,
    eyebrow: 'Caring For The Health And Well Being Of Family.',
    title: 'Quality Health Care For Family.',
    ctaText: 'More About Us',
    subText:
      'The health and well-being of our patients and their health care team will always be our priority, so we follow the best practices for cleanliness.',
  },
  {
    id: 2,
    image: HeroSlide2,
    eyebrow: 'Caring For The Health And Well Being Of Family.',
    title: 'Delivering Best Medical Care.',
    ctaText: 'Learn More',
    subText:
      'Our team focuses on delivering the best patient outcomes using advanced treatments and compassionate care.',
  },
];

const defaultServices = [
  {
    id: 'neurology',
    image: ServiceImage1,
    title: "Neurology Clinic",
    description:
      "Some neurologists receive subspeciality training focusing on a particular area of the fields...",
    link: "/services/neurology",
  },
  {
    id: 'cardiology',
    image: ServiceImage2,
    title: "Cardiology Clinic",
    description: "All cardiologists study the disorders of the heart...",
    link: "/services/cardiology",
  },
  {
    id: 'pathology',
    image: ServiceImage3,
    title: "Pathology Clinic",
    description: "Pathology is the study of disease...",
    link: "/services/pathology",
  },
];

const defaultDoctors = [
  {
    id: "kiano",
    image: DoctorImage1,
    name: "Kiano Barker",
    specialization: "Pathologist",
    description:
      "Barker help care for patients every day by providing their doctors with the information needed...",
    link: "/doctors/kiano-barker",
  },
  {
    id: "mike",
    image: DoctorImage2,
    name: "Mike Dooley",
    specialization: "Cardiology Specialist",
    description:
      "Muldoone obtained his undergraduate degree in Biomedical Engineering...",
    link: "/doctors/mike-dooley",
  },
  {
    id: "derma",
    image: DoctorImage3,
    name: "Dermatologists",
    specialization: "Dermatologist",
    description:
      "Brian specializes in treating skin, hair, nail, and mucous membrane...",
    link: "/doctors/dermatologists",
  },
];

const defaultBlogPosts = [
  {
    id: 1,
    title: 'How to improve heart health',
    excerpt: 'Simple steps and lifestyle changes to keep your heart healthy.',
    date: 'Oct 12, 2025',
    image: ServiceImage2,
    link: '/blog/heart-health'
  },
  {
    id: 2,
    title: 'Understanding pathology reports',
    excerpt: 'A patient-friendly guide to read your lab reports and results.',
    date: 'Sep 30, 2025',
    image: ServiceImage3,
    link: '/blog/pathology-report'
  },
  {
    id: 3,
    title: 'Neurology: When to see a specialist',
    excerpt: 'Signs and symptoms which may require a neurologist visit.',
    date: 'Aug 20, 2025',
    image: ServiceImage1,
    link: '/blog/neurology-guide'
  }
];

const defaultTestimonials = [
  {
    id: 1,
    quote:
      "Their doctors include highly qualified practitioners who come from a range of backgrounds and bring with them a diversity of skills and special interests. They also have registered nurses on staff who are available to triage any urgent matters, and the administration and support staff all have exceptional people skills.",
    author: "Sami Wade",
    designation: "7oroof Inc",
    thumb: TestimonialThumb,
  },
  {
    id: 2,
    quote:
      "Our team is committed to providing outstanding patient care and treatment, and we pride ourselves on having highly qualified practitioners available for any medical enquiry.",
    author: "Ahmed",
    designation: "Web Inc",
    thumb: TestimonialThumb,
  },
  {
    id: 3,
    quote:
      "We are dedicated to delivering quality care in a courteous, respectful, and compassionate manner. Choosing Medcity is the first and best choice for healthcare.",
    author: "Sonia Blake",
    designation: "Web Inc",
    thumb: TestimonialThumb,
  },
];


// =================== HERO SLIDER ===================
function HeroSlider({
  slides,
  autoplay = true,
  interval = 4500
}) {
  const [current, setCurrent] = useState(0);
  const length = slides.length;
  const timerRef = useRef(null);

  useEffect(() => {
    if (!autoplay || length === 0) return;
    timerRef.current = setInterval(() => {
      setCurrent((s) => (s + 1) % length);
    }, interval);
    return () => clearInterval(timerRef.current);
  }, [autoplay, interval, length]);

  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setCurrent((s) => (s + 1) % length);
      }, interval);
    }
  };

  const goPrev = () => {
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1));
    resetTimer();
  };

  const goNext = () => {
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1));
    resetTimer();
  };

  return (
    <section className="relative overflow-hidden">
      <div className="w-full h-[62vh] md:h-[68vh] lg:h-[75vh] relative">
        {slides.map((slide, idx) => (
          <div
            key={slide.id || idx}
            className={`absolute inset-0 transition-opacity duration-700 ${idx === current ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'}`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
            }}
          >
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(90deg, rgba(255,255,255,0.45), rgba(255,255,255,0.38))',
              }}
            />

            <div className="max-w-[1200px] mx-auto px-6 md:px-8 h-full relative z-20 flex items-center" style={{ minHeight: '62vh' }}>
              <div className="w-full lg:w-3/5">
                <p
                  className="text-sm uppercase tracking-widest font-semibold mb-2"
                  style={{ color: PRIMARY_COLOR }}
                >
                  {slide.eyebrow}
                </p>

                <h1
                  className="font-extrabold mb-4"
                  style={{
                    color: SECONDARY_COLOR,
                    fontSize: 'clamp(1.6rem, 6vw, 3.6rem)',
                    lineHeight: 1.02,
                  }}
                >
                  {slide.title}
                </h1>

                <p
                  className="text-gray-700 mb-6 max-w-lg"
                  style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1rem)' }}
                >
                  {slide.subText}
                </p>

                <div className="flex flex-row items-center gap-4 mt-4">
                  <Link
                    to="/about-us"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full font-semibold shadow-md"
                    style={{
                      backgroundColor: PRIMARY_COLOR,
                      color: '#fff',
                    }}
                  >
                    {slide.ctaText} <IoIosArrowForward />
                  </Link>

                  <button
                    onClick={() => alert('Video modal demo')}
                    className="flex items-center gap-3 px-3 py-2 text-sm font-medium"
                    style={{ color: SECONDARY_COLOR }}
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                      style={{ borderColor: PRIMARY_COLOR }}
                    >
                      <RiPlayCircleLine
                        className="text-2xl"
                        style={{ color: PRIMARY_COLOR }}
                      />
                    </div>
                    Watch Our Video!
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* arrows */}
        <button
          onClick={goPrev}
          aria-label="Previous slide"
          className="hidden lg:flex absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full border border-gray-200 bg-white/80 hover:bg-white shadow-md transition"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#283B6A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
        <button
          onClick={goNext}
          aria-label="Next slide"
          className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 items-center justify-center rounded-full border border-gray-200 bg-white/80 hover:bg-white shadow-md transition"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#283B6A"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      <div className="h-8 md:h-14 lg:h-20"></div>
    </section>
  );
}

// small components
function ServiceCard({ image, title, description, link }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="h-44 overflow-hidden">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <h4
          className="font-bold text-lg mb-2"
          style={{ color: SECONDARY_COLOR }}
        >
          {title}
        </h4>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <Link
          to={link}
          className="text-sm font-semibold inline-flex items-center"
          style={{ color: PRIMARY_COLOR }}
        >
          Learn more <IoIosArrowForward className="ml-2" />
        </Link>
      </div>
    </div>
  );
}

function FeatureIconCard({ icon, title }) {
  return (
    <div className="flex items-center gap-4 bg-white rounded-xl p-4 shadow-md">
      <div className="text-3xl" style={{ color: PRIMARY_COLOR }}>
        {icon}
      </div>
      <div>
        <h5 className="font-bold" style={{ color: SECONDARY_COLOR }}>
          {title}
        </h5>
      </div>
    </div>
  );
}

function DoctorCard({
  image,
  name,
  specialization,
  description,
  link,
  showSocials = false,
}) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <div className="h-56 overflow-hidden">
        <img src={image} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <h4
          className="font-bold text-lg"
          style={{ color: SECONDARY_COLOR }}
        >
          {name}
        </h4>
        <p
          className="text-sm text-primary font-medium mb-2"
          style={{ color: PRIMARY_COLOR }}
        >
          {specialization}
        </p>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <Link
          to={link}
          className="text-sm font-semibold inline-flex items-center"
          style={{ color: PRIMARY_COLOR }}
        >
          View Profile <IoIosArrowForward className="ml-2" />
        </Link>
      </div>
    </div>
  );
}

function BlogPostItem({ post }) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      {post.image && (
        <div className="h-44 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="p-5">
        <h4
          className="font-bold mb-2"
          style={{ color: SECONDARY_COLOR }}
        >
          {post.title}
        </h4>
        <p className="text-sm text-gray-600 mb-4">{post.excerpt}</p>
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>{post.date}</span>
          <Link
            to={post.link || "#"}
            className="underline text-sm"
            style={{ color: PRIMARY_COLOR }}
          >
            Read
          </Link>
        </div>
      </div>
    </article>
  );
}


// =================== MAIN HOME COMPONENT ===================
export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // 🔹 yahan se backend content aayega
  const { homeContent, loadingHome, errorHome } = useHomeContent();


  const content = homeContent;


  // loading state
  if (loadingHome) {
    return (
      <main className="home-page flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="relative flex items-center justify-center">
            <div
              className="w-16 h-16 rounded-full animate-spin"
              style={{
                border: "5px solid rgba(0,191,166,0.2)",
                borderTop: "5px solid #00bfa6",
              }}
            />
            <div className="absolute text-[10px] font-semibold text-[#00bfa6]">
              Loading
            </div>
          </div>

          <p className="text-gray-400 text-sm">Please wait…</p>
        </div>
      </main>
    );
  }


  // backend se data ya fallback
  const heroSlides = content?.hero
    ? [{
      id: 1,
      image: HeroBackgroundImage,
      eyebrow: content.hero.eyebrow,
      title: content.hero.title,
      subText: content.hero.subtitle,
      ctaText: content.hero.ctaText
    }]
    : defaultHeroSlides;


  const services =
    content?.services && content.services.length
      ? content.services
      : defaultServices;

  const doctors =
    content?.doctors && content.doctors.length
      ? content.doctors
      : defaultDoctors;

  const testimonialsData =
    content?.testimonials && content.testimonials.length
      ? content.testimonials
      : defaultTestimonials;

  const blogPostsData =
    content?.blogPosts && content.blogPosts.length
      ? content.blogPosts
      : defaultBlogPosts;

  const handleNext = () => {
    setCurrentSlide((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrev = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    console.log('Appointment form data:', Object.fromEntries(data.entries()));
    alert('Appointment request submitted (demo). Check console for data.');
    form.reset();
  };

  return (
    <main className="home-page">
      {/* Hero */}
      <HeroSlider slides={heroSlides} />

      {/* Features / CTA */}
      <section className="features-cta -mt-7 relative z-20">
        <div className="max-w-[900px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div
              className="p-6 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-lg text-center h-full flex flex-col items-center"
            >
              <div
                className="text-4xl p-3 inline-block rounded-full mb-4"
                style={{
                  color: PRIMARY_COLOR,
                  border: `2px solid ${PRIMARY_COLOR}`,
                }}
              >
                <FaStethoscope />
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: SECONDARY_COLOR }}
              >
                Medical Advices & Check Ups
              </h3>
            </div>
            <div
              className="p-6 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-lg text-center h-full flex flex-col items-center"
            >
              <div
                className="text-4xl p-3 inline-block rounded-full mb-4"
                style={{
                  color: PRIMARY_COLOR,
                  border: `2px solid ${PRIMARY_COLOR}`,
                }}
              >
                <FaHeartbeat />
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: SECONDARY_COLOR }}
              >
                Trusted Medical Treatment
              </h3>
            </div>
            <div
              className="p-6 bg-white shadow-xl hover:shadow-2xl transition-all duration-300 rounded-lg text-center h-full flex flex-col items-center"
            >
              <div
                className="text-4xl p-3 inline-block rounded-full mb-4"
                style={{
                  color: PRIMARY_COLOR,
                  border: `2px solid ${PRIMARY_COLOR}`,
                }}
              >
                <FaAmbulance />
              </div>
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: SECONDARY_COLOR }}
              >
                Emergency Help 24/7
              </h3>
            </div>
            <div
              className="p-6 rounded-lg text-white shadow-xl flex flex-col justify-center transition-all duration-300"
              style={{
                backgroundColor: PRIMARY_COLOR,
                borderColor: SECONDARY_COLOR,
              }}
            >
              <h3 className="text-xl font-bold mb-2">Doctors Timetable</h3>
              <p className="text-sm mb-4">
                Qualified doctors available six days a week, view timetable to
                make an appointment.
              </p>
              <Link
                to="/appointment"
                className="inline-flex items-center text-sm font-bold underline hover:text-secondary transition-colors"
                style={{ color: SECONDARY_COLOR }}
              >
                View Schedule <IoIosArrowForward className="ml-1 text-base" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* About section – same as before */}
      {/* ... (About, Commitment, Contact, etc. same as your existing code) ... */}

      {/* Services */}
      <section
        className="services-section py-20 relative overflow-hidden"
        style={{ backgroundColor: "#f9fbfd" }}
      >
        <div className="max-w-[1200px] mx-auto px-4 md:px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            <div className="lg:pr-12">
              <p
                className="text-sm uppercase tracking-widest font-semibold mb-2"
                style={{ color: PRIMARY_COLOR }}
              >
                The Best Medical And General Practice Care!
              </p>
              <h2
                className="text-4xl md:text-5xl font-extrabold leading-tight"
                style={{ color: SECONDARY_COLOR }}
              >
                Providing Care For The Sickest In Community.
              </h2>
            </div>
            <div className="flex flex-col justify-between pt-2">
              <p className="text-gray-700 text-base mb-6">
                Medcity has been present in Europe since 1990, offering
                innovative solutions, specializing in medical services for
                treatment of medical infrastructure.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/appointment"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-white font-semibold shadow-md transition-all duration-300 hover:opacity-90"
                  style={{ backgroundColor: PRIMARY_COLOR }}
                >
                  Make Appointment <FaLongArrowAltRight className="text-lg" />
                </Link>
                <Link
                  to="/values"
                  className="inline-flex items-center gap-2 px-8 py-3 rounded-full text-secondary font-semibold border-2 border-secondary transition-all duration-300 hover:bg-secondary hover:text-white"
                  style={{
                    borderColor: SECONDARY_COLOR,
                    color: SECONDARY_COLOR,
                  }}
                >
                  <RiHealthBookLine className="text-lg" /> Our Core Values
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <ServiceCard
                key={s.id || i}
                image={s.image || s.imageUrl || ServiceImage1}
                title={s.title}
                description={s.description}
                link={s.link}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
   <section className="doctors-section py-20 bg-gray-100">
  <div className="max-w-[1200px] mx-auto px-4 md:px-6">
    <div className="text-center mb-12">
      <h2
        className="text-4xl md:text-5xl font-extrabold leading-tight mb-4"
        style={{ color: SECONDARY_COLOR }}
      >
        Meet Our Doctors
      </h2>
      <p className="text-gray-600 text-base max-w-2xl mx-auto">
        Our administration and support staff all have exceptional people
        skills and trained to assist you with all medical enquiries.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {doctors.map((d, i) => (
        <DoctorCard
          key={d.id || i}
          image={d.image || d.imageUrl || DoctorImage1}
          name={d.name}
          specialization={d.specialization}
          description={d.description}
          link={d.link}
        />
      ))}
    </div>
  </div>
</section>


      {/* Testimonials */}
      <section
        className="testimonials-layout3 py-24 md:py-32 relative overflow-hidden"
        style={{ backgroundColor: SECONDARY_COLOR }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url(${HeroBackgroundImage})` }}
        />
        <div className="max-w-[1200px] mx-auto px-4 relative z-10">
          <div className="flex flex-wrap">
            <div className="w-full lg:w-5/12 mb-8 lg:mb-0">
              <div className="heading-layout2 lg:pr-12">
                <h3
                  className="heading__title text-3xl md:text-4xl font-extrabold"
                  style={{ color: PRIMARY_COLOR }}
                >
                  Inspiring Stories!
                </h3>
              </div>
            </div>

            <div className="w-full lg:w-7/12">
              <div className="slider-with-navs">
                <div className="testimonial-item">
                  <h3 className="testimonial__title text-xl md:text-2xl font-semibold leading-relaxed text-white">
                    {testimonialsData[currentSlide].quote}
                  </h3>
                  <p className="text-sm text-gray-200 mt-4">
                    — {testimonialsData[currentSlide].author},{" "}
                    {testimonialsData[currentSlide].designation}
                  </p>
                </div>

                <div className="slider-nav mt-10 flex space-x-4 mb-12">
                  {testimonialsData.map((t, index) => (
                    <button
                      key={t.id || index}
                      type="button"
                      onClick={() => setCurrentSlide(index)}
                      className={`testimonial__meta flex items-center p-2 rounded-full cursor-pointer transition-opacity duration-300 ${index === currentSlide
                        ? "opacity-100 ring-2 ring-white"
                        : "opacity-50 hover:opacity-80"
                        }`}
                    >
                      <div className="testimonial__thmb w-10 h-10 rounded-full overflow-hidden mr-3">
                        <img
                          src={t.thumb || t.imageUrl || TestimonialThumb}
                          alt={t.author}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="testimonial__meta-title text-base font-semibold text-white">
                          {t.author}
                        </h4>
                        <p className="testimonial__meta-desc text-xs text-gray-400">
                          {t.designation}
                        </p>
                      </div>
                    </button>
                  ))}
                  <div className="flex items-center ml-4 gap-2">
                    <button
                      onClick={handlePrev}
                      className="px-3 py-2 bg-white rounded-full"
                    >
                      Prev
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-3 py-2 bg-white rounded-full"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact / Appointment – same as your current code */}
      {/* (yahan koi backend nahi lagaya abhi, form console pe print hi kar raha hai) */}

      <section
        className="blog-grid py-20 md:py-32 pt-0"
        style={{ backgroundColor: "white" }}
      >
        <div className="max-w-[1200px] mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-base uppercase tracking-widest font-medium"
              style={{ color: PRIMARY_COLOR }}
            >
              Resource Library
            </h2>
            <h3
              className="text-4xl font-extrabold"
              style={{ color: SECONDARY_COLOR }}
            >
              Recent Articles
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPostsData.map((post) => (
              <BlogPostItem key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
