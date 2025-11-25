import React from 'react';
const PRIMARY_COLOR = '#00bfa6';

const FeatureIconCard = ({ icon, title }) => {
    return (
        <div className="bg-white p-6 rounded-xl shadow-lg flex items-center gap-4 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
            <div 
                className="text-4xl p-2 rounded-full"
                style={{ color: PRIMARY_COLOR, border: `2px solid ${PRIMARY_COLOR}` }}
            >
                {icon}
            </div>
            <p className="text-base font-semibold text-gray-700">{title}</p>
        </div>
    );
};

export default FeatureIconCard;