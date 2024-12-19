import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopConText } from "../../context/ShopContext";
import ProductCard from "../Product/ProductCard";
import { Link, NavLink } from "react-router-dom";
import { icons } from "../../assets/assets";

const NewDrops = () => {
  const { products, currency } = useContext(ShopConText);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [query, setQuery] = useState("");
  const debounceRef = useRef(null);

  useEffect(() => {
    // Clear timeout on component unmount
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  useEffect(() => {
    // Debounce search
    debounceRef.current = setTimeout(() => {
      if (!query.trim()) {
        setFilteredProducts(products.slice(0, 4));
        return;
      }

      const searchResults = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredProducts(searchResults.slice(0, 4));
    }, 300);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, products]);

  return (
    <div className="mt-[24px] xl:mt-[90px] mb-[128px] font-rubik">
      <div className="flex flex-col xl:flex-row xl:items-end justify-between mb-[24px] xl:mb-8 gap-4">
        <div className="flex flex-col gap-4 xl:gap-6">
          <h2 className="xl:uppercase w-[172px] xl:w-[589px] font-semibold xl:text-medium text-[24px] leading-[95%]">
            Don't miss out new drops
          </h2>

          {/* Search Input */}
          <div className="relative w-full xl:w-[300px]">
            <input
              type="text"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-primary_blue"
            />
            <img
              src={icons.SearchIcon}
              alt="Search"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
            />
          </div>
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
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.product_id}
            product={product}
            currency={currency}
          />
        ))}
        {filteredProducts.length === 0 && (
          <div className="col-span-2 xl:col-span-4 text-center py-8 text-gray-500">
            No products found matching your search.
          </div>
        )}
      </div>
    </div>
  );
};

export default NewDrops;
