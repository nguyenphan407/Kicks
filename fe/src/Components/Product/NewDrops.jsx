import React, { useContext, useEffect, useState } from "react";
import { ShopConText } from "../../context/ShopContext";
import ProductCard from "../Product/ProductCard";
import { NavLink } from "react-router-dom";

const NewDrops = () => {
  const { products, currency } = useContext(ShopConText);
  const [displayedProducts, setDisplayedProducts] = useState([]);

  useEffect(() => {
    setDisplayedProducts(products.slice(0, 4));
  }, [products]);

  return (
    <div className="mt-[24px] xl:mt-[90px] mb-[128px] font-rubik">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-[24px] xl:mb-8 gap-4">
        <div className="flex flex-col gap-4 xl:gap-6">
          <h2 className="xl:uppercase w-[172px] xl:w-[589px] font-semibold xl:text-medium text-[24px] leading-[95%]">
            Don't miss out new drops
          </h2>
        </div>

        <NavLink to="/listing" className="items-center">
          <button
            className="w-full xl:w-auto bg-primary_blue text-white xl:py-[15.5px] xl:px-8 px-4 py-[11.5px] rounded-lg font-medium text-[14px] 
                    transform transition duration-400 hover:bg-[#294acc] hover:scale-[1.02]"
          >
            SHOP NEW DROPS
          </button>
        </NavLink>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-[24px] xl:gap-y-0">
        {displayedProducts.map((product) => (
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

export default NewDrops;
