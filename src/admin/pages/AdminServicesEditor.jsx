import React, { useState } from 'react';
import { FaEdit, FaPlus, FaTrashAlt, FaTable, FaInfoCircle, FaHospitalSymbol } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';

const PRIMARY_COLOR = '#21CDC0';   
const SECONDARY_COLOR = '#283B6A';

const serviceSections = [
    { id: 'service_list', name: 'All Services List (Sidebar)', icon: <FaTable /> },
    { id: 'hero_detail', name: 'Header/Detail Section', icon: <FaInfoCircle /> },
    { id: 'main_content', name: 'Main Content Body', icon: <FaEdit /> },
    { id: 'service_features', name: 'Bottom Feature Cards', icon: <FaHospitalSymbol /> },
];

const ServiceItemEditor = ({ service, index, onDelete }) => (
    <div className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-gray-200">
        <span className="font-semibold text-gray-700 w-10">{index + 1}.</span>
        <input 
            type="text" 
            defaultValue={service.title}
            placeholder="e.g., Pediatric Clinic" 
            className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
        />
        <input 
            type="text" 
            defaultValue={service.to}
            placeholder="e.g., /services/pediatric" 
            className="flex-1 p-2 border border-gray-300 rounded-md text-sm"
        />
        <button 
            onClick={() => onDelete(index)} 
            className="p-2 text-white rounded-md bg-red-500 hover:bg-red-600 transition"
            title="Delete Service"
        >
            <FaTrashAlt />
        </button>
    </div>
);

const EditorForm = ({ sectionId, title }) => {
    const initialServices = [
        { title: "Neurology Clinic", to: "/services/neurology" },
        { title: "Cardiology Clinic", to: "/services/cardiology" },
        { title: "Pathology Clinic", to: "/services/pathology" },
    ];
    const [services, setServices] = useState(initialServices);

    const handleAddService = () => {
        setServices([...services, { title: "", to: "" }]);
    };
    const handleDeleteService = (index) => {
        setServices(services.filter((_, i) => i !== index));
    };

    return (
        <div className="p-6 rounded-xl bg-gray-50 border-t-4" style={{ borderColor: SECONDARY_COLOR }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: SECONDARY_COLOR }}>{title} Editing</h3>
            
            {/* Conditional Content based on sectionId */}
            {sectionId === 'service_list' && (
                <div className="space-y-4">
                    <p className="text-sm text-gray-600 mb-3">Edit the list of all services shown in the sidebar.</p>
                    {services.map((s, index) => (
                        <ServiceItemEditor key={index} service={s} index={index} onDelete={handleDeleteService} />
                    ))}
                    <button 
                        onClick={handleAddService}
                        className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold transition-all duration-200"
                        style={{ backgroundColor: PRIMARY_COLOR }}
                    >
                        <FaPlus /> Add New Service
                    </button>
                </div>
            )}
            
            {(sectionId === 'hero_detail' || sectionId === 'main_content') && (
                <div className="space-y-4">
                    <p className="text-sm text-gray-600 mb-3">These fields manage the header and main text for the Pathology Service Page.</p>
                    <input 
                        type="text" 
                        placeholder="Page Title (e.g., Pathology Clinic)" 
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                    <textarea 
                        rows="6" 
                        placeholder="Main detailed description paragraph..." 
                        className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    />
                </div>
            )}

            <button
                className="mt-6 px-6 py-2 rounded-full text-white font-semibold transition-all duration-200"
                style={{ backgroundColor: SECONDARY_COLOR }}
            >
                <FaEdit className="inline mr-2" /> Save Section Changes
            </button>
        </div>
    );
};


export default function AdminServicesEditor() {
    const [activeSection, setActiveSection] = useState(serviceSections[0]);

    return (
        <div className="p-4 md:p-8 min-h-screen" style={{ backgroundColor: '#f4f7f9' }}>
            <h1 className="text-3xl font-extrabold mb-2" style={{ color: SECONDARY_COLOR }}>
                Services Page Editor
            </h1>
            <p className="text-gray-500 mb-8">
                Manage service lists and content for individual service pages (e.g., Neurology, Cardiology).
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                
                {/* Section Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    <h3 className="text-sm font-bold text-gray-600 mb-2">PAGE ELEMENTS</h3>
                    {serviceSections.map((section) => (
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