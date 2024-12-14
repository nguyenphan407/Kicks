import React, { useContext, useEffect, useState } from "react";
import { ShopConText } from "../../context/ShopContext";
import ProductCard from "../Product/ProductCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion } from "framer-motion"; // Import Framer Motion

const MayLike = () => {
  const { products, recommendedProducts, currency } = useContext(ShopConText);
  const [index, setIndex] = useState(0);
  const [limitedProducts, setLimitedProducts] = useState([]);

  const itemsToShow = 4;

  useEffect(() => {
    setLimitedProducts(recommendedProducts.slice(index, index + itemsToShow));
  }, [recommendedProducts, index]);

  const handlePrev = () => {
    setIndex((prevIndex) => Math.max(prevIndex - itemsToShow, 0));
  };

  const handleNext = () => {
    setIndex((prevIndex) =>
      Math.min(prevIndex + itemsToShow, products.length - itemsToShow)
    );
  };

  return (
    <div className="font-rubik">
      <div className="flex items-end justify-between mb-[24px] xl:mb-8">
        <h2 className="w-[172px] xl:w-[589px] font-semibold xl:text-5xl text-[24px] leading-[95%]">
          You may also like
        </h2>
        <div className="flex gap-4">
          <button
            onClick={handlePrev}
            className="text-white bg-[#858582] p-2 rounded-lg hover:bg-gray-600"
            disabled={index === 0}
          >
            <FiChevronLeft size={20} color="black" />
          </button>
          <button
            onClick={handleNext}
            className="text-white bg-[#858582] p-2 rounded-lg hover:bg-gray-600"
            disabled={index + itemsToShow >= products.length}
          >
            <FiChevronRight size={20} color="black" />
          </button>
        </div>
      </div>
      <motion.div
        className="grid grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-[24px] xl:gap-y-0"
        key={index} // Add a key to trigger re-render when index changes
        initial={{ opacity: 0 }} // Initial state of the grid
        animate={{ opacity: 1 }} // Final state of the grid
        exit={{ opacity: 0 }} // Exit state of the grid
        transition={{ duration: 1 }} // Duration of the animation
      >
        {limitedProducts.map((product) => (
          <motion.div
            key={product.product_id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ProductCard product={product} currency={currency} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default MayLike;
