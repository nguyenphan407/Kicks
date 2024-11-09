import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types"; // Import PropTypes

const ProductCard = ({ product, currency }) => {
  return (
    <Link
      to={`/productDetail/${product.product_id}`}
      className="flex flex-col items-center justify-center"
    >
      <div className="relative cursor-pointer bg-white rounded-2xl xl:rounded-[28px] p-2 w-full h-[180px] xl:h-[280px] 2xl:h-[350px] overflow-hidden mb-4">
        {/* Image Wrapper */}
        <div className="overflow-hidden rounded-2xl xl:rounded-[28px] w-full h-full">
          <img
            src={product.images[0]} // Sử dụng product.images thay vì product.image
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-300 ease-in-out hover:scale-105"
          />
        </div>
        <span className="absolute top-2 left-2 bg-primary_blue text-white flex justify-center items-center text-xs font-semibold px-2 py-1 xl:px-4 xl:py-3 rounded-tl-xl rounded-br-xl xl:rounded-tl-3xl xl:rounded-br-3xl">
          New
        </span>
      </div>
      <h3 className="font-rubik cursor-pointer px-2 text-[16px] xl:text-[24px] font-semibold text-center h-[48px] xl:h-[35px] overflow-hidden">
        {product.name}
      </h3>

      <button className="font-rubik mt-2 xl:mt-4 bg-secondary_black px-4 py-2 w-[100%] xl:py-4 text-center rounded-lg whitespace-nowrap transform transition duration-400 hover:bg-primary_blue hover:scale-[1.02] max-sm:text-xs">
        <span className="text-white ">
          View Product -{" "}
          <span className="text-secondary_yellow">
            {currency}
            {product.price}
          </span>
        </span>
      </button>
    </Link>
  );
};

// Define PropTypes for ProductCard
ProductCard.propTypes = {
  product: PropTypes.shape({
    product_id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired, // Cập nhật từ 'image' thành 'images'
  }).isRequired,
  currency: PropTypes.string.isRequired,
};

export default ProductCard;
