import React, { useState } from "react";
import CategoryCard from "./CategoriesCard";
import { categories } from "../assets/assets";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { useEffect } from "react";

const Categories = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1280);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 1280);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? categories.length - 1 : prevIndex - 1
        );
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === categories.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="bg-secondary_black xl:pt-[90px] pb-[24px] xl:pb-0 font-rubik">
            <div className="flex items-end justify-between py-[24px] xl:py-0 xl:mb-16 container mx-auto">
                <h2 className="leading-[95%] text-white text-2xl xl:text-medium xl:uppercase font-semibold">
                    Categories
                </h2>
                <div className="flex gap-4">
                    <button
                        onClick={handlePrev}
                        className="text-white bg-[#858582] p-2 rounded-lg hover:bg-gray-600"
                    >
                        <FiChevronLeft size={20} color="black" />
                    </button>
                    <button
                        onClick={handleNext}
                        className="text-white bg-[#E7E7E3] p-2 rounded-lg hover:bg-gray-600"
                    >
                        <FiChevronRight size={20} color="black" />
                    </button>
                </div>
            </div>
            <div className="container">
                <div className="overflow-hidden max-h-[696px] xl:max-h-none">
                    <div
                        className="flex flex-col xl:flex-row transition-transform duration-500 ease-out"
                        style={{
                            // cuộn categories
                            transform: isMobile
                                ? `translateY(-${currentIndex * 25}%)` // chiều dọc đối với mobile
                                : `translateX(-${currentIndex * 50}%)`, // chiều ngang đối với desktop
                        }}
                    >
                        {categories.map((category, index) => (
                            <div
                                className=" xl:flex-shrink-0"
                                key={category.category_id}
                            >
                                <CategoryCard
                                    image={category.image}
                                    title={category.category_name}
                                    link={`/categories/${category.category_id}`}
                                    extraClasses={
                                        // tại vị trí đang đứng áp dụng bo góc theo responsive
                                        index === currentIndex
                                            ? "xl:rounded-tl-[64px] rounded-tl-3xl"
                                            : ""
                                    }
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Categories;
