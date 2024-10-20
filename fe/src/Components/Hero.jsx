import React from "react";
import MainHero from "../assets/images/mainHero.jpg"

const Hero = () => {
    return (
        <div >
            {/* Main text "DO IT RIGHT" */}
            <div className="my-7 font-bold text-big/normal leading-[1.15] font-rubik text-center">
                <h1>
                    DO IT <span className="text-primary_blue">RIGHT</span>
                </h1>
            </div>

            {/* Image and Product details */}
            <div className="relative">
                {/* Product tag on the left */}
                <div className="absolute left-0 top-11 -rotate-90">
                    <span className="bg-black text-white py-1 px-3">Nike product of the year</span>
                </div>

                {/* Main image */}
                <img 
                    src={ MainHero } 
                    alt="Nike Air Max" 
                     className="w-full h-[750px] object-cover rounded-xl"
                />

                {/* Product details */}
                <div className="absolute bottom-10 left-10 text-white">
                    <h2 className="text-4xl font-bold">NIKE AIR MAX</h2>
                    <p className="text-lg">Nike introducing the new air max for everyone comfort</p>
                    <button className="bg-primary_blue py-2 px-4 mt-4 rounded-lg">Shop Now</button>
                </div>

                {/* Small images on the right */}
                <div className="absolute bottom-10 right-10 flex flex-col gap-4">
                    <img src="/path/to/small-image-1.png" alt="Nike Air Max" className="w-20 h-20 rounded-lg"/>
                    <img src="/path/to/small-image-2.png" alt="Nike Air Max" className="w-20 h-20 rounded-lg"/>
                </div>
            </div>
        </div>
    );
};

export default Hero;
