import React, { useState } from 'react';
import { FaCalendarCheck, FaEdit, FaDatabase, FaSave } from 'react-icons/fa';

const PRIMARY_COLOR = '#21CDC0';   
const SECONDARY_COLOR = '#283B6A';

const AppointmentEditor = () => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg border-t-4" style={{ borderColor: SECONDARY_COLOR }}>
            <h3 className="text-xl font-bold mb-4" style={{ color: SECONDARY_COLOR }}>Form Text Editing</h3>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Page Heading (H2)</label>
                <input 
                    type="text" 
                    placeholder="Book Appointment" 
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    defaultValue="Book Appointment"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtext/Instructions</label>
                <textarea 
                    rows="2" 
                    placeholder="Fill the details and our team will contact you to confirm." 
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    defaultValue="Fill the details and our team will contact you to confirm."
                />
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Submit Button Text</label>
                <input 
                    type="text" 
                    placeholder="Submit" 
                    className="w-full p-2 border border-gray-300 rounded-md text-sm"
                    defaultValue="Submit"
                />
            </div>

            <button
                className="px-6 py-3 rounded-full text-white font-semibold transition-all duration-200 shadow-md"
                style={{ backgroundColor: SECONDARY_COLOR }}
            >
                <FaSave className="inline mr-2" /> Save Form Settings
            </button>
        </div>
    );
};


export default function AdminAppointmentEditor() {
    return (
        <div className="p-4 md:p-8 min-h-screen" style={{ backgroundColor: '#f4f7f9' }}>
            <h1 className="text-3xl font-extrabold mb-2" style={{ color: SECONDARY_COLOR }}>
                Appointment Management
            </h1>
            <p className="text-gray-500 mb-8">
                Manage the appointment form text and view submission data.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <AppointmentEditor />
                </div>
                <div className="lg:col-span-1 space-y-4">
                    <div className="bg-white p-6 rounded-xl shadow-lg border-t-4" style={{ borderColor: PRIMARY_COLOR }}>
                        <h4 className="text-lg font-bold mb-3" style={{ color: SECONDARY_COLOR }}><FaDatabase className="inline mr-2"/> View Submissions</h4>
                        <p className="text-sm text-gray-600 mb-4">
                            All incoming appointment requests will be listed here (Requires backend integration).
                        </p>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-semibold" style={{ backgroundColor: PRIMARY_COLOR }}>
                            <FaCalendarCheck /> See Pending Requests
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}