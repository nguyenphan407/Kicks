import React from "react";
import PropTypes from "prop-types";

const ReviewCard = ({
    rating,
    reviewTitle,
    reviewText,
    reviewDate,
    image,
    image_avatar,
}) => {
    return (
        <div className="bg-[#FAFAFA] rounded-2xl xl:rounded-[32px] xl:w-full xl:max-w-[428px] h-[339px] xl:h-[400px] 2xl:h-[500px] overflow-hidden ">
            <div className="p-4 xl:p-8">
                <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex-1 flex flex-col gap-2">
                        <h3 className="font-semibold text-secondary_black text-xl xl:text-2xl font-rubik">
                            {reviewTitle}
                        </h3>
                        <p className="text-gray-600 text-sm xl:text-[16px] font-normal">
                            {reviewText}
                        </p>
                    </div>
                    <img
                        src={image_avatar}
                        alt="avatar-user"
                        className="object-cover w-16 h-16 rounded-full"
                    />
                </div>
                <div className="flex items-center">
                    {[...Array(rating)].map((_, index) => (
                        <svg
                            key={index}
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="text-yellow-500 xl:w-6 xl:h-6 w-4 h-4"
                        >   
                            <g id="ic:round-star-rate">
                                <path
                                    id="Vector"
                                    d="M14.4297 10L12.9597 5.16001C12.6697 4.21001 11.3297 4.21001 11.0497 5.16001L9.56971 10H5.11971C4.14971 10 3.74971 11.25 4.53971 11.81L8.17972 14.41L6.74971 19.02C6.45971 19.95 7.53972 20.7 8.30972 20.11L11.9997 17.31L15.6897 20.12C16.4597 20.71 17.5397 19.96 17.2497 19.03L15.8197 14.42L19.4597 11.82C20.2497 11.25 19.8497 10.01 18.8797 10.01H14.4297V10Z"
                                    fill="#FFA52F"
                                />
                            </g>
                        </svg>
                    ))}
                    <span className="text-secondary_black text-[16px] font-semibold ml-1">
                        {rating}.0
                    </span>
                </div>
            </div>
            <img
                src={image}
                alt="review-image"
                className="w-full h-full object-cover"
            />
        </div>
    );
};

ReviewCard.propTypes = {
    image: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired, // Sửa "string" thành "number"
    reviewTitle: PropTypes.string.isRequired,
    reviewText: PropTypes.string.isRequired,
    reviewDate: PropTypes.string.isRequired,
    image_avatar: PropTypes.string.isRequired,
};

export default ReviewCard;
