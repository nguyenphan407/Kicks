import React from "react";
import { images } from "../assets/assets";

const Hero = () => {
    return (
        <div>
            {/* slogan "DO IT RIGHT" */}
            <div className="text-small xxs:text-[55px] text-6xl sm:text-9xl md:text-[120px] lg:text-[130px] xl:text-[173px] 2xl:text-big font-bold my-7 leading-[1.15] font-rubik text-center">
                <h1>
                    DO IT <span className="text-primary_blue">RIGHT</span>
                </h1>
            </div>

            {/* Image and Product details */}
            <div className="w-full relative">
                {/* Note lại chỗ này đ hiểu tại sao top nó bị lệch :)) nên để 237 + 80 */}
                <div className="absolute p-2 sm:p-4 xl:p-6 -left-[0] top-[200px] xl:top-[317px] origin-top-left -rotate-90 bg-[#232321] rounded-bl-lg rounded-br-lg xl:rounded-bl-2xl xl:rounded-br-2xl inline-flex justify-center items-center">
                    <span className="text-[#e7e7e3] text-xs xl:text-base font-semibold font-['Rubik']">
                        Nike product of the year{" "}
                    </span>
                </div>

                {/* Main image */}
                <img
                    src={images.MainHeroImage}
                    alt="Nike Air Max"
                    className="w-full h-[382px] xl:h-[750px] object-cover rounded-3xl xl:rounded-[64px]"
                />

                <div className="absolute w-[235px] xl:w-[490px] bottom-4 xl:bottom-12 left-4 xl:left-12 text-white">
                    <h2 className="font-rubik font-semibold text-2xl xl:text-medium/normal">
                        NIKE AIR MAX
                    </h2>
                    <p className="text-sm xl:text-2xl font-semibold text-wrap">
                        Nike introducing the new air max for everyone comfort
                    </p>
                    <button className="font-rubik font-medium bg-primary_blue px-4 py-2 xl:px-8 xl:py-[15.5px] mt-2 xl:mt-8 rounded-lg transform transition duration-400 hover:bg-[#294acc] hover:scale-[1.02]">
                        Shop Now
                    </button>
                </div>

                {/* Small images on the right */}
                <div className="absolute bottom-4 right-4 xl:bottom-10 xl:right-10 flex flex-col gap-2 xl:gap-4">
                    <img
                        src={images.SecondHeroImage1}
                        alt="Nike Air Max"
                        className="rounded-[32px] w-16 h-16 border xl:w-40 xl:h-40 rounded-lg xl:rounded-[32px] xl:border-2 border-[#e7e7e3]"
                    />
                    <img
                        src={images.SecondHeroImage2}
                        alt="Nike Air Max"
                        className="rounded-[32px] w-16 h-16 border xl:w-40 xl:h-40 rounded-lg xl:rounded-[32px] xl:border-2 border-[#e7e7e3]"
                    />
                </div>
            </div>
        </div>
    );
};

export default Hero;
