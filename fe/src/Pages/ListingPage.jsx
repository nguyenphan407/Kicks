import React, { useContext, useEffect, useState } from "react";
import LoginComponent from "../Components/LoginComponent";
import { images } from "../assets/assets";
import { ShopConText } from "../context/ShopContext";

const ListingPage = () => {
    const { products } = useContext(ShopConText);
    const { showFilter, setShowFilter } = useState(false);

    const [selectedSize, setSelectedSize] = useState(null);
    const outOfStockSizes = [39, 41, 44];
    const sizes = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];
    const handleSizeClick = (size) => {
        // Chỉ thay đổi kích thước được chọn nếu nó không nằm trong danh sách hết hàng
        if (!outOfStockSizes.includes(size)) {
            setSelectedSize(size);
        }
    };

    const [selectedColor, setSelectedColor] = useState(null);
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
    const handleColorClick = (color) => {
        setSelectedColor(color);
    };

    const [filterProducts, setFilterProducts] = useState([]);
    useEffect(() => {
        setFilterProducts(products);
    });
    return (
        <div className="container">
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
                        Sneakers made with your comfort in mind so you can put
                        all of your focus into your next session.
                    </p>
                </div>
            </div>
            <div className="flex gap-5 items-center justify-between my-6 xl:my-8 rounded-lg">
                {/* <h1 className="xl:text-4xl font-semibold font-rubik">
                        Life Style Shoes
                    </h1>
                    <p className="xl:text-[16px] text-secondary_black font-semibold">
                        122 items
                    </p> */}
                <button className="flex- flex flex-1 xl:flex-none  justify-between items-center px-4 py-2 rounded-lg bg-[#F4F2F2]">
                    <h2 className="font-semibold  text-[14px] xl:text-2xl xl:font-rubik text-secondary_black">
                        Filters
                    </h2>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="17"
                        viewBox="0 0 16 17"
                        fill="none"
                        className={`sm:hidden ${showFilter ? "" : "block"}`}
                    >
                        <path
                            d="M7.33333 12.5C7.14444 12.5 6.98622 12.436 6.85867 12.308C6.73067 12.1804 6.66667 12.0222 6.66667 11.8333C6.66667 11.6444 6.73067 11.4862 6.85867 11.3587C6.98622 11.2307 7.14444 11.1667 7.33333 11.1667H8.66667C8.85556 11.1667 9.014 11.2307 9.142 11.3587C9.26956 11.4862 9.33333 11.6444 9.33333 11.8333C9.33333 12.0222 9.26956 12.1804 9.142 12.308C9.014 12.436 8.85556 12.5 8.66667 12.5H7.33333ZM2.66667 5.83333C2.47778 5.83333 2.31956 5.76956 2.192 5.642C2.064 5.514 2 5.35556 2 5.16667C2 4.97778 2.064 4.81933 2.192 4.69133C2.31956 4.56378 2.47778 4.5 2.66667 4.5H13.3333C13.5222 4.5 13.6804 4.56378 13.808 4.69133C13.936 4.81933 14 4.97778 14 5.16667C14 5.35556 13.936 5.514 13.808 5.642C13.6804 5.76956 13.5222 5.83333 13.3333 5.83333H2.66667ZM4.66667 9.16667C4.47778 9.16667 4.31933 9.10267 4.19133 8.97467C4.06378 8.84711 4 8.68889 4 8.5C4 8.31111 4.06378 8.15267 4.19133 8.02467C4.31933 7.89711 4.47778 7.83333 4.66667 7.83333H11.3333C11.5222 7.83333 11.6804 7.89711 11.808 8.02467C11.936 8.15267 12 8.31111 12 8.5C12 8.68889 11.936 8.84711 11.808 8.97467C11.6804 9.10267 11.5222 9.16667 11.3333 9.16667H4.66667Z"
                            fill="black"
                        />
                    </svg>
                </button>

                <button className="flex flex-1 xl:flex-none xl: justify-between items-center rounded-lg xl:rounded-2xl  bg-[#F4F2F2]  px-4 py-2 xl:p-4 xl:w-[184px]">
                    <p className="text-[14px] xl:text-[16px] xl:font-rubik font-semibold xl:uppercase text-secondary_black">
                        Trending
                    </p>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 25"
                        fill="none"
                        className="xl:w-6 xl:h-6"
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
            </div>
            {/* Filters Section */}
            <div className="flex mt-8 ">
                {/* Sidebar Filters */}
                <div className="w-64 xl:w-[315px]">
                    <h2 className="font-semibold text-[14px] xl:text-2xl xl:font-rubik text-secondary_black">
                        Filters
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="17"
                            viewBox="0 0 16 17"
                            fill="none"
                            className={`hidden ${showFilter ? "" : "block"}`}
                        >
                            <path
                                d="M7.33333 12.5C7.14444 12.5 6.98622 12.436 6.85867 12.308C6.73067 12.1804 6.66667 12.0222 6.66667 11.8333C6.66667 11.6444 6.73067 11.4862 6.85867 11.3587C6.98622 11.2307 7.14444 11.1667 7.33333 11.1667H8.66667C8.85556 11.1667 9.014 11.2307 9.142 11.3587C9.26956 11.4862 9.33333 11.6444 9.33333 11.8333C9.33333 12.0222 9.26956 12.1804 9.142 12.308C9.014 12.436 8.85556 12.5 8.66667 12.5H7.33333ZM2.66667 5.83333C2.47778 5.83333 2.31956 5.76956 2.192 5.642C2.064 5.514 2 5.35556 2 5.16667C2 4.97778 2.064 4.81933 2.192 4.69133C2.31956 4.56378 2.47778 4.5 2.66667 4.5H13.3333C13.5222 4.5 13.6804 4.56378 13.808 4.69133C13.936 4.81933 14 4.97778 14 5.16667C14 5.35556 13.936 5.514 13.808 5.642C13.6804 5.76956 13.5222 5.83333 13.3333 5.83333H2.66667ZM4.66667 9.16667C4.47778 9.16667 4.31933 9.10267 4.19133 8.97467C4.06378 8.84711 4 8.68889 4 8.5C4 8.31111 4.06378 8.15267 4.19133 8.02467C4.31933 7.89711 4.47778 7.83333 4.66667 7.83333H11.3333C11.5222 7.83333 11.6804 7.89711 11.808 8.02467C11.936 8.15267 12 8.31111 12 8.5C12 8.68889 11.936 8.84711 11.808 8.97467C11.6804 9.10267 11.5222 9.16667 11.3333 9.16667H4.66667Z"
                                fill="black"
                            />
                        </svg>
                    </h2>

                    {/* Refine By */}
                    <div className="mb-6">
                        <h3 className="text-gray-700 font-semibold mb-2">
                            Refine By
                        </h3>
                        <div className="flex space-x-2">
                            <button className="px-3 py-1 rounded-full bg-blue-500 text-white font-semibold">
                                Mens
                            </button>
                            <button className="px-3 py-1 rounded-full bg-blue-500 text-white font-semibold">
                                Casual
                            </button>
                        </div>
                    </div>

                    {/* Size */}
                    <div className="mb-6">
                        <h3 className="text-gray-700 font-semibold mb-2">
                            Size
                        </h3>
                        <div className="grid grid-cols-4 gap-2">
                            {sizes.map((size) => (
                                <button
                                    key={size}
                                    onClick={() => handleSizeClick(size)}
                                    disabled={outOfStockSizes.includes(size)}
                                    className={`w-full py-2 rounded font-semibold ${
                                        selectedSize === size
                                            ? "bg-black text-white"
                                            : outOfStockSizes.includes(size)
                                              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                                              : "bg-gray-200 hover:bg-gray-300"
                                    }`}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Color Filter */}
                    <div className="mb-6">
                        <h3 className="text-gray-700 font-semibold mb-2">
                            Color
                        </h3>
                        <div className="grid grid-cols-5 gap-2">
                            {colors.map((color) => (
                                <div
                                    key={color.name}
                                    onClick={() => handleColorClick(color.name)}
                                    style={{
                                        backgroundColor: color.colorClass,
                                        border:
                                            selectedColor === color.name
                                                ? "2px solid white"
                                                : "none",
                                    }}
                                    className="w-12 h-12 rounded-lg cursor-pointer"
                                ></div>
                            ))}
                        </div>
                    </div>

                    {/* Category */}
                    <div className="mb-6">
                        <h3 className="text-gray-700 font-semibold mb-2">
                            Category
                        </h3>
                        <div className="flex flex-col space-y-1">
                            {[
                                "Casual shoes",
                                "Runners",
                                "Hiking",
                                "Sneaker",
                                "Basketball",
                                "Golf",
                                "Outdoor",
                            ].map((category) => (
                                <label
                                    key={category}
                                    className="flex items-center"
                                >
                                    <input type="checkbox" className="mr-2" />
                                    <span>{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="mb-6">
                        <h3 className="text-gray-700 font-semibold mb-2">
                            Gender
                        </h3>
                        <div className="flex flex-col space-y-1">
                            {["Men", "Women"].map((gender) => (
                                <label
                                    key={gender}
                                    className="flex items-center"
                                >
                                    <input type="checkbox" className="mr-2" />
                                    <span>{gender}</span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price */}
                    <div className="mb-6">
                        <h3 className="text-gray-700 font-semibold mb-2">
                            Price
                        </h3>
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            className="w-full"
                        />
                        <div className="flex justify-between text-gray-600 text-sm">
                            <span>$0</span>
                            <span>$1000</span>
                        </div>
                    </div>
                </div>

                {/* Product List Section */}
                <div className="flex-1 ml-8">
                    {/* Product list will go here */}
                </div>
            </div>
        </div>
    );
};

export default ListingPage;
