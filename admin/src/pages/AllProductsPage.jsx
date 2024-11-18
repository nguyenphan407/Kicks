import React, { useState } from "react";
import Breadcrumbs from "../components/Features/Breadcrumbs";
import DateRangePicker from "../components/Features/DateRangePicker";


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
    return (
        <div>
            {/* Title */}
            <div className="flex justify-between relative items-end">
                <div>
                    <h1 className="font-rubik text-[24px] font-semibold text-black mb-1">
                        All Products
                    </h1>
                    <Breadcrumbs items={breadcrumbs} />
                </div>
                <div className="z-0">
                    <DateRangePicker onDateChange={handleDateChange} />
                </div>
            </div>
        </div>
    );
};

export default AllProductsPage;
