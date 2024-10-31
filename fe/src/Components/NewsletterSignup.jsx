import React from "react";
import { icons } from "../assets/assets"

const NewsletterSignup = () => {
    const onSubmitHandler = (e) => {
        // e.preventDefault();
    }

    return (
        <div className="flex flex-col xl:flex-row justify-between bg-primary_blue h-[340px] xl:h-[545px] xl:py-14 xl:px-[72px] p-4 rounded-tl-[24px] rounded-tr-[24px] xl:rounded-[48px]">
            <div className="xl:w-[510px]">
                <div className="mb-6 xl:mb-8">
                    <h2 className="font-rubik text-white xl:mb-4 font-semibold xl:uppercase text-[32px] xl:text-5xl">
                        Join our KicksPlus Club & get 15% off
                    </h2>
                    <p className="font-semibold text-[16px] xl:text-xl text-white ">
                        Sign up for free! Join the community.
                    </p>
                </div>

                <form onSubmit={onSubmitHandler} className="flex items-center gap-1">
                    <input
                        type="email"
                        placeholder="Email address"
                        className="w-[100%] xl:w-[342px] py-[10px] xl:py-[14.5px] px-4 rounded-lg border bg-transparent border-white focus:outline-none focus:border-secondary_black"
                        required
                    />
                    
                    <button
                        type="submit"
                        className="font-rubik bg-secondary_black text-white text-14px font-medium py-[11.5px] xl:py-[15.5px] px-4 xl:px-6 rounded-lg "
                    >
                        SUBMIT
                    </button>
                </form>
            </div>
            <img className="lg:mr-[30px] 2xl:mr-[112px] mt-8 xl:mt-[80px] h-[48px] w-[191px] xl:h-[88px] xl:w-[351px]" src={icons.LogoIconWhite} alt="" />
        </div>
    );
};

export default NewsletterSignup;
