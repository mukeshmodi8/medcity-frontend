import React from "react";

function Appointment() {
  return (
    <section className="min-h-screen py-20">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-blue-900 mb-4">Book Appointment</h2>
        <p className="text-gray-600 mb-6">Fill the details and our team will contact you to confirm.</p>

        <form className="space-y-4">
          <input className="w-full border rounded px-4 py-2" placeholder="Full name" />
          <input className="w-full border rounded px-4 py-2" placeholder="Phone or Email" />
          <button className="bg-blue-800 text-white px-6 py-2 rounded">Submit</button>
        </form>
      </div>
    </section>
  );
}

export default Appointment;
