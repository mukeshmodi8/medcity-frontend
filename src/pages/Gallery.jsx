import React, { useState, useEffect, useCallback } from "react";
import { FaEye, FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";

import g1 from "../assets/6.jpg";
import g2 from "../assets/1 (1).jpg";
import g3 from "../assets/1 (1).jpg";
import g4 from "../assets/1 (1).jpg";
import g5 from "../assets/1 (1).jpg";
import g6 from "../assets/1 (1).jpg";
import bannerBlur from "../assets/6.jpg";

const HEADING_COLOR = "#283B6A";
const ACCENT = "#21CDC0";
const API_BASE = "https://medcity-backend-t66f.onrender.com";

// fallback images
const defaultImages = [
  { src: g1, alt: "Gallery image 1" },
  { src: g2, alt: "Gallery image 2" },
  { src: g3, alt: "Gallery image 3" },
  { src: g4, alt: "Gallery image 4" },
  { src: g5, alt: "Gallery image 5" },
  { src: g6, alt: "Gallery image 6" },
];

export default function Gallery() {
  const [images, setImages] = useState(defaultImages);
  const [openIndex, setOpenIndex] = useState(null);

  // 🔹 yaha pe pehle localStorage se data lo, phir API se (refresh pe bhi rahega) ⭐
  useEffect(() => {
    // 1) localStorage se gallery lo (agar saved ho to)
    try {
      const stored = localStorage.getItem("galleryImages");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setImages(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to load gallery from localStorage:", e);
    }

    // 2) Backend se latest gallery laao
    async function load() {
      try {
        const res = await fetch(`${API_BASE}/gallery`);
        const data = await res.json();

        if (Array.isArray(data.images) && data.images.length > 0) {
          const mapped = data.images.map((img, idx) => ({
            src: img.src || defaultImages[idx % defaultImages.length].src,
            alt: img.alt || `Gallery image ${idx + 1}`,
          }));

          setImages(mapped);

          // ✅ Jo data backend se aaya, use localStorage me bhi save karo ⭐
          localStorage.setItem("galleryImages", JSON.stringify(mapped));
        }
      } catch (err) {
        console.error("Failed to load gallery from API:", err);
        // error pe default images hi rehne do
      }
    }

    load();
  }, []);

  const open = (i) => setOpenIndex(i);
  const close = () => setOpenIndex(null);

  const prev = (e) => {
    e && e.stopPropagation();
    setOpenIndex((s) => (s === 0 ? images.length - 1 : s - 1));
  };
  const next = (e) => {
    e && e.stopPropagation();
    setOpenIndex((s) => (s === images.length - 1 ? 0 : s + 1));
  };

  const onKey = useCallback(
    (e) => {
      if (openIndex === null) return;
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    },
    [openIndex, images.length]
  );

  useEffect(() => {
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onKey]);

  return (
    <div className="gallery-wrapper">
      {/* Top banner */}
      <div
        className="w-full h-36 md:h-40 lg:h-48 flex items-center justify-center"
        style={{
          backgroundImage: `url(${bannerBlur})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(0.6px)",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-white/60 px-6 py-2 rounded-md">
          <h1
            className="text-2xl md:text-3xl font-extrabold"
            style={{ color: HEADING_COLOR }}
          >
            Our Gallery
          </h1>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 py-12 text-center">
        <p
          className="text-sm uppercase tracking-widest font-semibold mb-3"
          style={{ color: ACCENT }}
        >
          The Best Medical And General Practice Care!
        </p>
        <h3
          className="text-3xl md:text-4xl font-extrabold"
          style={{ color: HEADING_COLOR }}
        >
          Providing Medical Care For The Sickest In Our Community.
        </h3>
      </div>

      {/* Grid */}
      <div className="max-w-[1100px] mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <figure
              key={i}
              className="relative rounded-lg overflow-hidden group shadow-lg"
              style={{ minHeight: 180 }}
            >
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-48 sm:h-52 md:h-56 object-cover transform transition-transform duration-500 group-hover:scale-105"
              />

              <div
                onClick={() => open(i)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") open(i);
                }}
                className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center shadow">
                  <FaEye className="text-[#283B6A]" />
                </div>
              </div>
            </figure>
          ))}
        </div>
      </div>

      {/* Modal / Lightbox */}
      {openIndex !== null && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center px-4"
          onClick={close}
        >
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

          <div
            className="relative z-10 max-w-[1100px] w-full mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              className="absolute top-4 right-4 z-20 p-3 rounded-full bg-white/90 hover:bg-white shadow"
              aria-label="Close"
            >
              <FaTimes className="text-lg" />
            </button>

            <button
              onClick={prev}
              className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow hover:bg-white"
              aria-label="Previous"
            >
              <FaChevronLeft />
            </button>

            <button
              onClick={next}
              className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 items-center justify-center w-12 h-12 rounded-full bg-white/90 shadow hover:bg-white"
              aria-label="Next"
            >
              <FaChevronRight />
            </button>

            <div className="bg-white rounded-lg overflow-hidden">
              <img
                src={images[openIndex].src}
                alt={images[openIndex].alt}
                className="w-full h-[60vh] object-contain bg-black/5"
              />
              <div className="p-4 flex items-center justify-between">
                <div>
                  <h4 className="font-semibold" style={{ color: HEADING_COLOR }}>
                    {images[openIndex].alt}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Image {openIndex + 1} of {images.length}
                  </p>
                </div>
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() =>
                      setOpenIndex((s) => (s === 0 ? images.length - 1 : s - 1))
                    }
                    className="px-4 py-2 rounded-full border hover:bg-gray-50"
                  >
                    Prev
                  </button>
                  <button
                    onClick={() =>
                      setOpenIndex((s) =>
                        s === images.length - 1 ? 0 : s + 1
                      )
                    }
                    className="px-4 py-2 rounded-full bg-[#21CDC0] text-white"
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
