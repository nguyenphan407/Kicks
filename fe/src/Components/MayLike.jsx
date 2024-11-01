import React, { useContext, useEffect, useState } from "react";
import { ShopConText } from "../context/ShopContext";
import ProductCard from "../Components/ProductCard";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const MayLike = () => {
  const { products, currency } = useContext(ShopConText);
  const [index, setIndex] = useState(0);
  const [limitedProducts, setLimitedProducts] = useState([]);

  const itemsToShow = 4;

  useEffect(() => {
    setLimitedProducts(products.slice(index, index + itemsToShow));
  }, [products, index]);

  const handlePrev = () => {
    setIndex((prevIndex) => Math.max(prevIndex - itemsToShow, 0));
  };

  const handleNext = () => {
    setIndex((prevIndex) =>
      Math.min(prevIndex + itemsToShow, products.length - itemsToShow)
    );
  };

  return (
    <div className="mt-[24px] xl:mt-[90px] mb-[128px] font-rubik">
      <div className="flex items-end justify-between mb-[24px] xl:mb-8">
        <h2 className="xl:uppercase w-[172px] xl:w-[589px] font-semibold xl:text-medium text-[24px] leading-[95%]">
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
            className="text-white bg-[#E7E7E3] p-2 rounded-lg hover:bg-gray-600"
            disabled={index + itemsToShow >= products.length}
          >
            <FiChevronRight size={20} color="black" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-[24px] xl:gap-y-0">
        {limitedProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            product={product}
            currency={currency}
          />
        ))}
      </div>
    </div>
  );
};

export default MayLike;
