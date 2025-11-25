import React from "react";
import {
    FaFacebookF,
    FaInstagram,
    FaTwitter,
    FaPhoneAlt,
    FaFileAlt,
    FaClock,
    FaClinicMedical,
} from "react-icons/fa";
import { BsCalendar2Check } from "react-icons/bs";
import ProfileImg from "../assets/TWS01506.jpg";

export default function DrRuchira() {
    return (
        <div className="w-full bg-white text-slate-800">
            {/* Top Title */}
            <div className="w-full bg-teal-50/40 py-14">
                <h1 className="text-center text-3xl font-bold text-[#233D87]">Dr. Ruchira Shah</h1>
            </div>

            {/* Main: Profile + Right details */}
            <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Left column - Profile card */}
                <div className="space-y-6">
                    <div className="bg-white shadow-lg rounded-xl overflow-hidden">
                        <img src={ProfileImg} alt="Dr. Ruchira Shah" className="w-full h-64 object-cover" />
                        <div className="p-5">
                            <h2 className="text-xl font-semibold text-[#233D87]">Dr. Ruchira Shah</h2>
                            <p className="text-teal-500 font-medium text-sm mt-1">Dental Specialist</p>
                            <p className="text-gray-600 text-sm mt-3">
                                Absolute elation of stunning skin & smile with Elite 32 Dental & Cosmetic Clinic.
                            </p>

                            <div className="flex items-center gap-3 mt-4">
                                <a href="#" className="p-2 rounded-full bg-slate-50 text-slate-700 hover:bg-slate-100"><FaFacebookF /></a>
                                <a href="#" className="p-2 rounded-full bg-slate-50 text-slate-700 hover:bg-slate-100"><FaTwitter /></a>
                                <a href="tel:+918238028844" className="p-2 rounded-full bg-slate-50 text-slate-700 hover:bg-slate-100"><FaPhoneAlt /></a>
                            </div>
                        </div>
                        <div className="h-1 bg-gradient-to-r from-teal-400 to-teal-300" />
                    </div>

                    {/* small green box under profile */}
                    <div className="bg-gradient-to-br from-teal-400 to-teal-300 text-white rounded-xl p-5 shadow-md">
                        <h4 className="font-semibold mb-2">Emergency Cases</h4>
                        <p className="text-sm opacity-90">
                            Please feel welcome to contact our friendly reception staff with any general or medical enquiry.
                        </p>
                        <div className="mt-4 inline-flex items-center gap-3 font-semibold">
                            <div className="bg-white/20 p-2 rounded-full"><FaPhoneAlt /></div>
                            <span>01061245741</span>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white rounded-xl p-6 shadow-sm">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-3">Biography</h3>
                        <p className="text-gray-700 leading-relaxed mb-3">
                            A neurologist is a medical doctor with specialized training in diagnosing, treating, and managing disorders of the brain and nervous system including, but not limited to, Alzheimer’s disease, amyotrophic lateral sclerosis (ALS), concussion, epilepsy, migraine, multiple sclerosis, Parkinson’s disease, and stroke.
                        </p>
                        <p className="text-gray-700 leading-relaxed">
                            She traveled to Philadelphia, Pennsylvania to complete a Fellowship in Intervention Cardiology where she received extensive training. She has published multiple research papers and continues to contribute to medical journals.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-teal-50 p-4 rounded-lg">
                            <div className="flex justify-between">
                                <p className="font-medium text-gray-700">Speciality</p>
                                <p className="font-semibold text-[#233D87]">Cardiology</p>
                            </div>
                        </div>
                        <div className="bg-teal-50 p-4 rounded-lg">
                            <div className="flex justify-between">
                                <p className="font-medium text-gray-700">Degrees</p>
                                <p className="font-semibold text-[#233D87]">M.D. of Medicine</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-teal-50 p-4 rounded-lg">
                        <p className="font-medium text-gray-700 mb-2">Areas Of Expertise</p>
                        <ul className="text-sm text-gray-700 space-y-1">
                            <li>✔ Cardiac Imaging – Non-invasive</li>
                            <li>✔ Cardiac Rehabilitation and Exercise</li>
                            <li>✔ Hypertrophic Cardiomyopathy</li>
                            <li>✔ Inherited Heart Diseases</li>
                        </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-teal-50 p-4 rounded-lg">
                            <div className="flex justify-between">
                                <p className="font-medium text-gray-700">Office</p>
                                <p className="font-semibold text-[#233D87]">2307 Beverley Rd Brooklyn, NY</p>
                            </div>
                        </div>
                        <div className="bg-teal-50 p-4 rounded-lg">
                            <div className="flex justify-between">
                                <p className="font-medium text-gray-700">University</p>
                                <p className="font-semibold text-[#233D87]">Harvard University</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

   
            <div className="max-w-6xl mx-auto px-4 lg:px-8 mt-8 mb-16">
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

                    {/* right content - services + booking */}
                    <div className="lg:col-span-8 space-y-6">
                        <div>
                            <h3 className="text-2xl font-semibold text-gray-800">Doctor’s Services</h3>
                            <p className="text-gray-600 mt-3">
                                He actively participates in clinical research trials and has been published in peer reviewed journals such as the Journal of the State Medical Society and Baylor University Medical Center's Proceedings. Our clinic provides modern facilities and trained staff for all major procedures.
                            </p>
                        </div>

                        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-2xl shadow-xl">
                            <div className="bg-white rounded-xl p-8 md:p-10">
                                <h4 className="text-xl font-semibold mb-3">Book An Appointment</h4>
                                <p className="text-sm text-gray-600 mb-6">
                                    Please feel welcome to contact our friendly reception staff with any general or medical enquiry. Our doctors will receive or return any urgent calls.
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
                                    <input type="date" placeholder="dd-mm-yyyy" className="p-3 border rounded-md" />

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
        </div>
    );
}
