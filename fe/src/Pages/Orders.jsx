import React, { useState, useEffect } from "react";
import { images } from "../assets/assets";

// Component hiển thị từng đơn hàng
const OrderCard = ({ order }) => (
    <div className="flex flex-col gap-2 p-6 border border-gray-200 rounded-lg bg-gray-50 relative">
        <h3 className="text-[20px] lg:text-[30px] font-semibold">{order.name}</h3>
        <div className="flex flex-row gap-6">
            <img
                src={order.image}
                alt={order.name}
                className="w-24 h-20 rounded-md"
            />
            <div className="flex flex-col">
                <p className="text-[16px] lg:text-[20px] text-gray-600 whitespace-pre-line">{order.description}</p>
                <p className="text-[16px] lg:text-[20px] text-gray-600">
                    Size {order.size} | Quantity {order.quantity}
                </p>
                <h4 className="text-[24px] text-blue-600 font-rubik">{order.price}</h4>
            </div>
        </div>
        <div>
            <button className="ml-auto px-16 lg:px-24 py-2 bg-black text-white flex justify-center items-center rounded-lg transform transition duration-400 hover:bg-primary_blue hover:scale-[1.003] hover:text-white active:scale-[99%]">
                Returns
            </button>
        </div>
    </div>
);

const Transport = ({ order }) => (
    <div className="flex flex-col gap-2 p-6 border border-gray-200 rounded-lg bg-gray-50 relative">
        <h3 className="text-[20px] lg:text-[30px] font-semibold">{order.name}</h3>
        <div className="flex flex-row gap-6">
            <img
                src={order.image}
                alt={order.name}
                className="w-24 h-20 rounded-md"
            />
            <div className="flex flex-col">
                <p className="text-[16px] lg:text-[20px] text-gray-600 whitespace-pre-line">{order.description}</p>
                <p className="text-[16px] lg:text-[20px] text-gray-600">
                    Size {order.size} | Quantity {order.quantity}
                </p>
                <h4 className="text-[24px] text-blue-600 font-rubik">{order.price}</h4>
            </div>
        </div>
        <div>
            <button className="ml-auto px-16 lg:px-24 py-2 bg-black text-white flex justify-center items-center rounded-lg transform transition duration-400 hover:bg-primary_blue hover:scale-[1.003] hover:text-white active:scale-[99%]">
                Received {/* Trạng thái của order_status sẽ là shipped */}
            </button>
        </div>
    </div>
);

const Returns = ({ order }) => (
    <div className="flex flex-col gap-2 p-6 border border-gray-200 rounded-lg bg-gray-50 relative">
        <h3 className="text-[20px] lg:text-[30px] font-semibold">{order.name}</h3>
        <div className="flex flex-row gap-6">
            <img
                src={order.image}
                alt={order.name}
                className="w-24 h-20 rounded-md"
            />
            <div className="flex flex-col">
                <p className="text-[16px] lg:text-[20px] text-gray-600 whitespace-pre-line">{order.description}</p>
                <p className="text-[16px] lg:text-[20px] text-gray-600">
                    Size {order.size} | Quantity {order.quantity}
                </p>
                <h4 className="text-[24px] text-blue-600 font-rubik">{order.price}</h4>
            </div>
        </div>
    </div>
);



// Hero Component (Slideshow)
const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.MainHeroImages.length - 1
          ? 0
          : prevIndex + 1
      );
    }, 2000); // Đổi ảnh mỗi 2 giây

    return () => clearInterval(interval); // Clear interval khi component unmount
  }, []);

  return (
    <div className="mb-6">
      <div className="text-small mb-6 font-bold leading-[1] font-rubik text-center">
        <h1>
          DO IT{" "}
          <span className="w-full text-primary_blue">RIGHT</span>
        </h1>
      </div>

      <div className="w-full relative h-[382px]">
        <div className="absolute p-4 -left-[0] top-[200px] origin-top-left -rotate-90 bg-[#232321] rounded-bl-lg rounded-br-lg xl:rounded-bl-2xl xl:rounded-br-2xl inline-flex justify-center items-center">
          <span className="text-[#e7e7e3] text-xs font-semibold font-['Rubik']">
            Nike product of the year
          </span>
        </div>

        {/* Main image slideshow */}
        {images.MainHeroImages.map((src, index) => (
          <img
            key={index}
            src={src}
            alt="Nike Air Max"
            className={`w-full h-[382px] object-cover rounded-3xl xl:rounded-[64px] absolute inset-0  transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex
                ? "opacity-100"
                : "opacity-0"
            }`}
          />
        ))}

        <div className="absolute w-[235px] bottom-4 left-4 text-white">
          <h2 className="font-rubik font-semibold text-2xl">
            NIKE AIR MAX
          </h2>
          <p className="text-sm font-semibold text-wrap">
            Nike introducing the new air max for everyone's comfort
          </p>
          <button className="font-rubik font-medium bg-primary_blue px-4 py-2 xl:px-8 xl:py-[15.5px] mt-2 xl:mt-8 rounded-lg transform transition duration-400 hover:bg-[#294acc] hover:scale-[1.02]">
            Shop Now
          </button>
        </div>

        <div className="absolute bottom-4 right-4 flex flex-col gap-2 xl:gap-4">
          <img
            src={images.SecondHeroImage1}
            alt="Nike Air Max"
            className="rounded-[32px] w-16 h-16 border xl:w-20 xl:h-20 rounded-lg border-[#e7e7e3]"
          />
          <img
            src={images.SecondHeroImage2}
            alt="Nike Air Max"
            className="rounded-[32px] w-16 h-16 border xl:w-20 xl:h-20 rounded-lg border-[#e7e7e3]"
          />
        </div>
      </div>
    </div>
  );
};

// lấy dữ liệu theo order_status
const OrdersPage = () => {
  const [activeTab, setActiveTab] = useState("Orders");

  const orders = [
    {
      id: 1,
      name: "DROPSET TRAINER SHOES",
      description: "Men's Road Running Shoes\nEnamel Blue/ University White",
      size: "10",
      quantity: "1",
      price: "$130.00",
      image: "path-to-blue-shoes-image",
    },
    {
      id: 2,
      name: "DROPSET TRAINER SHOES",
      description: "Men's Road Running Shoes\nEnamel Red/ University White",
      size: "10",
      quantity: "1",
      price: "$130.00",
      image: "path-to-red-shoes-image",
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "Orders":
        return (
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Danh sách đơn hàng */}
            <div className="flex-1 space-y-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        );
      case "Transport":
        return (
            <div className="flex flex-col lg:flex-row gap-4">
            {/* Danh sách đơn hàng */}
            <div className="flex-1 space-y-4">
              {orders.map((order) => (
                <Transport key={order.id} order={order} />
              ))}
            </div>
          </div>
        );
      case "Returns/Refunds":
        return (
            <div className="flex flex-col lg:flex-row gap-4">
            {/* Danh sách đơn hàng */}
            <div className="flex-1 space-y-4">
              {orders.map((order) => (
                <Returns key={order.id} order={order} />
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="container">
      <div className="flex space-x-8 border-b text-[14px] lg:text-[20px] border-gray-300">
        {["Orders", "Transport", "Returns/Refunds"].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 ${
              activeTab === tab
                ? "text-[16px] lg:text-[24px] border-b-2 border-black font-rubik"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="mt-6 flex flex-col lg:flex-row gap-6">
        {/* Nội dung các tab */}
        <div className="flex-1">
          {renderContent()}
        </div>

        {/* Hero Section */}
        <div className="w-full lg:w-1/3 bg-orange-100 p-6 rounded-lg text-center">
          <Hero />
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
