import React from "react";

const Footer = () => {
    return (
        <footer className="flex justify-between items-center py-4 bg-[#E7E7E3] border-t mt-10 border-gray-400">
            {/* Copyright Section */}
            <div className="text-[14px] font-semibold text-[#232321]">
                © Kicks Dashboard - IS207 
            </div>

            {/* Navigation Links */}
            <div className="flex gap-6 text-sm font-medium text-gray-700">
                <a href="#about" className="hover:text-black">
                    About
                </a>
                <a href="#careers" className="hover:text-black">
                    Careers
                </a>
                <a href="#policy" className="hover:text-black">
                    Policy
                </a>
                <a href="#contact" className="hover:text-black">
                    Contact
                </a>
            </div>
        </footer>
    );
};

export default Footer;
