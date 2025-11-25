import React, { useEffect, useState } from "react";
import {
  FaSlidersH,
  FaInfoCircle,
  FaHospital,
  FaUserMd,
  FaStar,
  FaBlog,
  FaPhoneAlt,
  FaCheckCircle,
} from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

const PRIMARY_COLOR = "#00bfa6";
const SECONDARY_COLOR = "#233d87";

const homeSections = [
  { id: "hero", name: "Hero Slider", icon: <FaSlidersH /> },
  { id: "features", name: "Features / CTA", icon: <FaCheckCircle /> },
  { id: "about", name: "About Intro", icon: <FaInfoCircle /> },
  { id: "services", name: "Services", icon: <FaHospital /> },
  { id: "commitment", name: "Commitment Section", icon: <FaCheckCircle /> },
  { id: "doctors", name: "Our Doctors", icon: <FaUserMd /> },
  { id: "testimonials", name: "Testimonials", icon: <FaStar /> },
  { id: "contact", name: "Contact / Appointment", icon: <FaPhoneAlt /> },
  { id: "blog", name: "Blog / Articles", icon: <FaBlog /> },
];

export default function AdminHomeEditor() {
  const [activeSectionId, setActiveSectionId] = useState(homeSections[0].id);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  const [heroFile, setHeroFile] = useState(null);
  const [heroPreview, setHeroPreview] = useState(null);

  // Dummy content loader for demo purposes (since backend might not exist)
  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        // ✅ sahi API: /api/pages/home
        const API_BASE = "https://medcity-backend-t66f.onrender.com";
        const res = await fetch(`${API_BASE}/api/pages/home`);

        if (!res.ok) {
          throw new Error(`Request failed: ${res.status}`);
        }

        const data = await res.json();

        if (!mounted) return;

        setContent(data);
        setHeroPreview(data?.hero?.image || null);
      } catch (err) {
        console.error("Failed load page:", err);
        setError(err.message || "Network error");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => { mounted = false; };
  }, []);


  const updateContent = (path, value) => {
    setContent(prev => {
      const next = prev ? JSON.parse(JSON.stringify(prev)) : {};
      const parts = path.replace(/\]/g, "").split(/\.|\[/);
      let cur = next;
      for (let i = 0; i < parts.length - 1; i++) {
        const p = parts[i];
        if (cur[p] === undefined) cur[p] = {};
        cur = cur[p];
      }
      cur[parts[parts.length - 1]] = value;
      return next;
    });
  };

  const handleHeroFile = (file) => {
    setHeroFile(file || null);
    if (!file) {
      setHeroPreview(content?.hero?.image || null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => setHeroPreview(e.target.result);
    reader.readAsDataURL(file);
  };

  const addArrayItem = (key, template = "") => {
    setContent(prev => {
      const next = JSON.parse(JSON.stringify(prev || {}));
      if (!Array.isArray(next[key])) next[key] = [];
      next[key].push(template);
      return next;
    });
  };
  const removeArrayItem = (key, idx) => {
    setContent(prev => {
      const next = JSON.parse(JSON.stringify(prev || {}));
      if (!Array.isArray(next[key])) return next;
      next[key].splice(idx, 1);
      return next;
    });
  };

  async function handleSave() {
    try {
      setSaving(true);

      const res = await fetch(`${API_BASE}/api/pages/home`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(content),
      });


      const data = await res.json();

      alert("✅ Saved to Database!");

    } catch (err) {
      console.error(err);
      alert("❌ Save Failed");
    } finally {
      setSaving(false);
    }
  }


  const renderHeroEditor = () => {
    const hero = content?.hero || { title: "", subtitle: "", ctaText: "Learn more", image: "" };
    return (
      <div className="space-y-4 animate-fadeIn">
        <label className="block">
          <div className="text-sm font-semibold text-gray-700 mb-1">Title</div>
          <input
            value={hero.title || ""}
            onChange={(e) => updateContent("hero.title", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none transition"
            placeholder="Hero main heading"
          />
        </label>

        <label className="block">
          <div className="text-sm font-semibold text-gray-700 mb-1">Subtitle</div>
          <input
            value={hero.subtitle || ""}
            onChange={(e) => updateContent("hero.subtitle", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none transition"
            placeholder="Small subtitle under heading"
          />
        </label>

        <label className="block">
          <div className="text-sm font-semibold text-gray-700 mb-1">CTA Text</div>
          <input
            value={hero.ctaText || ""}
            onChange={(e) => updateContent("hero.ctaText", e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500 outline-none transition"
            placeholder="Button text"
          />
        </label>

        <div>
          <div className="text-sm font-semibold text-gray-700 mb-2">Hero Image</div>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition bg-gray-50">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleHeroFile(e.target.files[0] || null)}
              className="hidden"
              id="hero-upload"
            />
            <label htmlFor="hero-upload" className="cursor-pointer">
              {heroPreview ? (
                <img src={heroPreview} alt="hero preview" className="max-h-48 mx-auto rounded shadow-md" />
              ) : (
                <div className="text-gray-500">
                  <p>Click to upload image</p>
                  <span className="text-xs">PNG, JPG up to 5MB</span>
                </div>
              )}
            </label>
          </div>
        </div>
      </div>
    );
  };

  const renderFeaturesEditor = () => {
    const features = content?.features || [];
    return (
      <div>
        <div className="flex gap-2 items-center mb-4">
          <h4 className="font-semibold text-gray-700">Features List</h4>
          <button
            onClick={() => addArrayItem("features", { title: "New feature" })}
            className="ml-auto px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-bold hover:bg-teal-100 transition"
          >
            + Add Feature
          </button>
        </div>
        {features.length === 0 && <div className="text-gray-500 text-sm italic">No features added yet.</div>}
        <div className="space-y-3">
          {features.map((f, i) => (
            <div key={i} className="p-3 border border-gray-200 rounded-lg flex gap-3 items-center bg-white shadow-sm">
              <span className="text-gray-400 font-bold">{i + 1}.</span>
              <input
                value={typeof f === "string" ? f : f.title || ""}
                onChange={(e) => {
                  const val = e.target.value;
                  setContent(prev => {
                    const next = JSON.parse(JSON.stringify(prev || {}));
                    if (!Array.isArray(next.features)) next.features = [];
                    next.features[i] = typeof f === "string" ? val : { ...(next.features[i] || {}), title: val };
                    return next;
                  });
                }}
                className="flex-1 border-none outline-none bg-transparent font-medium text-gray-700 placeholder-gray-300"
                placeholder="Feature Title"
              />
              <button onClick={() => removeArrayItem("features", i)} className="text-red-400 hover:text-red-600 p-1">
                <FaInfoCircle className="rotate-45" /> {/* Using as delete icon */}
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderAboutEditor = () => {
    // about object ke andar 4 sections rakhenge
    const about = content?.about || {};
    const hero = about.hero_banner || {};
    const intro = about.about_intro || {};
    const features = about.features_cta || {};
    const contact = about.contact_cta || {};

    return (
      <div className="space-y-8">
        {/* 1️⃣ HERO / BANNER SECTION */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Hero Banner Section
          </h3>

          <label className="block mb-3">
            <div className="text-xs font-medium text-gray-600 mb-1">
              Main Heading (H1)
            </div>
            <input
              type="text"
              value={hero.heading || ""}
              onChange={(e) =>
                updateContent("about.hero_banner.heading", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Caring For The Health & Well Being Of Family."
            />
          </label>

          <label className="block mb-3">
            <div className="text-xs font-medium text-gray-600 mb-1">
              Short Subtext / Paragraph
            </div>
            <textarea
              rows={3}
              value={hero.text || ""}
              onChange={(e) =>
                updateContent("about.hero_banner.text", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Medcity has been present in Europe since 1990..."
            />
          </label>

          <label className="block">
            <div className="text-xs font-medium text-gray-600 mb-1">
              Background Image URL / Path
            </div>
            <input
              type="text"
              value={hero.bgImage || ""}
              onChange={(e) =>
                updateContent("about.hero_banner.bgImage", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="/assets/10.jpg"
            />
          </label>
        </div>

        {/* 2️⃣ ABOUT INTRO + EXPERIENCE */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            About Intro & Experience
          </h3>

          <label className="block mb-3">
            <div className="text-xs font-medium text-gray-600 mb-1">
              Intro Heading
            </div>
            <input
              type="text"
              value={intro.heading || ""}
              onChange={(e) =>
                updateContent("about.about_intro.heading", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Improving The Quality Of Your Life Through Better Health."
            />
          </label>

          <label className="block mb-3">
            <div className="text-xs font-medium text-gray-600 mb-1">
              Intro Paragraph
            </div>
            <textarea
              rows={4}
              value={intro.text || ""}
              onChange={(e) =>
                updateContent("about.about_intro.text", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Our goal is to deliver quality of care..."
            />
          </label>

          <label className="block mb-1">
            <div className="text-xs font-medium text-gray-600 mb-1">
              Years Of Experience (Number)
            </div>
            <input
              type="number"
              value={intro.experienceYears ?? ""}
              onChange={(e) =>
                updateContent(
                  "about.about_intro.experienceYears",
                  Number(e.target.value) || 0
                )
              }
              className="w-32 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="30"
            />
          </label>
        </div>

        {/* 3️⃣ FEATURES / CTA SECTION */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Features / Middle CTA
          </h3>

          <label className="block mb-3">
            <div className="text-xs font-medium text-gray-600 mb-1">
              Section Heading
            </div>
            <input
              type="text"
              value={features.heading || ""}
              onChange={(e) =>
                updateContent("about.features_cta.heading", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Providing Care For The Sickest In Community."
            />
          </label>

          <label className="block">
            <div className="text-xs font-medium text-gray-600 mb-1">
              Section Text
            </div>
            <textarea
              rows={3}
              value={features.text || ""}
              onChange={(e) =>
                updateContent("about.features_cta.text", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Medcity has been present in Europe since 1990..."
            />
          </label>
        </div>

        {/* 4️⃣ FINAL CONTACT CTA SECTION */}
        <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-4">
            Final Contact CTA
          </h3>

          <label className="block mb-3">
            <div className="text-xs font-medium text-gray-600 mb-1">
              CTA Heading
            </div>
            <input
              type="text"
              value={contact.heading || ""}
              onChange={(e) =>
                updateContent("about.contact_cta.heading", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Want To Know More?"
            />
          </label>

          <label className="block">
            <div className="text-xs font-medium text-gray-600 mb-1">
              CTA Description
            </div>
            <textarea
              rows={3}
              value={contact.text || ""}
              onChange={(e) =>
                updateContent("about.contact_cta.text", e.target.value)
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-teal-500 outline-none"
              placeholder="Contact our team for details about our services..."
            />
          </label>
        </div>
      </div>
    );
  };


  const renderServicesEditor = () => {
    // backend structure: services = { dental: [...], cosmetic: [...] }
    const services = content?.services || {};
    const dentalServices = Array.isArray(services.dental) ? services.dental : [];
    const cosmeticServices = Array.isArray(services.cosmetic) ? services.cosmetic : [];

    // ek item update karo (group = 'dental' | 'cosmetic')
    const updateServiceItem = (group, idx, field, value) => {
      setContent(prev => {
        const next = { ...(prev || {}) };
        if (!next.services) next.services = { dental: [], cosmetic: [] };

        const arr = Array.isArray(next.services[group])
          ? [...next.services[group]]
          : [];

        arr[idx] = { ...(arr[idx] || {}), [field]: value };
        next.services[group] = arr;
        return next;
      });
    };

    // naya service add karo
    const addServiceItem = (group) => {
      setContent(prev => {
        const next = { ...(prev || {}) };
        if (!next.services) next.services = { dental: [], cosmetic: [] };

        const arr = Array.isArray(next.services[group])
          ? [...next.services[group]]
          : [];

        arr.push({
          title: "New Service",
          path: "/services",     // yahi route header me use hoga
        });

        next.services[group] = arr;
        return next;
      });
    };

    // ek service delete karo
    const removeServiceItem = (group, idx) => {
      setContent(prev => {
        const next = { ...(prev || {}) };
        if (!next.services || !Array.isArray(next.services[group])) return next;

        const arr = [...next.services[group]];
        arr.splice(idx, 1);
        next.services[group] = arr;
        return next;
      });
    };

    return (
      <div className="space-y-8">
        {/* Dental Services */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h4 className="font-semibold text-gray-700">
              Dental Services
            </h4>
            <button
              type="button"
              onClick={() => addServiceItem("dental")}
              className="ml-auto px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-bold hover:bg-teal-100 transition"
            >
              + Add Dental Service
            </button>
          </div>

          {dentalServices.length === 0 && (
            <div className="text-gray-500 text-sm italic">
              No dental services added yet.
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {dentalServices.map((svc, i) => (
              <div
                key={i}
                className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm relative group hover:shadow-md transition"
              >
                <button
                  type="button"
                  onClick={() => removeServiceItem("dental", i)}
                  className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                >
                  Remove
                </button>

                <div className="mb-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">
                    Title
                  </label>
                  <input
                    value={svc.title || ""}
                    onChange={(e) =>
                      updateServiceItem("dental", i, "title", e.target.value)
                    }
                    className="w-full border-b border-gray-200 py-1 font-semibold text-gray-800 focus:border-teal-500 outline-none"
                    placeholder="e.g. NRI Dental Treatment"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">
                    Route / Path
                  </label>
                  <input
                    value={svc.path || ""}
                    onChange={(e) =>
                      updateServiceItem("dental", i, "path", e.target.value)
                    }
                    className="w-full mt-1 text-sm text-gray-600 outline-none bg-gray-50 rounded px-2 py-1.5 border border-gray-200 focus:border-teal-500"
                    placeholder="/services/dental/nri"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cosmetic Services */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <h4 className="font-semibold text-gray-700">
              Cosmetic Services
            </h4>
            <button
              type="button"
              onClick={() => addServiceItem("cosmetic")}
              className="ml-auto px-4 py-1.5 rounded-full bg-teal-50 text-teal-700 text-sm font-bold hover:bg-teal-100 transition"
            >
              + Add Cosmetic Service
            </button>
          </div>

          {cosmeticServices.length === 0 && (
            <div className="text-gray-500 text-sm italic">
              No cosmetic services added yet.
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2">
            {cosmeticServices.map((svc, i) => (
              <div
                key={i}
                className="p-4 border border-gray-200 rounded-xl bg-white shadow-sm relative group hover:shadow-md transition"
              >
                <button
                  type="button"
                  onClick={() => removeServiceItem("cosmetic", i)}
                  className="absolute top-2 right-2 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"
                >
                  Remove
                </button>

                <div className="mb-2">
                  <label className="text-xs font-bold text-gray-400 uppercase">
                    Title
                  </label>
                  <input
                    value={svc.title || ""}
                    onChange={(e) =>
                      updateServiceItem("cosmetic", i, "title", e.target.value)
                    }
                    className="w-full border-b border-gray-200 py-1 font-semibold text-gray-800 focus:border-teal-500 outline-none"
                    placeholder="e.g. Laser Hair Removal"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">
                    Route / Path
                  </label>
                  <input
                    value={svc.path || ""}
                    onChange={(e) =>
                      updateServiceItem("cosmetic", i, "path", e.target.value)
                    }
                    className="w-full mt-1 text-sm text-gray-600 outline-none bg-gray-50 rounded px-2 py-1.5 border border-gray-200 focus:border-teal-500"
                    placeholder="/services/cosmetic/laser-hair"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderSectionEditor = (sectionId) => {
    if (!content) return <div className="text-gray-500">Loading content...</div>;
    switch (sectionId) {
      case "hero": return renderHeroEditor();
      case "features": return renderFeaturesEditor();
      case "about": return renderAboutEditor();
      case "services": return renderServicesEditor();
      default: return renderDefaultPreview(sectionId);
    }
  };

  return (
    // Added padding top to clear fixed header on mobile
    <div className="p-4 md:p-8 min-h-screen w-full pt-20 lg:pt-8" style={{ backgroundColor: "#f8fafc" }}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold flex items-center gap-3" style={{ color: SECONDARY_COLOR }}>
            <span className="p-2 rounded-lg bg-blue-100 text-blue-700 text-xl"><FaSlidersH /></span>
            Home Editor
          </h1>
          <p className="text-gray-500 mt-1 text-sm">Manage your website's homepage content efficiently.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden md:block mr-2">
            <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">Last Saved</div>
            <div className="text-sm font-semibold text-gray-700">Just now</div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="px-6 py-2.5 rounded-xl text-white font-bold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center gap-2"
            style={{ backgroundColor: PRIMARY_COLOR, opacity: saving ? 0.7 : 1 }}
          >
            {saving ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div> : <FaCheckCircle />}
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div className="mb-6 lg:hidden relative z-20">
        <button
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          className="w-full bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between font-bold shadow-sm text-gray-700"
        >
          <span className="flex items-center gap-3">
            <span style={{ color: PRIMARY_COLOR }}>{homeSections.find(s => s.id === activeSectionId)?.icon}</span>
            {homeSections.find(s => s.id === activeSectionId)?.name}
          </span>
          <IoIosArrowDown className={`text-xl transition-transform ${isDropdownOpen ? "rotate-180" : "rotate-0"}`} />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-100 rounded-xl shadow-xl max-h-80 overflow-y-auto py-2">
            {homeSections.map(s => (
              <button
                key={s.id}
                onClick={() => { setActiveSectionId(s.id); setIsDropdownOpen(false); }}
                className={`w-full text-left p-3 px-5 flex items-center gap-3 transition-colors ${s.id === activeSectionId ? "bg-teal-50 text-teal-700 font-bold" : "hover:bg-gray-50 text-gray-600"}`}
              >
                <span className={s.id === activeSectionId ? "text-teal-600" : "text-gray-400"}>{s.icon}</span>
                {s.name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Desktop Sidebar Navigation */}
        <nav className="hidden lg:block w-64 shrink-0 sticky top-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden py-3">
            <div className="px-4 py-2 mb-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Sections</div>
            {homeSections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSectionId(s.id)}
                className={`w-full text-left px-5 py-3 flex items-center gap-3 transition-all border-l-4 ${s.id === activeSectionId
                  ? "border-teal-500 bg-teal-50 text-teal-800 font-bold"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <span className={s.id === activeSectionId ? "text-teal-500" : "text-gray-400"}>{s.icon}</span>
                {s.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Editor Area */}
        <div className="flex-1 w-full bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[500px]">
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              {homeSections.find(s => s.id === activeSectionId)?.name}
              <span className="text-xs font-normal text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Editing</span>
            </h2>
          </div>

          {loading && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-400">
              <div className="w-8 h-8 border-4 border-teal-200 border-t-teal-500 rounded-full animate-spin mb-3"></div>
              Loading content...
            </div>
          )}

          {error && (
            <div className="bg-red-50 text-red-600 p-4 rounded-xl border border-red-100 flex items-center gap-3">
              <FaInfoCircle />
              {error}
            </div>
          )}

          {!loading && !error && (
            <div className="animate-fadeIn">
              {renderSectionEditor(activeSectionId)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}