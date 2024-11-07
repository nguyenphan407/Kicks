import React, { useState, useEffect } from "react";
import { reviews } from "../../assets/assets";
import ReviewCard from "../Review/ReviewCard";

const Reviews = () => {
    const [displayedReviews, setDisplayedReviews] = useState([]);

    useEffect(() => {
        const updateDisplayedReviews = () => {
            const isMobile = window.innerWidth < 1280;
            setDisplayedReviews(isMobile ? reviews.slice(0, 1) : reviews.slice(0, 3)); //1 review cho mobile và 3 review cho desktop
        };
        updateDisplayedReviews();
        window.addEventListener("resize", updateDisplayedReviews); // Lắng nghe sự thay đổi kích thước màn hình

        return () => window.removeEventListener("resize", updateDisplayedReviews); // Dọn dẹp sự kiện khi component unmount
    }, []);

    return (
        <div className="mb-6 xl:my-[128px]">
            <div className="py-[20px] xl:py-0 flex items-center justify-between xl:mb-12 font-rubik">
                <h2 className="xl:uppercase w-[150px] xl:w-[589px] font-semibold xl:text-medium text-[24px] leading-[95%]">
                    Reviews
                </h2>
                <button className="bg-primary_blue text-white xl:py-[15.5px] xl:px-8 px-4 py-[11.5px] rounded-lg font-medium text-[14px] transform transition duration-400 hover:bg-[#294acc] hover:scale-[1.02]">
                    SEE ALL
                </button>
            </div>
            <div className="flex flex-col xl:flex-row gap-4 justify-between">
                {displayedReviews.map((review) => (
                    <div key={review.review_id}>
                        <ReviewCard
                            rating={review.rating}
                            reviewTitle={review.review_title}
                            reviewText={review.review_text}
                            reviewDate={review.review_date}
                            image={review.image}
                            image_avatar={review.image_avatar}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Reviews;
