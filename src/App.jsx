import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Doctors from "./pages/Doctors";
import Services from "./pages/Services";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Appointment from "./pages/Appointment";
import DoctorProfile from "./components/DoctorProfile";
import DrRuchira from "./components/DrRuchira";
import Auth from "./admin/pages/Auth";   // <-- Login/Register
import AdminRoutes from "./admin/AdminRoutes";

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Header />}

      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/doctors/:doctorId" element={<Doctors />} />
        <Route path="/doctors/dr-poonam" element={<DoctorProfile />} />
        <Route path="/doctors/dr-ruchira" element={<DrRuchira />} />
        <Route path="/admin" element={<Auth />} />
        <Route path="/admin/dashboard/*" element={<AdminRoutes />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
