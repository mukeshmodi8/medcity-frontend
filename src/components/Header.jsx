import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaClock,
    FaSearch,
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaTimes,
} from "react-icons/fa";
import { HiMenu } from "react-icons/hi";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { BsCalendar2Check } from "react-icons/bs";

const PRIMARY_COLOR = "#00bfa6";
const SECONDARY_COLOR = "#283B6A";
const API_BASE = "https://medcity-backend-t66f.onrender.com";

export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [miniEmergencyOpen, setMiniEmergencyOpen] = useState(false);
    const [miniDepartmentsOpen, setMiniDepartmentsOpen] = useState(false);
    const [mobileSubMenu, setMobileSubMenu] = useState(null);

    // ✅ backend se data
    const [menuDoctors, setMenuDoctors] = useState([]);
    const [dentalMenu, setDentalMenu] = useState([]);
    const [cosmeticMenu, setCosmeticMenu] = useState([]);

    const wrapperRef = useRef(null);



    // Outside click
    useEffect(() => {
        function handleClickOutside(e) {
            if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
                setActiveDropdown(null);
                setMiniEmergencyOpen(false);
                setMiniDepartmentsOpen(false);
                setMobileOpen(false);
                setMobileSubMenu(null);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    useEffect(() => {
        async function loadDoctors() {
            try {
                const res = await fetch(`${API_BASE}/pages/home`);
                const data = await res.json();
                if (Array.isArray(data.doctors)) {
                    setMenuDoctors(data.doctors.slice(0, 5));
                }
            } catch (err) {
                console.error("Failed to load doctors for header menu:", err);
            }
        }
        loadDoctors();
    }, []);


    // ✅ Home page data load: doctors + services
    useEffect(() => {
        async function loadHomeMenuData() {
            try {
                const res = await fetch(`${API_BASE}/pages/home`);
                if (Array.isArray(data.doctors)) {
                    setMenuDoctors(data.doctors.slice(0, 5));
                }

                // services (dental / cosmetic)
                if (data.services) {
                    if (Array.isArray(data.services.dental)) {
                        setDentalMenu(data.services.dental);
                    }
                    if (Array.isArray(data.services.cosmetic)) {
                        setCosmeticMenu(data.services.cosmetic);
                    }
                }
            } catch (err) {
                console.error("Failed to load header menu data:", err);
            }
        }

        loadHomeMenuData();
    }, []);

    // ✅ doctor ke liye path banao (slug)
    function getDoctorPath(doc) {
        if (doc.slug) return `/doctors/${doc.slug}`;

        if (doc.name) {
            const slug = doc.name
                .toLowerCase()
                .replace(/dr\./g, "")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "");
            return `/doctors/${slug}`;
        }

        return "/doctors";
    }

    const DropdownItem = ({ to, children }) => (
        <li className="nav__item">
            <Link
                to={to}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 whitespace-nowrap"
                onClick={() => {
                    setActiveDropdown(null);
                    setMiniDepartmentsOpen(false);
                    setMobileOpen(false);
                    setMobileSubMenu(null);
                }}
            >
                {children}
            </Link>
        </li>
    );

    const DesktopNavItem = ({ title, dropdownName, children }) => (
        <li
            className="relative group nav__item"
            onMouseEnter={() => setActiveDropdown(dropdownName)}
            onMouseLeave={() => setActiveDropdown(null)}
        >
            <button
                onClick={() =>
                    setActiveDropdown((s) => (s === dropdownName ? null : dropdownName))
                }
                className="flex items-center gap-1 font-medium text-gray-700 h-full py-4 lg:py-6 transition-colors duration-200"
                style={{ color: activeDropdown === dropdownName ? PRIMARY_COLOR : "" }}
            >
                {title}
                <IoIosArrowDown
                    className={`text-xs transition-transform duration-300 ${activeDropdown === dropdownName ? "rotate-180" : "rotate-0"
                        }`}
                />
            </button>

            {activeDropdown === dropdownName && (
                <ul
                    className="absolute left-0 top-full mt-0 min-w-[14rem] bg-white rounded-md shadow-xl py-2 z-40 border border-gray-100"
                    onMouseEnter={() => setActiveDropdown(dropdownName)}
                >
                    {children}
                </ul>
            )}
        </li>
    );

    const MobileNavItem = ({ title, to, dropdownName, children }) => {
        const hasSubMenu = !!children;
        const isActive = mobileSubMenu === dropdownName;

        return (
            <li className="nav__item">
                {hasSubMenu ? (
                    <>
                        <button
                            onClick={() =>
                                setMobileSubMenu((s) =>
                                    s === dropdownName ? null : dropdownName
                                )
                            }
                            className="flex items-center justify-between w-full py-3 px-4 text-left font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                        >
                            {title}
                            <IoIosArrowDown
                                className={`text-sm transition-transform duration-300 ${isActive ? "rotate-180" : "rotate-0"
                                    }`}
                            />
                        </button>
                        {isActive && (
                            <ul className="pl-4 bg-gray-50 border-l border-gray-200">
                                {children}
                            </ul>
                        )}
                    </>
                ) : (
                    <Link
                        to={to}
                        onClick={() => setMobileOpen(false)}
                        className="block py-3 px-4 font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                    >
                        {title}
                    </Link>
                )}
            </li>
        );
    };

    return (
        <header className="header header-layout1 w-full" ref={wrapperRef}>
            <div className="header-topbar" style={{ backgroundColor: SECONDARY_COLOR }}>
                <div className="max-w-[1200px] mx-auto px-4 md:px-6">
                    <div className="flex flex-wrap md:flex-row items-center justify-between py-2 text-white">
                        <ul className="contact__list flex flex-wrap items-center gap-4 text-xs list-unstyled mb-0">
                            <li className="relative">
                                <button
                                    onClick={() => setMiniEmergencyOpen((s) => !s)}
                                    className="miniPopup-emergency-trigger bg-white/10 px-4 py-1.5 rounded-md font-semibold hover:bg-white/20 transition-colors duration-200 flex items-center gap-1 text-white text-sm"
                                    type="button"
                                >
                                    24/7 Emergency
                                </button>
                                {miniEmergencyOpen && (
                                    <div className="miniPopup miniPopup-emergency absolute top-full mt-2 left-0 w-80 bg-white text-gray-800 rounded-lg p-5 shadow-2xl z-50 border border-gray-100 text-center">
                                        <div className="emergency__icon text-4xl text-center mb-3">
                                            <FaPhoneAlt
                                                className="mx-auto"
                                                style={{ color: PRIMARY_COLOR }}
                                            />
                                        </div>
                                        <a
                                            href="tel:+918238028844"
                                            className="phone__number font-bold text-base block hover:text-primary transition-colors"
                                            style={{ color: SECONDARY_COLOR }}
                                        >
                                            <FaPhoneAlt className="inline-block mr-2 text-xs" />{" "}
                                            <span>+91 82380 28844</span>
                                        </a>
                                        <p className="text-sm mt-2 text-gray-600">
                                            Please feel free to contact our friendly reception staff
                                            with any general or medical enquiry.
                                        </p>
                                        <Link
                                            to="/appointment"
                                            onClick={() => setMiniEmergencyOpen(false)}
                                            className="inline-flex items-center justify-center mt-3 text-sm font-semibold underline hover:text-secondary transition-colors"
                                            style={{ color: PRIMARY_COLOR }}
                                        >
                                            <span>Make Appointment</span>{" "}
                                            <IoIosArrowForward className="ml-1 text-base" />
                                        </Link>
                                    </div>
                                )}
                            </li>
                            <li className="hidden sm:inline-flex items-center gap-2">
                                <FaPhoneAlt className="text-xs text-white/70" />
                                <a
                                    href="tel:+918238028844"
                                    className="text-white/90 hover:text-white transition-colors"
                                >
                                    Emergency Line: + 91 82380 28844
                                </a>
                            </li>
                            <li className="hidden md:inline-flex items-center gap-2">
                                <FaMapMarkerAlt className="text-sm text-white/70" />
                                <a
                                    href="#"
                                    className="text-white/90 hover:text-white transition-colors"
                                >
                                    Location: Ahmedabad, India, Gujarat
                                </a>
                            </li>
                            <li className="hidden lg:inline-flex items-center gap-2">
                                <FaClock className="text-sm text-white/70" />
                                <a
                                    href="/contact-us"
                                    className="text-white/90 hover:text-white transition-colors"
                                >
                                    Mon - Fri: 10:00 am - 8:00 pm
                                </a>
                            </li>
                        </ul>
                        <div className="d-flex flex items-center gap-4 mt-2 md:mt-0">
                            <ul className="social-icons hidden sm:flex items-center gap-3 list-unstyled mb-0">
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 hover:text-primary transition-colors duration-200"
                                    >
                                        <FaFacebookF />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 hover:text-primary transition-colors duration-200"
                                    >
                                        <FaInstagram />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="#"
                                        className="text-white/80 hover:text-primary transition-colors duration-200"
                                    >
                                        <FaTwitter />
                                    </a>
                                </li>
                            </ul>
                            <form className="header-topbar__search hidden sm:flex items-center border border-white/20 rounded-md overflow-hidden bg-white/10 hover:bg-white/20 transition-colors duration-200">
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    className="form-control px-3 py-1 text-sm bg-transparent outline-none placeholder-white/80 w-32 lg:w-40"
                                />
                                <button
                                    className="header-topbar__search-btn px-3 py-1 bg-white/20 hover:bg-white/30 transition-colors duration-200 h-full flex items-center justify-center"
                                    aria-label="Search button"
                                >
                                    <FaSearch className="text-sm" />
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <nav className="navbar navbar-expand-lg sticky-navbar bg-white shadow-md relative z-30">
                <div className="max-w-[1200px] mx-auto px-4 md:px-6 w-full">
                    <div className="flex items-center justify-between">
                        {/* Brand/Logo */}
                        <Link to="/" className="navbar-brand flex items-center gap-2 py-3">
                            <div className="text-4xl font-bold" style={{ color: SECONDARY_COLOR }}>
                                <span style={{ color: PRIMARY_COLOR }}>M</span>edcity
                            </div>
                        </Link>

                        <div className="flex items-center gap-4">
                            {/* Desktop Nav */}
                            <div className="hidden lg:flex items-center" id="mainNavigation">
                                <ul className="navbar-nav flex items-center gap-6 xl:gap-8 text-sm">
                                    <li className="nav__item">
                                        <Link
                                            to="/"
                                            className="nav__item-link font-medium hover:text-primary"
                                            style={{ "--primary": PRIMARY_COLOR }}
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li className="nav__item">
                                        <Link
                                            to="/about-us"
                                            className="nav__item-link font-medium hover:text-primary"
                                            style={{ "--primary": PRIMARY_COLOR }}
                                        >
                                            About Us
                                        </Link>
                                    </li>

                                    {/* ✅ Doctors dropdown – dynamic */}
                                    <DesktopNavItem title="Doctors" dropdownName="doctors">
                                        {menuDoctors.length > 0 ? (
                                            <>
                                                {menuDoctors.map((doc, index) => (
                                                    <DropdownItem key={index} to={getDoctorPath(doc)}>
                                                        {doc.name}
                                                    </DropdownItem>
                                                ))}
                                                <DropdownItem to="/doctors">All Doctors</DropdownItem>
                                            </>
                                        ) : (
                                            <>
                                                <DropdownItem to="/doctors/dr-poonam">
                                                    Dr. Poonam Mehta
                                                </DropdownItem>
                                                <DropdownItem to="/doctors/dr-ruchira">
                                                    Dr. Ruchira Shah
                                                </DropdownItem>
                                                <DropdownItem to="/doctors">All Doctors</DropdownItem>
                                            </>
                                        )}
                                    </DesktopNavItem>

                                    {/* ✅ Dental menu – dynamic from services.dental */}
                                    <DesktopNavItem title="Dental" dropdownName="dental">
                                        {dentalMenu.length > 0 ? (
                                            <>
                                                {dentalMenu.map((item, i) => (
                                                    <DropdownItem key={i} to={item.link || "#"}>
                                                        {item.title || "Untitled"}
                                                    </DropdownItem>
                                                ))}
                                            </>
                                        ) : (
                                            <>
                                                <DropdownItem to="/services?type=nri">
                                                    NRI Dental Treatment
                                                </DropdownItem>
                                                <DropdownItem to="/services?type=smile">
                                                    Smile Design
                                                </DropdownItem>
                                                <DropdownItem to="/services?type=root">
                                                    Root Canal Treatment
                                                </DropdownItem>
                                                <DropdownItem to="/services?type=implant">
                                                    Dental Implant
                                                </DropdownItem>
                                                <DropdownItem to="/services?type=jewellery">
                                                    Dental Jewellery
                                                </DropdownItem>
                                                <DropdownItem to="/services?type=denture">
                                                    Denture
                                                </DropdownItem>
                                                <DropdownItem to="/services?type=flap">
                                                    Flap Surgery
                                                </DropdownItem>
                                                <DropdownItem to="/services?type=metal">
                                                    Metal, Ceramic, Zirconia
                                                </DropdownItem>
                                                <DropdownItem to="/services?type=ortho">
                                                    Orthodontic Treatment
                                                </DropdownItem>
                                                <DropdownItem to="/services?type=paediatric">
                                                    Paediatric Dental Care
                                                </DropdownItem>
                                                <DropdownItem to="/services?type=wisdom">
                                                    Wisdom Tooth Extraction
                                                </DropdownItem>
                                            </>
                                        )}
                                    </DesktopNavItem>

                                    {/* ✅ Cosmetic menu – dynamic from services.cosmetic */}
                                    <DesktopNavItem title="Cosmetic Services" dropdownName="cosmetic">
                                        {cosmeticMenu.length > 0 ? (
                                            <>
                                                {cosmeticMenu.map((item, i) => (
                                                    <DropdownItem key={i} to={item.link || "#"}>
                                                        {item.title || "Untitled"}
                                                    </DropdownItem>
                                                ))}
                                            </>
                                        ) : (
                                            <>
                                                <DropdownItem to="/services/cosmetic/laser-hair">
                                                    Laser Hair Removal
                                                </DropdownItem>
                                                <DropdownItem to="/services/cosmetic/hydra-facial">
                                                    Hydra Facial
                                                </DropdownItem>
                                                <DropdownItem to="/services/cosmetic/hair-prp">
                                                    Hair PRP
                                                </DropdownItem>
                                                <DropdownItem to="/services/cosmetic/microblading">
                                                    Microblading
                                                </DropdownItem>
                                                <DropdownItem to="/services/cosmetic/lip-tinting">
                                                    Lip Tinting
                                                </DropdownItem>
                                                <DropdownItem to="/services/cosmetic/botox-fillers">
                                                    Botox and Fillers
                                                </DropdownItem>
                                                <DropdownItem to="/services/cosmetic/tattoo-removal">
                                                    Tattoo Removal
                                                </DropdownItem>
                                                <DropdownItem to="/services/cosmetic/depigmentation">
                                                    Depigmentation
                                                </DropdownItem>
                                                <DropdownItem to="/services/cosmetic/under-eye">
                                                    Under Eye Dark Circle Treatment
                                                </DropdownItem>
                                                <DropdownItem to="/services/cosmetic/acne">
                                                    Acne and Acne Marks
                                                </DropdownItem>
                                                <DropdownItem to="/services/cosmetic/bb-glow">
                                                    BB Glow
                                                </DropdownItem>
                                            </>
                                        )}
                                    </DesktopNavItem>

                                    <li className="nav__item">
                                        <Link
                                            to="/gallery"
                                            className="nav__item-link font-medium hover:text-primary"
                                            style={{ "--primary": PRIMARY_COLOR }}
                                        >
                                            Gallery
                                        </Link>
                                    </li>
                                    <li className="nav__item">
                                        <Link
                                            to="/contact-us"
                                            className="nav__item-link font-medium hover:text-primary"
                                            style={{ "--primary": PRIMARY_COLOR }}
                                        >
                                            Contacts
                                        </Link>
                                    </li>
                                </ul>

                                <div className="flex items-center position-relative ml-6">
                                    <button
                                        onClick={() => setMiniDepartmentsOpen((s) => !s)}
                                        className="miniPopup-departments-trigger flex items-center gap-2 py-2 group"
                                    >
                                        <span className="menu-lines w-5 h-5 flex flex-col justify-between">
                                            <span
                                                className={`block h-0.5 w-full bg-gray-700 transition-all duration-300 ${miniDepartmentsOpen
                                                    ? "rotate-45 translate-y-[.4rem]"
                                                    : "rotate-0"
                                                    }`}
                                                style={{
                                                    backgroundColor: miniDepartmentsOpen ? PRIMARY_COLOR : "",
                                                }}
                                            ></span>
                                            <span
                                                className={`block h-0.5 w-full bg-gray-700 transition-all duration-300 ${miniDepartmentsOpen ? "opacity-0" : "opacity-100"
                                                    }`}
                                            ></span>
                                            <span
                                                className={`block h-0.5 w-full bg-gray-700 transition-all duration-300 ${miniDepartmentsOpen
                                                    ? "-rotate-45 -translate-y-[.4rem]"
                                                    : "rotate-0"
                                                    }`}
                                                style={{
                                                    backgroundColor: miniDepartmentsOpen ? PRIMARY_COLOR : "",
                                                }}
                                            ></span>
                                        </span>
                                        <span
                                            className="font-medium text-gray-700 hover:text-primary transition-colors"
                                            style={{ color: miniDepartmentsOpen ? PRIMARY_COLOR : "" }}
                                        >
                                            Departments
                                        </span>
                                    </button>

                                    {miniDepartmentsOpen && (
                                        <ul
                                            id="miniPopup-departments"
                                            className="miniPopup miniPopup-departments absolute top-full mt-2 right-0 min-w-[14rem] bg-white rounded-md shadow-xl py-2 z-40 border border-gray-100"
                                        >
                                            <DropdownItem to="/departments/neurology">
                                                Neurology Clinic
                                            </DropdownItem>
                                            <DropdownItem to="/departments/cardiology">
                                                Cardiology Clinic
                                            </DropdownItem>
                                            <DropdownItem to="/departments/pathology">
                                                Pathology Clinic
                                            </DropdownItem>
                                            <DropdownItem to="/departments/laboratory">
                                                Laboratory Clinic
                                            </DropdownItem>
                                            <DropdownItem to="/departments/pediatric">
                                                Pediatric Clinic
                                            </DropdownItem>
                                            <DropdownItem to="/departments/cardiac">
                                                Cardiac Clinic
                                            </DropdownItem>
                                        </ul>
                                    )}
                                </div>

                                <Link
                                    to="/appointment"
                                    className="btn btn__primary btn__rounded ml-8 flex items-center gap-2 px-6 py-2.5 rounded-full text-white font-semibold shadow-lg transition-all duration-300 hover:opacity-90"
                                    style={{ backgroundColor: PRIMARY_COLOR }}
                                >
                                    <BsCalendar2Check className="text-lg" />
                                    <span>Appointment</span>
                                </Link>
                            </div>

                            {/* Mobile header right side */}
                            <div className="flex items-center lg:hidden">
                                <Link
                                    to="/appointment"
                                    className="btn btn__primary btn__rounded flex items-center gap-2 px-4 py-2.5 rounded-full text-white font-semibold shadow-lg transition-all duration-300 hover:opacity-90 mr-4"
                                    style={{ backgroundColor: PRIMARY_COLOR }}
                                >
                                    <BsCalendar2Check className="text-lg" />
                                    <span className="hidden sm:inline">Appointment</span>
                                </Link>
                                <button
                                    onClick={() => setMobileOpen((s) => !s)}
                                    className="navbar-toggler p-2 rounded-md text-secondary border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                                    aria-label="Toggle menu"
                                    type="button"
                                >
                                    {mobileOpen ? (
                                        <FaTimes className="w-6 h-6" style={{ color: SECONDARY_COLOR }} />
                                    ) : (
                                        <HiMenu className="w-7 h-7" style={{ color: SECONDARY_COLOR }} />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileOpen && (
                    <div className="fixed top-0 left-0 h-full w-full bg-white shadow-2xl z-50 overflow-y-auto lg:hidden pt-20 transition-transform duration-300 ease-in-out">
                        <div className="absolute top-0 left-0 w-full p-4 flex justify-end bg-white border-b border-gray-100">
                            <button
                                onClick={() => setMobileOpen(false)}
                                className="close-mobile-menu p-2 text-gray-700 hover:text-red-500"
                            >
                                <FaTimes className="text-xl" />
                            </button>
                        </div>

                        <ul className="navbar-nav divide-y divide-gray-100 pb-10">
                            <MobileNavItem to="/" title="Home" />

                            {/* About Us Submenu */}
                            <MobileNavItem title="About Us" dropdownName="about">
                                <DropdownItem to="/about-us">About Us</DropdownItem>
                                <DropdownItem to="/services">Our Services</DropdownItem>
                                <DropdownItem to="/services-single">Single Services</DropdownItem>
                                <DropdownItem to="/pricing">Pricing & Plans</DropdownItem>
                                <DropdownItem to="/appointment">Appointments</DropdownItem>
                                <DropdownItem to="/gallery">Our Gallery</DropdownItem>
                            </MobileNavItem>

                            {/* Doctors Submenu – dynamic */}
                            <MobileNavItem title="Doctors" dropdownName="doctors">
                                {menuDoctors && menuDoctors.length > 0 ? (
                                    <>
                                        {menuDoctors.map((doc, index) => (
                                            <DropdownItem key={index} to={getDoctorPath(doc)}>
                                                {doc.name}
                                            </DropdownItem>
                                        ))}
                                        <DropdownItem to="/doctors">All Doctors</DropdownItem>
                                    </>
                                ) : (
                                    <>
                                        <DropdownItem to="/doctors/dr-poonam">
                                            Dr. Poonam Mehta
                                        </DropdownItem>
                                        <DropdownItem to="/doctors/dr-ruchira">
                                            Dr. Ruchira Shah
                                        </DropdownItem>
                                        <DropdownItem to="/doctors">All Doctors</DropdownItem>
                                    </>
                                )}
                            </MobileNavItem>

                            {/* Dental Submenu – dynamic */}
                            <MobileNavItem title="Dental" dropdownName="dental">
                                {dentalMenu.length > 0 ? (
                                    <>
                                        {dentalMenu.map((item, i) => (
                                            <DropdownItem key={i} to={item.path || "#"}>
                                                {item.title || "Untitled"}
                                            </DropdownItem>
                                        ))}
                                    </>


                                ) : (
                                    <>
                                        <DropdownItem to="/services/dental/nri">
                                            NRI Dental Treatment
                                        </DropdownItem>
                                        <DropdownItem to="/services/dental/smile">
                                            Smile Design
                                        </DropdownItem>
                                        <DropdownItem to="/services/dental/root">
                                            Root Canal Treatment
                                        </DropdownItem>
                                        <DropdownItem to="/services/dental/implant">
                                            Dental Implant
                                        </DropdownItem>
                                        <DropdownItem to="/services/dental/jewellery">
                                            Dental Jewellery
                                        </DropdownItem>
                                        <DropdownItem to="/services/dental/denture">Denture</DropdownItem>
                                        <DropdownItem to="/services/dental/flap">
                                            Flap Surgery
                                        </DropdownItem>
                                        <DropdownItem to="/services/dental/metel">
                                            Metal, Ceramic, Zirconia
                                        </DropdownItem>
                                        <DropdownItem to="/services/dental/orthodonic">
                                            Orthodontic Treatment
                                        </DropdownItem>
                                        <DropdownItem to="/services/dental/paediatric">
                                            Paediatric Dental Care
                                        </DropdownItem>
                                        <DropdownItem to="/services/dental/wisdom">
                                            Wisdom Tooth Extraction
                                        </DropdownItem>
                                    </>
                                )}
                            </MobileNavItem>

                            {/* Cosmetic Services Submenu – dynamic */}
                            <MobileNavItem title="Cosmetic Services" dropdownName="cosmetic">
                                {cosmeticMenu.length > 0 ? (
                                    <>
                                        {cosmeticMenu.map((item, i) => (
                                            <DropdownItem key={i} to={item.path || "#"}>
                                                {item.title || "Untitled"}
                                            </DropdownItem>
                                        ))}
                                    </>


                                ) : (
                                    <>
                                        <DropdownItem to="/services/cosmetic/laser-hair">
                                            Laser Hair Removal
                                        </DropdownItem>
                                        <DropdownItem to="/services/cosmetic/hydra-facial">
                                            Hydra Facial
                                        </DropdownItem>
                                        <DropdownItem to="/services/cosmetic/hair-prp">
                                            Hair PRP
                                        </DropdownItem>
                                        <DropdownItem to="/services/cosmetic/microblading">
                                            Microblading
                                        </DropdownItem>
                                        <DropdownItem to="/services/cosmetic/lip-tinting">
                                            Lip Tinting
                                        </DropdownItem>
                                        <DropdownItem to="/services/cosmetic/botox-fillers">
                                            Botox and Fillers
                                        </DropdownItem>
                                        <DropdownItem to="/services/cosmetic/tattoo-removal">
                                            Tattoo Removal
                                        </DropdownItem>
                                        <DropdownItem to="/services/cosmetic/depigmentation">
                                            Depigmentation
                                        </DropdownItem>
                                        <DropdownItem to="/services/cosmetic/under-eye">
                                            Under Eye Dark Circle Treatment
                                        </DropdownItem>
                                        <DropdownItem to="/services/cosmetic/acne">
                                            Acne and Acne Marks
                                        </DropdownItem>
                                        <DropdownItem to="/services/cosmetic/bb-glow">
                                            BB Glow
                                        </DropdownItem>
                                    </>
                                )}
                            </MobileNavItem>

                            <MobileNavItem to="/gallery" title="Gallery" />
                            <MobileNavItem to="/contact-us" title="Contacts" />
                            <MobileNavItem to="/departments" title="Departments" />

                            <li className="p-4">
                                <Link
                                    to="/appointment"
                                    onClick={() => setMobileOpen(false)}
                                    className="block w-full text-center bg-primary hover:bg-opacity-90 text-white px-5 py-3 rounded-full font-semibold transition-colors duration-200"
                                    style={{ backgroundColor: PRIMARY_COLOR }}
                                >
                                    <BsCalendar2Check className="inline-block mr-2 text-lg" /> Make
                                    Appointment
                                </Link>
                            </li>
                        </ul>
                    </div>
                )}
            </nav>
        </header>
    );
}
