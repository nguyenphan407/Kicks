/* eslint-disable react/no-unescaped-entities */
// src/components/Hero.jsx
import React, { useState, useEffect } from "react";
import { images } from "../../assets/assets";

const Hero = () => {
   const [currentImageIndex, setCurrentImageIndex] = useState(0);

   useEffect(() => {
      const interval = setInterval(() => {
         setCurrentImageIndex((prevIndex) =>
            prevIndex === images.MainHeroImages.length - 1 ? 0 : prevIndex + 1
         );
      }, 2000); // Đổi ảnh mỗi 2 giây

      return () => clearInterval(interval); // Clear interval khi component unmount
   }, []);

   return (
      <div className="mb-6">
         <div className="text-[50px] lg:text-small mb-6 font-bold leading-[1] font-rubik text-center">
            <h1>
               DO IT <span className="w-full text-primary_blue">RIGHT</span>
            </h1>
         </div>

         <div className="w-full relative h-[382px]">
            <div className="z-10 absolute p-4 -left-[0] top-[200px] origin-top-left -rotate-90 bg-[#232321] rounded-bl-lg rounded-br-lg xl:rounded-bl-2xl xl:rounded-br-2xl inline-flex justify-center items-center">
               <span className="text-[#e7e7e3] text-xs font-semibold font-['Rubik']">
                  Nike product of the year
               </span>
            </div>

            {/* Main image slideshow */}
            {images.MainHeroImages.map((src, index) => (
               <img
                  key={index}
                  src={src}
                  alt="Nike Air Max"
                  className={`w-full h-[382px] object-cover rounded-3xl xl:rounded-[24px] absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                     index === currentImageIndex ? "opacity-100" : "opacity-0"
                  }`}
               />
            ))}

            <div className="absolute w-[235px] bottom-4 left-4 text-white">
               <h2 className="font-rubik font-semibold text-2xl">
                  NIKE AIR MAX
               </h2>
               <p className="text-sm font-semibold text-wrap">
                  Nike introducing the new air max for everyone's comfort
               </p>
               <button className="font-rubik font-medium bg-primary_blue px-4 py-2 xl:px-8 xl:py-[15.5px] mt-2 xl:mt-8 rounded-lg transform transition duration-400 hover:bg-[#294acc] hover:scale-[1.02]">
                  Shop Now
               </button>
            </div>

            <div className="absolute bottom-4 right-4 flex flex-col gap-2 xl:gap-4">
               <img
                  src={images.SecondHeroImage1}
                  alt="Nike Air Max"
                  className="rounded-[32px] w-16 h-16 border xl:w-20 xl:h-20 rounded-lg border-[#e7e7e3]"
               />
               <img
                  src={images.SecondHeroImage2}
                  alt="Nike Air Max"
                  className="rounded-[32px] w-16 h-16 border xl:w-20 xl:h-20 rounded-lg border-[#e7e7e3]"
               />
            </div>
         </div>
      </div>
   );
};

export default Hero;
