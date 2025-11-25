import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaClock, FaCommentDots, FaGlobe, FaStar, FaSave } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

const PRIMARY_COLOR = '#21CDC0';   
const SECONDARY_COLOR = '#283B6A';

const contactSections = [
    { id: 'map_form', name: 'Map & Contact Form', icon: <FaGlobe /> },
    { id: 'quick_contacts', name: 'Quick Contacts (Sidebar)', icon: <FaPhoneAlt /> },
    { id: 'testimonials', name: 'Testimonials Slider', icon: <FaStar /> },
];

const EditorForm = ({ sectionId, title }) => {
    const [testimonials, setTestimonials] = useState([
        { id: 1, quote: "Their Doctors Include Highly Qualified Practitioners...", author: "Sami Wade", role: "7oroof Inc" },
        { id: 2, quote: "Our team is committed to providing outstanding patient care...", author: "Ahmed", role: "Web Inc" },
    ]);

    const handleAddTestimonial = () => {
        const newId = Math.max(...testimonials.map(t => t.id)) + 1;
        setTestimonials([...testimonials, { id: newId, quote: 'New Quote', author: 'New Author', role: 'New Role' }]);
    };
    const handleDeleteTestimonial = (id) => {
        setTestimonials(testimonials.filter(t => t.id !== id));
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4" style={{ borderColor: SECONDARY_COLOR }}>
            <h3 className="text-xl font-bold mb-6" style={{ color: SECONDARY_COLOR }}>{title} Editing</h3>
            {sectionId === 'map_form' && (
                <div className="space-y-4">
                    <p className="text-sm text-gray-600 mb-3">Edit the main heading and introductory text for the contact form.</p>
                    <input 
                        type="text" 
                        placeholder="Form Heading (e.g., How Can We Help?)" 
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        defaultValue="How Can We Help?"
                    />
                    <textarea 
                        rows="3" 
                        placeholder="Form introductory paragraph..." 
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                        defaultValue="Please feel welcome to contact our friendly reception staff..."
                    />
                </div>
            )}
            {sectionId === 'quick_contacts' && (
                <div className="space-y-4">
                    <h4 className="font-semibold mb-2">Contact Details</h4>
                    <div className="flex flex-col gap-3">
                        <input type="text" placeholder="Emergency Line (e.g., 082380 28844)" defaultValue="082380 28844" className="p-2 border border-gray-300 rounded-md text-sm" />
                        <input type="text" placeholder="Location (e.g., Ahmedabad, India, Gujarat)" defaultValue="Ahmedabad, India, Gujarat" className="p-2 border border-gray-300 rounded-md text-sm" />
                        <input type="text" placeholder="Working Hours (e.g., Mon - Fri: 9:00 am - 8:00 pm)" defaultValue="Mon - Fri: 9:00 am - 8:00 pm" className="p-2 border border-gray-300 rounded-md text-sm" />
                    </div>
                </div>
            )}

            {/* --- TESTIMONIALS SECTION --- */}
            {sectionId === 'testimonials' && (
                <div className="space-y-4">
                    <h4 className="font-semibold mb-2">Edit Testimonial List</h4>
                    {testimonials.map((t, index) => (
                        <div key={t.id} className="p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-2">
                            <textarea 
                                rows="3" 
                                defaultValue={t.quote} 
                                placeholder="Quote text"
                                className="w-full p-2 border border-gray-300 rounded-md text-sm" 
                            />
                            <div className="flex gap-3">
                                <input type="text" defaultValue={t.author} placeholder="Author Name" className="flex-1 p-2 border border-gray-300 rounded-md text-sm" />
                                <input type="text" defaultValue={t.role} placeholder="Author Role" className="flex-1 p-2 border border-gray-300 rounded-md text-sm" />
                            </div>
                            <button 
                                onClick={() => handleDeleteTestimonial(t.id)} 
                                className="text-red-500 hover:text-red-700 text-xs font-semibold"
                            >
                                <FaTrashAlt className="inline mr-1" /> Remove This Testimonial
                            </button>
                        </div>
                    ))}
                    <button 
                        onClick={handleAddTestimonial}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold transition-all duration-200"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                    >
                        <FaPlus className="inline" /> Add New Testimonial
                    </button>
                </div>
            )}

            <button
                className="mt-6 px-6 py-3 rounded-full text-white font-semibold transition-all duration-200 shadow-md"
                style={{ backgroundColor: SECONDARY_COLOR }}
            >
                <FaSave className="inline mr-2" /> Save Changes
            </button>
        </div>
    );
};


export default function AdminContactEditor() {
    const [activeSection, setActiveSection] = useState(contactSections[0]);

    return (
        <div className="p-4 md:p-8 min-h-screen" style={{ backgroundColor: '#f4f7f9' }}>
            <h1 className="text-3xl font-extrabold mb-2" style={{ color: SECONDARY_COLOR }}>
                Contact Page Editor
            </h1>
            <p className="text-gray-500 mb-8">
                Manage contact form text, quick contact details, and testimonial content.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Section Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    <h3 className="text-sm font-bold text-gray-600 mb-2">PAGE ELEMENTS</h3>
                    {contactSections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section)}
                            className={`w-full text-left flex items-center gap-3 p-3 rounded-lg transition-colors text-sm font-medium ${
                                section.id === activeSection.id ? 'bg-white shadow-md border-l-4' : 'hover:bg-gray-100'
                            }`}
                            style={{ borderColor: section.id === activeSection.id ? PRIMARY_COLOR : 'transparent', color: SECONDARY_COLOR }}
                        >
                            <span className="text-lg" style={{ color: PRIMARY_COLOR }}>{section.icon}</span>
                            {section.name}
                        </button>
                    ))}
                </div>

                {/* Editor Area */}
                <div className="lg:col-span-3">
                    <EditorForm sectionId={activeSection.id} title={activeSection.name} />
                </div>
            </div>
        </div>
    );
}