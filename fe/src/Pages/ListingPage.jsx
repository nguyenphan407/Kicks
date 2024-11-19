import React, { useContext, useEffect, useState } from "react";
import { images } from "../assets/assets";
import { ShopConText } from "../context/ShopContext";
import { FiChevronUp, FiChevronDown } from "react-icons/fi";
import ProductCard from "../Components/Product/ProductCard";
import Pagination from "../Components/Pagination";
import { FaSearch } from "react-icons/fa";
import { TiDelete } from "react-icons/ti";

const ListingPage = () => {
  // State hiển thị filer
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const { products, filters } = useContext(ShopConText);

  // Đặt lại filter
  const resetFilters = () => {
    setSelectedColors([]);
    setPrice(0);
    setFilterProducts(products);
    setSelectedCategories([]);
    setSelectedGender([]);
  };

  // Hiển thị hoặc ẩn bộ lọc
  const handleShowFilter = (showFilter) => {
    setShowFilter(!showFilter);
  };

  // Lựa chọn màu
  const [selectedColors, setSelectedColors] = useState([]);
  const colors = [
    { name: "Dark Blue", colorClass: "#4A69E2" },
    { name: "Bright Orange", colorClass: "#FFA52F" },
    { name: "Black", colorClass: "#232321" },
    { name: "Dark Green", colorClass: "#234D41" },
    { name: "Charcoal Gray", colorClass: "#353336" },
    { name: "Light Orange", colorClass: "#F08155" },
    { name: "Light Gray", colorClass: "#C9CCC6" },
    { name: "Dark Gray", colorClass: "#677282" },
    { name: "Dark Brown", colorClass: "#925513" },
    { name: "Light Brown", colorClass: "#BB8056" },
  ];

  // Xử lý lựa chọn màu
  const handleColorClick = (colorName) => {
    setSelectedColors((prevSelectedColors) => {
      if (prevSelectedColors.includes(colorName)) {
        return prevSelectedColors.filter((color) => color !== colorName);
      } else {
        return [...prevSelectedColors, colorName];
      }
    });
  };

  // State lưu giá, danh mục, giới tính
  const [price, setPrice] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedGender, setSelectedGender] = useState([]);

  // Bảng ánh xạ tên danh mục thành id
  const categoryNameToId = {
    "Casual shoes": "1",
    Runners: "2",
    Hiking: "3",
    Sneaker: "4",
    Basketball: "5",
    Golf: "6",
    Outdoor: "7",
  };

  // Cập nhật lựa chọn danh mục
  const handleCategoryChange = (index) => {
    setSelectedCategories((prevSelectedCategories) => {
      if (prevSelectedCategories.includes(index)) {
        return prevSelectedCategories.filter((item) => item !== index);
      } else {
        return [...prevSelectedCategories, index];
      }
    });
  };

  // Cập nhật lựa chọn giới tính
  const handleGenderChange = (gender) => {
    setSelectedGender((prevSelectedGender) => {
      if (prevSelectedGender.includes(gender)) {
        return prevSelectedGender.filter((item) => item !== gender);
      } else {
        return [...prevSelectedGender, gender];
      }
    });
  };

  // State cho tuỳ chọn sắp xếp
  const [selected, setSelected] = useState("Default");
  const [isOpen, setIsOpen] = useState(false);
  const options = ["Default", "a → z", "z → a", "Low to high", "High to low"];

  // Các state để điều khiển mở/đóng dropdown
  const [isOpenRefine, setIsOpenRefine] = useState(true);
  const toggleDropdownRefine = () => setIsOpenRefine(!isOpenRefine);

  const [isOpenSize, setIsOpenSize] = useState(true);
  const toggleDropdownSize = () => setIsOpenSize(!isOpenSize);

  const [isOpenColor, setIsOpenColor] = useState(true);
  const toggleDropdownColor = () => setIsOpenColor(!isOpenColor);

  const [isOpenCategories, setIsOpenCategories] = useState(true);
  const toggleDropdownCategories = () => setIsOpenCategories(!isOpenCategories);

  const [isOpenGender, setIsOpenGender] = useState(true);
  const toggleDropdownGender = () => setIsOpenGender(!isOpenGender);

  const [isOpenPrice, setIsOpenPrice] = useState(true);
  const toggleDropdownPrice = () => setIsOpenPrice(!isOpenPrice);

  // Cuộn lên đầu trang khi trang thay đổi
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [filters.page]); // Chạy lại khi `page` thay đổi

  // Áp dụng bộ lọc
  const applyFilter = () => {
    let productsCopy = products.slice();

    if (selectedCategories.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        selectedCategories.includes(item.category_id)
      );
    }
    if (selectedColors.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        selectedColors.includes(item.color)
      );
    }
    if (selectedGender.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        selectedGender.includes(item.gender)
      );
    }
    if (price > 0) {
      productsCopy = productsCopy.filter((item) => item.price <= price);
    }

    setFilterProducts(productsCopy);
  };

  // Thiết lập danh sách sản phẩm khi dữ liệu thay đổi
  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  // Áp dụng bộ lọc khi lựa chọn thay đổi
  useEffect(() => {
    applyFilter();
  }, [selectedCategories, selectedColors, price]);

  // Sắp xếp sản phẩm
  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (selected) {
      case "Low to high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "High to low":
        setFilterProducts(fpCopy.sort((a, b) => b.price - a.price));
        break;
      case "a -> z":
        setFilterProducts(fpCopy.sort((a, b) => a.name.localeCompare(b.name)));
        break;
      case "z -> a":
        setFilterProducts(fpCopy.sort((a, b) => b.name.localeCompare(a.name)));
        break;
      default:
        applyFilter();
        break;
    }
  };
  // Gọi hàm sortProduct khi `selected` thay đổi
  useEffect(() => {
    sortProduct();
  }, [selected]);

  return (
    <div className="container">
      {/* Thumbnail */}
      <div className="mt-4 lg:mt-[30px] xl:mt-[50px] relative">
        <img
          className="w-full object-cover h-[149px] lg:h-[250px] xl:h-[395px] rounded-2xl lg:rounded-[30px] xl:rounded-[64px]"
          src={images.Thumbnail}
          alt=""
        />
        <div className="absolute top-10 lg:top-70px xl:top-[102px] left-4 lg:left-7 xl:left-10 flex-1 max-w-[213px] xl:max-w-[490px] text-white">
          <p className="text-xs xl:text-2xl font-normal xl:font-semibold">
            Limited time only
          </p>
          <h2 className="font-rubik font-semibold text-xl xl:text-[74px] leading-[normal]">
            Get 30% off
          </h2>
          <p className="font-normal text-[10px] lg:text-[15px] xl:text-xl">
            Sneakers made with your comfort in mind so you can put all of your
            focus into your next session.
          </p>
        </div>
      </div>

      {/* div bọc cụm filter và productList */}
      <div className="flex gap-5 flex-col xl:flex-row mt-6 xl:mt-8">
        {/* div bọc sort và filter */}
        <div className="flex flex-row-reverse items-start justify-between xl:justify-start xl:flex-col">
          {/* Sidebar Sort */}
          <div className="relative items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between bg-[#F4F2F2] px-4 py-2 xl:p-4 font-semibold rounded-lg lg:rounded-2xl lg:font-rubik w-[160px] lg:w-[184px] text-secondary_black text-[14px] lg:text-[16px]  
                        hover:bg-[#cccccc] transition-all xl:uppercase duration-300 ease-in-out"
            >
              <span>{selected}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 25"
                fill="none"
                className="w-5 h-5 ml-2"
              >
                <path
                  d="M5.25 9.5L12 16.25L18.75 9.5"
                  stroke="#232321"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            {isOpen && (
              <ul className="absolute bg-[#F4F2F2] text-secondary_black w-[160px] lg:w-[184px] mt-[5px] lg:mt-[10px] rounded-lg lg:rounded-2xl z-10">
                {options.map((option, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setSelected(option);
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 hover:bg-[#d0d0d0] cursor-pointer font-rubik font-semibold"
                  >
                    {option}
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Sidebar Filter */}
          <div className="xl:mt-6 xl:w-[315px]">
            <div
              className="flex w-[160px] items-center justify-between xl:mb-6 px-4 py-2 lg:px-0 lg:py-0 rounded-lg lg:rounded-none bg-[#F4F2F2] lg:bg-transparent"
              onClick={() => setShowFilter(!showFilter)}
            >
              <h2 className="font-semibold text-[14px] xl:text-2xl xl:font-rubik text-secondary_black">
                Filters
              </h2>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                className={`block lg:hidden`}
              >
                <path
                  d="M7.33333 12.5C7.14444 12.5 6.98622 12.436 6.85867 12.308C6.73067 12.1804 6.66667 12.0222 6.66667 11.8333C6.66667 11.6444 6.73067 11.4862 6.85867 11.3587C6.98622 11.2307 7.14444 11.1667 7.33333 11.1667H8.66667C8.85556 11.1667 9.014 11.2307 9.142 11.3587C9.26956 11.4862 9.33333 11.6444 9.33333 11.8333C9.33333 12.0222 9.26956 12.1804 9.142 12.308C9.014 12.436 8.85556 12.5 8.66667 12.5H7.33333ZM2.66667 5.83333C2.47778 5.83333 2.31956 5.76956 2.192 5.642C2.064 5.514 2 5.35556 2 5.16667C2 4.97778 2.064 4.81933 2.192 4.69133C2.31956 4.56378 2.47778 4.5 2.66667 4.5H13.3333C13.5222 4.5 13.6804 4.56378 13.808 4.69133C13.936 4.81933 14 4.97778 14 5.16667C14 5.35556 13.936 5.514 13.808 5.642C13.6804 5.76956 13.5222 5.83333 13.3333 5.83333H2.66667ZM4.66667 9.16667C4.47778 9.16667 4.31933 9.10267 4.19133 8.97467C4.06378 8.84711 4 8.68889 4 8.5C4 8.31111 4.06378 8.15267 4.19133 8.02467C4.31933 7.89711 4.47778 7.83333 4.66667 7.83333H11.3333C11.5222 7.83333 11.6804 7.89711 11.808 8.02467C11.936 8.15267 12 8.31111 12 8.5C12 8.68889 11.936 8.84711 11.808 8.97467C11.6804 9.10267 11.5222 9.16667 11.3333 9.16667H4.66667Z"
                  fill="black"
                />
              </svg>
            </div>
            <div className="mx-4 xl:mx-0 mb-4">
              <div className="w-full h-full px-4 py-2 rounded-lg border border-secondary_black flex justify-center items-center gap-2.5">
                <div className="w-4 h-4 relative">
                  <FaSearch />
                </div>
                <div className="flex-1 text-[#1C1C1A] text-xl font-normal font-rubik tracking-[0.25px]">
                  Search products
                </div>
                <div className="w-4 h-4 relative">
                  <TiDelete />
                </div>
              </div>
            </div>
            {/* Filter */}
            <div
              className={`${showFilter ? "" : "hidden lg:block"} absolute xl:relative transition-all lg:relative top-0 left-0 right-0 z-10 lg:z-0 xl:bg-transparent bg-[#E7E7E3]`}
            >
              {/* Filter mobile */}
              <div className="block lg:hidden bg-white xl:bg-transparent">
                <div
                  className={`flex items-center justify-between p-4`}
                  onClick={() => setShowFilter(!showFilter)}
                >
                  <h3 className="font-semibold text-xl font-rubik text-secondary_black">
                    Filters
                  </h3>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M6.75781 17.2428L12.0008 11.9998M17.2438 6.75684L11.9998  11.9998M11.9998 11.9998L6.75781 6.75684M12.0008 11.9998L17.2438 17.2428"
                      stroke="black"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              {/* Refine By */}
              <div className="mt-4 lg:mt-0 mb-4 xl:mb-6 mx-4 xl:mx-0">
                <div className="mb-6">
                  {/* Refine By Header */}
                  <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={toggleDropdownRefine}
                  >
                    <h3 className="text-secondary_black text-[16px] font-semibold font-rubik uppercase">
                      Refine By
                    </h3>
                    <FiChevronUp
                      className={`xl:w-6 xl:h-6 transform transition-transform duration-300 ${
                        isOpenRefine ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  {/* Buttons */}
                  {isOpenRefine && (
                    <div className="flex gap-4 mt-4">
                      <button className="font-rubik text-xs w-[63px] h-[38px] px-3 py-1 rounded-xl bg-primary_blue text-white font-semibold">
                        Mens
                      </button>
                      <button className="font-rubik text-xs w-[63px] h-[38px] px-3 py-1 rounded-xl bg-primary_blue text-white font-semibold">
                        Casual
                      </button>
                    </div>
                  )}
                </div>
              </div>
              {/* Color Filter */}
              <div className="mb-4 xl:mb-6 mx-4 xl:mx-0">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={toggleDropdownColor}
                >
                  <h3 className="text-secondary_black xl:text-[16px] font-semibold font-rubik xl:uppercase">
                    Color
                  </h3>
                  <FiChevronUp
                    className={`xl:w-6 xl:h-6 transform transition-transform duration-300 ${isOpenColor ? "rotate-180" : ""}`}
                  />
                </div>
                {isOpenColor && (
                  <div className="grid grid-cols-5 gap-2 mt-4">
                    {colors.map((color) => (
                      <div
                        key={color.name}
                        onClick={() => handleColorClick(color.name)}
                        style={{
                          backgroundColor: color.colorClass,
                          border: selectedColors.includes(color.name)
                            ? "2px solid white"
                            : "none",
                        }}
                        className="w-12 h-12 rounded-lg cursor-pointer"
                      ></div>
                    ))}
                  </div>
                )}
              </div>
              {/* Categories */}
              <div className="mb-4 xl:mb-6 mx-4 xl:mx-0">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={toggleDropdownCategories}
                >
                  <h3 className="text-secondary_black xl:text-[16px] font-semibold font-rubik xl:uppercase">
                    Categories
                  </h3>
                  <FiChevronUp
                    className={`xl:w-6 xl:h-6 transform transition-transform duration-300 ${
                      isOpenCategories ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {isOpenCategories && (
                  <div className="flex flex-col gap-2 mt-4">
                    {[
                      "Casual shoes",
                      "Runners",
                      "Sandals",
                      "Hiking",
                      "Sneaker",
                      "Basketball",
                      "Golf",
                      "Outdoor",
                    ].map((category, index) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-4 w-4 h-4 outline-none border-2 border-gray-400 rounded-sm accent-[#1F1A24]"
                          checked={selectedCategories.includes(index + 1)}
                          onChange={() => handleCategoryChange(index + 1)}
                        />
                        <span className="text-secondary_black text-x[16px] font-semibold">
                          {category}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Gender */}
              <div className="mb-4 xl:mb-6 mx-4 xl:mx-0">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={toggleDropdownGender}
                >
                  <h3 className="text-secondary_black xl:text-[16px] font-semibold font-rubik xl:uppercase">
                    Gender
                  </h3>
                  <FiChevronUp
                    className={`xl:w-6 xl:h-6 transform transition-transform duration-300 ${
                      isOpenGender ? "rotate-180" : ""
                    }`}
                  />
                </div>
                {isOpenGender && (
                  <div className="flex flex-col gap-2 mt-4">
                    {["Men", "Women"].map((gender) => (
                      <label key={gender} className="flex items-center">
                        <input
                          type="checkbox"
                          className="mr-4 w-4 h-4 outline-none border-2 border-gray-400 rounded-sm accent-[#1F1A24]"
                          checked={selectedGender.includes(gender)}
                          onChange={() => handleGenderChange(gender)}
                        />
                        <span className="text-secondary_black text-x[16px] font-semibold">
                          {gender}
                        </span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Price */}
              <div className="mb-4 xl:mb-6 mx-4 xl:mx-0">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={toggleDropdownPrice}
                >
                  <h3 className="text-secondary_black xl:text-[16px] font-semibold font-rubik xl:uppercase">
                    Price
                  </h3>
                  <FiChevronUp
                    className={`xl:w-6 xl:h-6 transform transition-transform duration-300 ${isOpenPrice ? "rotate-180" : ""}`}
                  />
                </div>
                {isOpenPrice && (
                  <div className="w-full flex flex-col items-center mt-4">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="10"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="w-full h-1 bg-black rounded-lg appearance-none cursor-pointer accent-primary_blue"
                      style={{ accentColor: "blue" }}
                    />
                    <div className="flex justify-between w-full mt-2">
                      <span className="text-[14px] text-secondary_black font-semibold">
                        ${price}
                      </span>
                      <span className="text-[14px] text-secondary_black font-semibold">
                        $1000
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Apply & Reset cho mobile */}
              <div className="block lg:hidden border-b-2 border-black rounded-2xl">
                <div className="flex justify-between items-center mx-4 xl:mx-0 mb-10  flex-1 gap-4">
                  <button
                    className="flex-1 px-4 py-2 border border-black text-[#232321] rounded-lg font-rubik font-medium text-xs"
                    onClick={resetFilters}
                  >
                    RESET
                  </button>
                  <button
                    className="flex-1 px-4 py-2 border border-black bg-black text-white rounded-lg font-rubik font-medium text-xs"
                    onClick={() => setShowFilter(!showFilter)}
                  >
                    APPLY
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col flex-1">
          {/* Product List Section */}
          <div className=" grid grid-cols-2 lg:grid-cols-3 gap-4">
            {filterProducts.map((item, index) => (
              <ProductCard key={index} product={item} currency="$" />
            ))}
          </div>

          {/* Pagination */}
          <Pagination></Pagination>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
