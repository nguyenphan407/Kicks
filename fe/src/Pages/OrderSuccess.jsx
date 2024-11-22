import React from 'react';
import { CheckCircle, Copy, ChevronLeft, Download, FileText, ExternalLink } from 'lucide-react';

const OrderSuccess = () => {
    const [copied, setCopied] = React.useState(false);
    const searchParams = new URLSearchParams(window.location.search);

    const productDetails = JSON.parse(localStorage.getItem("item"))

    const orderDetails = {
        code: searchParams.get('code'),
        id: searchParams.get('id'),
        status: searchParams.get('status'),
        orderCode: searchParams.get('orderCode'),
        cancel: searchParams.get('cancel') === 'true'
    };

    let productImage;
    let productFile;

    //   if (productDetails.productName === "Khóa Học Start"){
    //     productImage = "https://res.cloudinary.com/dlc1n2y1f/image/upload/v1731764884/effortless-english-oec-800x800_pl5p7z.jpg"
    //     productFile = "https://res.cloudinary.com/dlc1n2y1f/image/upload/fl_attachment:v1731764884/effortless-english-oec-800x800_pl5p7z.jpg"
    //   }
    //   else if (productDetails.productName === "Khóa Học Advanced"){
    //     productImage = "https://res.cloudinary.com/dlc1n2y1f/image/upload/v1731764885/effortless-english-rec-800x800_ixojqm.jpg"
    //     productFile = "https://res.cloudinary.com/dlc1n2y1f/image/upload/fl_attachment:v1731764885/effortless-english-rec-800x800_ixojqm.jpg"
    //   }
    //   else {
    //     productImage = "https://res.cloudinary.com/dlc1n2y1f/image/upload/v1731764885/effortless-english-pec-800x800_madluv.jpg"
    //     productFile = "https://res.cloudinary.com/dlc1n2y1f/image/upload/fl_attachment:v1731764885/effortless-english-pec-800x800_madluv.jpg"
    //   }

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="container font-sans">
            <div className=" mx-auto py-8">
                <div className="lg:flex sm:flex-grow lg:space-x-8 lg:space-y-0 space-y-5">
                    {/* Order Success Card */}
                    <div className="flex bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/20">
                        <div className="flex flex-col items-center relative">
                            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce-small">
                                <CheckCircle className="w-12 h-12 md:w-14 md:h-14 text-white" />
                            </div>

                            <h1 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-500 mb-2 text-center">
                                Order placed successfully!
                            </h1>

                            <p className="text-sm md:text-base text-gray-600 text-center mb-8 max-w-sm">
                                Thank you for your order. Your order will be prepared right away.
                            </p>

                            <div className="w-full space-y-4">
                                <div className="group bg-white/80 p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="flex-col justify-between items-center flex-wrap gap-2">
                                        <span className="text-sm md:text-base text-gray-600 font-bold">Order Code:</span>
                                        <div className="flex justify-between items-center gap-2">
                                            <span className="text-sm md:text-base font-medium break-all">
                                                {orderDetails.orderCode}
                                            </span>
                                            <button
                                                onClick={() => copyToClipboard(orderDetails.orderCode)}
                                                className="text-blue-500 hover:text-blue-600 hover:scale-110 transition-transform duration-200 flex-shrink-0"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="group bg-white/80 p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="flex-col justify-between items-center flex-wrap gap-2">
                                        <span className="text-sm md:text-base text-gray-600 font-bold">Transaction Reference:</span>
                                        <div className="flex justify-between items-center gap-2">
                                            <span className="text-sm md:text-base font-medium break-all">
                                                {orderDetails.id}
                                            </span>
                                            <button
                                                onClick={() => copyToClipboard(orderDetails.id)}
                                                className="text-blue-500 hover:text-blue-600 hover:scale-110 transition-transform duration-200 flex-shrink-0"
                                            >
                                                <Copy className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                <div className="group bg-white/80 p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm md:text-base text-gray-600 font-bold">Status:</span>
                                        <span className="px-4 py-1.5 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full text-sm font-medium shadow-sm">
                                            {orderDetails.status}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {copied && (
                                <div className="mt-4 text-sm text-emerald-600 bg-emerald-50 px-4 py-2 rounded-full animate-fade-in">
                                    ✨ Đã sao chép vào clipboard!
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Details Card */}
                    <div className="relative flex-grow bg-white/70 backdrop-blur-md rounded-2xl shadow-xl p-6 md:p-8 border border-white/20">
                        <div className="relative">

                            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6">
                                Order Details
                            </h2>

                            <div className="space-y-6">
                                {/* Product Image & Basic Info */}
                                {/* <div className="bg-white/80 rounded-xl border border-gray-100 overflow-hidden">
                  <img 
                    src={productImage} 
                    alt={productDetails.name}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg text-gray-800">
                      {productDetails.productName}
                    </h3>
                    <p className="text-gray-600 text-sm mt-2">
                      {productDetails.description + " thành công"}
                    </p>
                    <div className="mt-2 text-lg font-semibold text-blue-600">
                      {productDetails.price +'đ'}
                    </div>
                  </div>
                </div> */}
                            </div>

                        </div>
                        {/* Back Button */}
                        <div className=" flex justify-center mt-8 max-w-md mx-auto">
                            <button
                                onClick={() => {
                                    localStorage.removeItem("item")
                                    window.location.href = '/'
                                }}
                                className="w-full lg:w-[362px] bg-secondary_black flex justify-between lg:justify-center rounded-lg text-white px-4 py-[15.5px]
                    
                                transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.003] hover:text-white active:scale-[99%]"
                            >
                                <p className="font-rubik text-[14px] font-medium">Return to Homepage</p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    // cho nó ẩn ở trên desktop và hiện trên mobile
                                    className="block lg:hidden"
                                >
                                    <path
                                        d="M8.375 3.5L12.875 8L8.375 12.5M12.25 8H3.125"
                                        stroke="white"
                                        strokeWidth="1.5"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Background Decorative Elements */}
            <div className="fixed top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="fixed bottom-20 right-20 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
        </div>
    );
};

export default OrderSuccess;

// Add these custom animations to your global CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes bounce-small {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-10px); }
  }
  
  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  
  .animate-bounce-small {
    animation: bounce-small 3s infinite;
  }
  
  .animate-fade-in {
    animation: fade-in 0.5s ease-out;
  }
`;
document.head.appendChild(style);