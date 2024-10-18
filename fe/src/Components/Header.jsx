import React from "react";

const Header = () => {
    return (
        <div>
            <div className="w-[1320px] h-24 px-[60px] py-8 bg-neutral-50 rounded-3xl justify-between items-center inline-flex">
                <div className="h-[19px] justify-start items-start gap-10 flex">
                    <div className="text-[#232321] text-base font-semibold font-['Rubik']">
                        🔥 New Drops
                    </div>
                    <div className="justify-start items-center gap-0.5 flex">
                        <div className="text-[#232321] text-base font-semibold font-['Rubik']">
                            Men
                        </div>
                        <div className="w-3 h-3 relative" />
                    </div>
                    <div className="justify-start items-center gap-0.5 flex">
                        <div className="text-[#232321] text-base font-semibold font-['Rubik']">
                            Women
                        </div>
                        <div className="w-3 h-3 relative" />
                    </div>
                </div>
                <div className="w-32 h-8 relative">
                    <div className="w-32 h-8 left-0 top-0 absolute"></div>
                </div>
                <div className="h-8 justify-end items-center gap-10 flex">
                    <div className="w-7 h-7 relative" />
                    <div className="w-6 h-6 relative" />
                    <div className="w-8 h-8 p-2.5 bg-[#ffa52f] rounded-[32px] flex-col justify-center items-center gap-2.5 inline-flex">
                        <div className="text-[#232321] text-base font-semibold font-['Open Sans']">
                            0
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
