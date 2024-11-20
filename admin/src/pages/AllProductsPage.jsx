import React, { useState, useEffect, useContext } from "react";
import Breadcrumbs from "../components/Features/Breadcrumbs";
import { images, icons } from "../assets/assets";
import ProductCard from "@/components/Cart/ProductCard";
import Pagination from "@/components/Pagination";
import { ShopConText } from "@/context/ShopContext";

const AllProductsPage = () => {
    const breadcrumbs = [
        { label: "Home", link: "/" },
        { label: "All Products" },
    ];
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
    });

    const handleDateChange = (range) => {
        setDateRange(range);
        console.log("Selected Date Range:", range);
    };

    const { products, filters, setIsOpenCategories } = useContext(ShopConText);
    
    // Cuộn lên đầu trang khi trang thay đổi
    useEffect(() => {
        setIsOpenCategories(true);
        window.scrollTo(0, 0);
    }, [filters.page]); // Chạy lại khi `page` thay đổi


    return (
        <div>
            {/* Title */}
            <div className="flex justify-between relative items-end pb-6">
                <div>
                    <h1 className="font-rubik text-[24px] font-semibold text-black mb-1">
                        All Products
                    </h1>
                    <Breadcrumbs items={breadcrumbs} />
                </div>
                <div className="z-0">
                    <button
                        className="bg-[#232321] flex items-center justify-between gap-2 px-[26px] py-[15.5px] rounded-[8px]
                    transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.005] active:opacity-90 hover:text-white active:scale-[97%]"
                    >
                        <img src={icons.AddIcon} alt="" />
                        <p className="font-rubik text-[14px] font-medium text-white">
                            ADD NEW PRODUCT
                        </p>
                    </button>
                </div>
            </div>
            <section className="flex flex-col">
                <div className="grid grid-cols-3 gap-[14px]">
                {products.map((product) => {
                    return (
                        <ProductCard key={product.product_id} {...product} />
                    );
                })}
                </div>
                {/* Pagination */}
                <Pagination></Pagination>
            </section>
        </div>
    );
};

export default AllProductsPage;
