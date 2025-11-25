import React, { useState } from 'react';
import { FaEdit, FaLink, FaVideo, FaInfoCircle, FaCheckSquare, FaHospital } from 'react-icons/fa';

const PRIMARY_COLOR = '#21CDC0';   
const SECONDARY_COLOR = '#283B6A';

const aboutSections = [
    { id: 'hero_banner', name: 'Header/Banner Section', icon: <FaVideo /> },
    { id: 'about_intro', name: 'About Intro & Experience', icon: <FaInfoCircle /> },
    { id: 'features_cta', name: 'Features & CTA (Bottom)', icon: <FaCheckSquare /> },
    { id: 'contact_cta', name: 'Final Contact CTA', icon: <FaLink /> },
];

const EditorForm = ({ sectionId, title }) => (
    <div className="bg-white p-6 rounded-lg shadow-md border-t-4" style={{ borderColor: PRIMARY_COLOR }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: SECONDARY_COLOR }}>{title} Content</h3>
        
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Main Heading (H1)</label>
            <input 
                type="text" 
                placeholder="Caring For The Health & Well Being Of Family." 
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Main Paragraph/Subtext</label>
            <textarea 
                rows="4" 
                placeholder="Our goal is to deliver quality of care in a courteous, respectful, and compassionate manner..." 
                className="w-full p-2 border border-gray-300 rounded-md text-sm"
            />
        </div>
        {sectionId === 'about_intro' && (
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Years of Experience Value (e.g., 30)</label>
                <input 
                    type="number" 
                    placeholder="30" 
                    className="w-1/3 p-2 border border-gray-300 rounded-md text-sm"
                />
            </div>
        )}
        
        {sectionId === 'hero_banner' && (
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Background Image URL (bg10)</label>
                <input 
                    type="text" 
                    placeholder="/assets/10.jpg" 
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                />
            </div>
        )}

        <button
            className="mt-4 px-6 py-2 rounded-full text-white font-semibold transition-all duration-200"
            style={{ backgroundColor: SECONDARY_COLOR }}
        >
            <FaEdit className="inline mr-2" /> Save {title}
        </button>
    </div>
);


export default function AdminAboutEditor() {
    const [activeSection, setActiveSection] = useState(aboutSections[0]);

    return (
        <div className="p-4 md:p-8 min-h-screen" style={{ backgroundColor: '#f4f7f9' }}>
            <h1 className="text-3xl font-extrabold mb-2" style={{ color: SECONDARY_COLOR }}>
                About Us Page Editor
            </h1>
            <p className="text-gray-500 mb-8">
                Manage all content and media for the "About Us" page.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-1 space-y-2">
                    <h3 className="text-sm font-bold text-gray-600 mb-2">PAGE SECTIONS</h3>
                    {aboutSections.map((section) => (
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
                <div className="lg:col-span-3">
                    <EditorForm sectionId={activeSection.id} title={activeSection.name} />
                </div>
            </div>
        </div>
    );
}