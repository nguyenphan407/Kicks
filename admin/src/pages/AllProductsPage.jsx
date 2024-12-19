import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import Breadcrumbs from "../components/Features/Breadcrumbs";
import { images, icons } from "../assets/assets";
import ProductCard from "@/components/Cart/ProductCard";
import Pagination from "@/components/Pagination";
import { ShopConText } from "@/context/ShopContext";
import { NavLink } from "react-router-dom";

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

    // Scroll to top when page changes
    useEffect(() => {
        setIsOpenCategories(true);
        window.scrollTo(0, 0);
    }, [filters.page]);

    // Framer Motion Variants
    const containerVariants = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                delayChildren: 0.2,
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 },
        },
    };

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
                    <NavLink
                        to="/addnewproduct"
                        className="bg-[#232321] flex items-center justify-between gap-2 px-[26px] py-[15.5px] rounded-[8px]
                        transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.005] active:opacity-90 hover:text-white active:scale-[97%]"
                    >
                        <img src={icons.AddIcon} alt="" />
                        <p className="font-rubik text-[14px] font-medium text-white">
                            ADD NEW PRODUCT
                        </p>
                    </NavLink>
                </div>
            </div>

            {/* Products */}
            <motion.section
                className="flex flex-col"
                initial="hidden"
                animate="visible"
                variants={containerVariants}
            >
                <div className="grid grid-cols-3 gap-[14px]">
                    {products.map((product) => {
                        return (
                            <ProductCard
                            key={product.product_id}
                                {...product}
                            />
                        );
                    })}
                </div>
            </motion.section>

            {/* Pagination */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Pagination />
            </motion.div>
        </div>
    );
};

export default AllProductsPage;
