import React from "react";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-teal-400 to-blue-600 text-white text-center py-32">
      <div className="max-w-3xl mx-auto px-4">
        <h1 className="text-5xl font-bold mb-4">Quality Health Care For Family</h1>
        <p className="text-lg mb-8">
          Caring For The Health And Well Being Of Family. We follow the best
          practices for cleanliness and care.
        </p>
        <div className="space-x-4">
          <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100">
            Learn More
          </button>
          <button className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600">
            Watch Video ▶
          </button>
        </div>
      </div>
    </section>
  );
}
