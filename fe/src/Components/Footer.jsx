import React from "react";
import { icons } from "../assets/assets";
import { FaFacebook, FaInstagram, FaTwitter, FaTiktok } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="flex flex-col xl:h-[591px] z-10 mt-[-20px] xl:mt-[-205px] bg-secondary_black rounded-[24px] xl:rounded-[48px] px-4 xl:px-12 pt-6 xl:pt-[40px] overflow-hidden mb-[15px] xl:mb-[50px]">
            <div className="flex flex-col xl:flex-row justify-between">
                {/* About Us Section */}
                <div className="mb-[40px] xl:mb-0 xl:w-[446px]">
                    <h3 className="font-semibold text-2xl xl:text-4xl text-secondary_yellow">
                        About us
                    </h3>
                    <p className="text-[16px] xl:text-xl text-[#E7E7E3] xl:mt-1">
                        We are the biggest hyperstore in the universe. We got you all covered with our exclusive collections and latest drops.
                    </p>
                </div>

                {/* Categories Section */}
                <div className="mb-6 xl:mb-0"> 
                    <h3 className="text-xl xl:text-2xl font-semibold text-secondary_yellow">
                        Categories
                    </h3>
                    <ul className="mt-4 text-[16px] xl:text-xl text-[#E7E7E3] flex flex-col gap-2">
                        <li>Runners</li>
                        <li>Sneakers</li>
                        <li>Basketball</li>
                        <li>Outdoor</li>
                        <li>Golf</li>
                        <li>Hiking</li>
                    </ul>
                </div>

                {/* Company Section */}
                <div className="mb-6 xl:mb-0">
                    <h3 className="text-xl xl:text-2xl font-semibold text-secondary_yellow">
                        Company
                    </h3>
                    <ul className="mt-4 text-[16px] xl:text-xl text-[#E7E7E3] flex flex-col gap-2">
                        <li>About</li>
                        <li>Contact</li>
                        <li>Blogs</li>
                    </ul>
                </div>

                {/* Follow Us Section */}
                <div >
                    <h3 className="text-xl xl:text-2xl font-semibold text-secondary_yellow">
                        Follow us
                    </h3>
                    <div className="flex mt-4 gap-4 xl:gap-6">
                        <a
                            href="https://github.com/nguyenphan407/Kicks"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Facebook"
                        >
                            <FaFacebook className="text-gray-400 hover:text-white cursor-pointer w-6 h-6" />
                        </a>
                        <a
                            href="https://github.com/nguyenphan407/Kicks"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Instagram"
                        >
                            <FaInstagram className="text-gray-400 hover:text-white cursor-pointer w-6 h-6" />
                        </a>
                        <a
                            href="https://github.com/nguyenphan407/Kicks"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Twitter"
                        >
                            <FaTwitter className="text-gray-400 hover:text-white cursor-pointer w-6 h-6" />
                        </a>
                        <a
                            href="https://github.com/nguyenphan407/Kicks"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="TikTok"
                        >
                            <FaTiktok className="text-gray-400 hover:text-white cursor-pointer w-6 h-6" />
                        </a>
                    </div>
                </div>
            </div>

            {/* Large Logo Section */}
            <img
                className="mt-[45px] xl:mt-[97px] mb-[-22px] xl:mb-[-105px] w-[100%]"
                src={icons.LogoIconWhite}
                alt="Logo"
            />
        </footer>
    );
};

export default Footer;
