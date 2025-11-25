import React from 'react';
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight, FaFacebookF, FaTwitter, FaPhoneAlt } from 'react-icons/fa';

const PRIMARY_COLOR = '#00bfa6'; 
const SECONDARY_COLOR = '#233d87'; 
const HOVER_SECONDARY_COLOR = '#283B6A';

const DoctorCard = ({ image, name, specialization, description, link }) => {
    
    const readMoreClasses = `
        inline-flex items-center justify-center 
        text-sm font-semibold 
        px-6 py-2.5 rounded-full 
        transition-all duration-300 shadow-md
        bg-[${SECONDARY_COLOR}] text-white 
        hover:bg-[${HOVER_SECONDARY_COLOR}]
    `;
    

    const socialIcons = (
        <div className="flex items-center gap-2">
            <a href="#" 
               className="w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200"
               style={{ backgroundColor: '#4267B2', color: 'white' }} // Facebook Blue
            >
                <FaFacebookF />
            </a>
            <a href="#" 
               className="w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200"
               style={{ backgroundColor: '#1DA1F2', color: 'white' }} // Twitter Blue
            >
                <FaTwitter />
            </a>
            <a href="tel:0000000000" 
               className="w-10 h-10 flex items-center justify-center rounded-full transition-colors duration-200"
               style={{ backgroundColor: SECONDARY_COLOR, color: 'white' }} // Dark Blue Phone
            >
                <FaPhoneAlt />
            </a>
        </div>
    );

    return (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
        
            <div className="h-64 bg-gray-200 relative overflow-hidden">
                <img 
                    src={image} 
                    alt={name} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            
            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow text-left">
                <h3 className="text-xl font-bold mb-1" style={{ color: SECONDARY_COLOR }}>
                    {name}
                </h3>
                <p className="text-sm font-medium mb-3" style={{ color: PRIMARY_COLOR }}>
                    {specialization}
                </p>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {description}
                </p>
                <div className="flex items-center gap-2 mt-auto pt-4">
                    <Link 
                        to={link} 
                        className={readMoreClasses}
                    >
                        Read More <FaLongArrowAltRight className="ml-2" />
                    </Link>
                    
          
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {socialIcons}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DoctorCard;