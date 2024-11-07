import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { FiArrowRight } from "react-icons/fi"; // Biểu tượng mũi tên phải cho nút xem thêm

const CategoryCard = ({ image, title, link, extraClasses }) => {
    return (
        <div className={`relative bg-[#F6F6F6] overflow-hidden flex flex-col items-start ${extraClasses}`}>
            <img
                src={image}
                alt={title}
                className="h-[348px] w-full xl:w-[660px] xl:h-[600px] object-cover"
            />
            <h3 className="absolute left-4 bottom-4 xl:left-12 xl:bottom-[30px] text-2xl xl:text-4xl font-semibold xl:uppercase">{title}</h3>
            <Link
                to={link}
                className="absolute right-4 bottom-4 xl:right-[30px] xl:bottom-[30px] bg-black p-2 rounded-lg text-white flex items-center justify-center hover:bg-[#3d3d3d]"
            >
                <FiArrowRight size={20} />
            </Link>
        </div>
    );
};

CategoryCard.propTypes = {
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    extraClasses: PropTypes.string.isRequired,
};

export default CategoryCard;
