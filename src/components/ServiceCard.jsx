import React from 'react';
import { Link } from 'react-router-dom';
import { FaLongArrowAltRight } from 'react-icons/fa';


const PRIMARY_COLOR = '#00bfa6';
const SECONDARY_COLOR = '#233d87';
const HOVER_SECONDARY_COLOR = '#283B6A';

/**
 
 * @param {string} variant 
 */
const ServiceCard = ({ image, title, description, link, variant = 'outline' }) => {
    let buttonClasses = "inline-flex items-center text-sm font-semibold mt-auto px-6 py-2.5 rounded-full transition-all duration-300";

    if (variant === 'secondary') {
        buttonClasses += ` bg-[${SECONDARY_COLOR}] text-white hover:bg-[${HOVER_SECONDARY_COLOR}] hover:shadow-lg`;

    } else if (variant === 'primary') {
        buttonClasses += ` bg-[${PRIMARY_COLOR}] text-white hover:bg-opacity-90 hover:shadow-lg`;

    } else {
        buttonClasses += ` border-2 border-[${PRIMARY_COLOR}] text-[${PRIMARY_COLOR}] hover:bg-[${PRIMARY_COLOR}] hover:text-white`;
    }

    return (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden group hover:shadow-2xl transition-shadow duration-300 h-full flex flex-col">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
                <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold mb-3" style={{ color: SECONDARY_COLOR }}>
                    {title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                    {description}
                </p>
                <Link
                    to={link}
                    className={buttonClasses}
                >
                    Read More <FaLongArrowAltRight className="ml-2" />
                </Link>
            </div>
        </div>
    );
};

export default ServiceCard;