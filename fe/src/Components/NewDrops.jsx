/* eslint-disable react/no-unescaped-entities */
import React, { useContext } from "react";
import { ShopConText } from "../context/ShopContext";

const NewDrops = () => {
    const { products, currency } = useContext(ShopConText);

    return (
        <div className="mt-[24px] xl:mt-[90px] mb-[128px] font-rubik">
            <div className="flex items-end justify-between mb-[24px] xl:mb-8">
                <h2 className="xl:uppercase w-[172px] xl:w-[589px] font-semibold xl:text-medium text-[24px] leading-[95%]">
                    Don't miss out new drops
                </h2>
                <button className="bg-primary_blue text-white xl:py-[15.5px] xl:px-8 px-4 py-[11.5px] rounded-lg font-medium text-[14px]">
                    SHOP NEW DROPS
                </button>
            </div>
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-x-4 gap-y-[24px] xl:gap-y-0">
                {products &&
                    products.slice(0, 4).map((product) => (
                        <div
                            key={product.product_id}
                            className="flex flex-col items-center justify-center"
                        >
                            <div className="cursor-pointer relative bg-white rounded-2xl xl:rounded-[28px] truncate p-2 w-full h-[180px] xl:h-[350px] overflow-hidden mb-4">
                                <img
                                    src={product.image[0]}
                                    alt={product.name}
                                    className="object-cover rounded-2xl xl:rounded-[28px] w-full h-full overflow-hidden"
                                />
                                <span className="absolute top-2 left-2 bg-primary_blue text-white flex justify-center items-center text-xs font-semibold px-2 py-1 xl:px-4 xl:py-3 rounded-tl-xl rounded-br-xl xl:rounded-tl-3xl xl:rounded-br-3xl">
                                    New
                                </span>
                            </div>
                            <h3 className="cursor-pointer px-2 text-[16px] xl:text-[24px] font-semibold text-start">
                                {product.name}
                            </h3>
                            <button className="mt-2 xl:mt-4 bg-secondary_black px-4 py-2 xl:px-[82px] xl:py-4 text-center rounded-lg whitespace-nowrap transform transition duration-400 hover:bg-primary_blue hover:scale-[1.02] ">
                                <span className="text-white">
                                    View Product -{" "}
                                    <span className="text-secondary_yellow">
                                        {currency} {product.price}
                                    </span>
                                </span>
                            </button>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default NewDrops;
