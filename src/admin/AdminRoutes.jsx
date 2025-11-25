import React from "react";
import { Routes, Route } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import Dashboard from "./Dashboard";
import AdminHomeEditor from "./pages/AdminHomeEditor";         
import AdminServicesEditor from "./pages/AdminServicesEditor";  
import AdminDoctorsEditor from "./pages/AdminDoctorsEditor";   
import AdminGalleryEditor from "./pages/AdminGalleryEditor";  
import AdminContactEditor from "./pages/AdminContactEditor";
import AdminAppointmentEditor from "./pages/AdminAppointmentEditor"; 
import AdminAboutEditor from "./pages/AdminAboutEditor";    

export default function AdminRoutes() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="home" element={<AdminHomeEditor />} />
        <Route path="services" element={<AdminServicesEditor />} />
        <Route path="doctors" element={<AdminDoctorsEditor />} />
        <Route path="gallery" element={<AdminGalleryEditor />} />
        <Route path="contact" element={<AdminContactEditor />} />
        <Route path="appointment" element={<AdminAppointmentEditor />} />
        <Route path="about" element={<AdminAboutEditor />} />
      </Route>
    </Routes>
  );
}
