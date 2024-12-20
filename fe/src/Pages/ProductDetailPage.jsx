// src/pages/ProductDetailPage.jsx
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopConText } from "../context/ShopContext"; // Giữ lại để sử dụng addToCart
import useIsMobile from "../Components/User/useIsMobile";
import { images } from "../assets/assets";
import MayLike from "../Components/Product/MayLike";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import productApi from "../apis/productApi";

// import socket from "../libs/socket"; // Nếu cần thiết

const ProductDetailPage = () => {
   const location = useLocation();
   useEffect(() => {
      // Cuộn lên đầu trang mỗi khi location (URL) thay đổi
      window.scrollTo(0, 0);
   }, [location]);

   const { productId } = useParams();
   const { addToCart } = useContext(ShopConText); // Giữ lại addToCart
   const [productData, setProductData] = useState(null);
   const [loading, setLoading] = useState(true); // State để quản lý trạng thái tải
   const [error, setError] = useState(null); // State để quản lý lỗi

   // Ánh xạ màu
   const colors = {
      "Dark Blue": "#4A69E2",
      "Bright Orange": "#FFA52F",
      Black: "#232321",
      "Dark Green": "#234D41",
      "Charcoal Gray": "#353336",
      "Light Orange": "#F08155",
      "Light Gray": "#C9CCC6",
      "Dark Gray": "#677282",
      "Dark Brown": "#925513",
      "Light Brown": "#BB8056",
   };
   const [isSelectedColor, setIsSelectedColor] = useState(true); // State để quản lý trạng thái chọn

   const toggleSelectColor = () => {
      setIsSelectedColor(!isSelectedColor); // Đảo ngược trạng thái
   };

   // State kiểm tra trạng thái mobile
   const isMobile = useIsMobile();

   // fetch Product từ productApi
   const fetchProductData = async () => {
      setLoading(true);
      setError(null);
      try {
         const product = await productApi.get(productId); // Sử dụng productApi.get(id)
         if (product) {
            console.log(product)
            setProductData(product);
         } else {
            console.log(`Product with ID ${productId} not found`);
            toast.error(`Product with ID ${productId} not found`, { autoClose: 2000 });
         }
      } catch (err) {
         console.error(err);
         setError(err.message || "Đã có lỗi xảy ra");
         toast.error("Không thể tải dữ liệu sản phẩm.", { autoClose: 2000 });
      } finally {
         setLoading(false);
      }
   };

   // Chọn ảnh xem chi tiết
   const [selectedImage, setSelectedImage] = useState(null); // xem chi tiết ảnh trên desktop
   const [image, setImage] = useState(null); // Đặt state ảnh chính trên mobile
   const [fadeEffect, setFadeEffect] = useState(false);

   // Mở/đóng modal
   const openModal = (image) => {
      setSelectedImage(image);
   };

   const closeModal = () => {
      setSelectedImage(null);
   };

   useEffect(() => {
      fetchProductData();
   }, [productId]); // Cập nhật khi productId thay đổi

   useEffect(() => {
      if (productData) {
         setImage(productData.images[0]); // Khởi tạo ảnh đầu tiên khi có dữ liệu
      }
   }, [productData]);

   const changeImage = (newImage) => {
      setFadeEffect(true); // Bắt đầu fade out

      setTimeout(() => {
         setImage(newImage);
         setFadeEffect(false); // Bắt đầu fade in sau khi đổi ảnh
      }, 200); // Thời gian fade out (200ms)
   };

   // Phần toggle size
   const [isOpenSize, setIsOpenSize] = useState(true);
   const toggleDropdownSize = () => setIsOpenSize(!isOpenSize);
   // State lưu các lựa chọn của người dùng
   const [selectedSize, setSelectedSize] = useState(null); // Lựa chọn size
   const sizes = [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];

   const getUnavailableSizes = (product) => {
      // Kiểm tra nếu không có product hoặc không có kích thước nào
      if (!product || !product.sizes || product.sizes.length === 0) {
         return sizes; // Trả về tất cả các size từ 38 đến 47 nếu không có kích thước
      }

      // Lọc các kích thước có quantity = 0 (hết hàng) hoặc không có trong product.sizes
      const outOfStockSizes = sizes.filter((size) => {
         const productSize = product.sizes.find(
            (sizeObj) => sizeObj.size === size
         );
         return !productSize || productSize.stock === 0;
      });
      return outOfStockSizes;
   };

   const outOfStockSizes = productData ? getUnavailableSizes(productData) : [];
   // console.log(productData);

   // Lựa chọn size, kiểm tra size có sẵn
   const handleSizeClick = (size) => {
      if (!outOfStockSizes.includes(size)) {
         setSelectedSize(size);
      }
   };

   // Xử lý thêm vào giỏ hàng
   const handleAddToCart = () => {
      if (!selectedSize) {
         toast.error("Vui lòng chọn kích cỡ trước khi thêm vào giỏ hàng", {
            autoClose: 1500,
         });
         return;
      }
      addToCart(productData.product_id, selectedSize);
   };

   // Listener để cập nhật sản phẩm khi có sự thay đổi từ Socket.IO
   // useEffect(() => {
   //    const onProductUpdated = (updatedProduct) => {
   //       if (updatedProduct.product_id === parseInt(productId, 10)) {
   //          console.log("Received update for viewed product:", updatedProduct);
   //          setProductData(updatedProduct);
   //          toast.info(`Product information for "${updatedProduct.name}" has been updated.`);
   //       }
   //    };

   //    // Lắng nghe sự kiện 'productUpdated'
   //    socket.on("productUpdated", onProductUpdated);

   //    return () => {
   //       socket.off("productUpdated", onProductUpdated);
   //    };
   // }, [productId]);

   if (error) {
      return (
         <div className="flex justify-center items-center h-screen">
            <p>{error}</p>
         </div>
      );
   }
   if (loading) {
      return (
         <motion.div
            className="flex justify-center items-center h-screen font-rubik text-xl lg:text-5xl font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
         >
            <p>LOADING PRODUCT...</p>
         </motion.div>
      );
   }

   if (error) {
      return (
         <motion.div
            className="flex justify-center items-center h-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
         >
            <p>{error}</p>
         </motion.div>
      );
   }
   return (
      <AnimatePresence>
         {productData && (
            <motion.div
               className="product-detail-container"
               initial={{ opacity: 0, y: 100 }} // Trượt từ dưới lên
               animate={{ opacity: 1, y: 0 }} // Hiển thị tại vị trí ban đầu
               exit={{ opacity: 0, y: 100 }} // Trượt xuống khi rời đi
               transition={{ duration: 0.4 }} // Thời gian hiệu ứng
            >
      <div className="container">
         <div className="flex flex-col lg:flex-row mt-6 lg:mt-8 gap-4 mb-[24px] lg:mb-[60px]">
            {/* Ảnh thumbnail trên mobile */}
            <div className="block lg:hidden">
               <img
                  src={image || productData.images[0]}
                  alt="Detailed Product"
                  className={`transition-opacity duration-300 ${
                     fadeEffect ? "opacity-0" : "opacity-100"
                  } w-full h-[273px] object-cover rounded-2xl`}
               />
            </div>

            {/* 4 ảnh của product */}
            <div className=" object-cover grid grid-cols-4 lg:grid-cols-2 gap-2 xl:gap-4">
                  <img
                  className="rounded-lg lg:rounded-none w-[400px] h-full 2xl:w-[140px] lg:h-[430px] lg:rounded-tl-[48px] cursor-pointer object-cover
                    transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:opacity-90"
                  src={productData.images[0]}
                  alt="productImage_1"
                     onClick={() => {
                        if (isMobile) {
                        changeImage(productData.images[0]);
                        } else {
                        openModal(productData.images[0]);
                        }
                     }}
                  />
               <img
                  className="rounded-lg lg:rounded-none lg:w-[400px] 2xl:w-[140px] lg:h-[430px] h-full lg:rounded-tr-[48px] cursor-pointer object-cover
                    transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:opacity-90"
                  src={productData.images[1]}
                  alt="productImage_2"
                  onClick={() => {
                     if (isMobile) {
                        changeImage(productData.images[1]);
                     } else {
                        openModal(productData.images[1]);
                     }
                  }}
               />
               <img
                  className="rounded-lg lg:rounded-none lg:w-[400px] 2xl:w-[140px] lg:h-[430px] h-full lg:rounded-bl-[48px] cursor-pointer object-cover
                    transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:opacity-90"
                  src={productData.images[2]}
                  alt="productImage_3"
                  onClick={() => {
                     if (isMobile) {
                        changeImage(productData.images[2]);
                     } else {
                        openModal(productData.images[2]);
                     }
                  }}
               />
               <img
                  className="rounded-lg lg:rounded-none lg:w-[400px] 2xl:w-[140px] lg:h-[430px] h-full lg:rounded-br-[48px] cursor-pointer object-cover
                    transform transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:opacity-90"
                  src={productData.images[3]}
                  alt="productImage_4"
                  onClick={() => {
                     if (isMobile) {
                        changeImage(productData.images[3]);
                     } else {
                        openModal(productData.images[3]);
                     }
                  }}
               />
            </div>

            {/* Chi tiết sản phẩm */}
            <div className="flex-1">
               <button
                  className="mb-2 lg:mb-4 font-rubik py-2 px-4 lg:py-3 bg-primary_blue rounded-lg lg:rounded-xl text-white font-semibold text-xs
                        transform transition duration-400 hover:bg-primary_blue hover:scale-[1.02] max-sm:text-xs"
               >
                  New Release
               </button>
               <h1 className="font-rubik mb-2 lg:mb-4 lg:leading-10 text-xl lg:text-[32px] font-semibold text-secondary_black uppercase">
                  {productData.name}
               </h1>
               <p className="text-primary_blue font-rubik text-2xl font-semibold mb-6 lg:mb-8">
                  ${productData.price}
               </p>
               {/* Lựa chọn màu */}
               <div className="mb-6 lg:mb-8">
                  <h3 className="mb-2 font-rubik lg:uppercase font-semibold text-[16px] text-secondary_black">
                     Color
                  </h3>
                  <button
                     className="w-8 h-8 lg:w-12 lg:h-12 rounded-full p-1 border-2 lg:border-4 flex items-center justify-center"
                     style={{
                        borderColor: isSelectedColor
                           ? productData.color
                           : "transparent",
                     }}
                     onClick={toggleSelectColor}
                  >
                     <span
                        className="w-5 h-5 lg:w-8 lg:h-8 rounded-full"
                        style={{
                           backgroundColor: productData.color || "#000",
                        }}
                     ></span>
                  </button>
               </div>

               {/* Chọn size */}
               <div className="mb-6 xl:mb-8">
                  <div
                     className="flex justify-between items-center cursor-pointer"
                     onClick={toggleDropdownSize}
                  >
                     <h3 className="text-secondary_black xl:text-[16px] font-semibold font-rubik xl:uppercase">
                        Size
                     </h3>
                     <span
                        className="font-rubik text-[14px] font-medium leading-3 p-0 border-b-2 border-black cursor-pointer"
                        onClick={(e) => {
                           e.stopPropagation(); // Ngăn không cho toggleDropdownSize bị kích hoạt
                           if (isMobile) {
                              changeImage(images.SizeChartMen);
                           } else {
                              openModal(images.SizeChartMen);
                           }
                        }}
                     >
                        SIZE CHART
                     </span>
                  </div>

                  <div className="flex flex-wrap gap-1 mt-2">
                     {sizes.map((size) => (
                        <button
                           key={size}
                           onClick={() => handleSizeClick(size)}
                           disabled={outOfStockSizes.includes(size)}
                           className={`w-[50px] h-[50px] py-2 rounded-lg font-semibold ${
                              selectedSize === size
                                 ? "bg-black text-white"
                                 : outOfStockSizes.includes(size)
                                   ? "bg-[#D2D1D3] text-[#8F8C91] cursor-not-allowed"
                                   : "bg-white hover:bg-gray-300"
                           }`}
                        >
                           {size}
                        </button>
                     ))}
                  </div>
               </div>

               {/* Nút Add to Cart & Buy It Now & <3 */}
               <div className="flex flex-col gap-2 mb-6 lg:mb-8">
                  <div className="flex gap-2 justify-between items-center">
                     <button
                        className={`font-rubik text-[14px] font-medium rounded-lg flex-1 py-[13.5px] text-white
                                transform transition duration-400 uppercase hover:scale-[1.003] active:scale-[99%]
                                ${
                                   selectedSize
                                      ? "bg-secondary_black hover:bg-primary_blue"
                                      : "bg-secondary_black opacity-50 cursor-not-allowed"
                                }`}
                        onClick={handleAddToCart}
                        disabled={!selectedSize}
                     >
                        ADD TO CART
                     </button>
                     <button
                        className="w-12 h-12 flex items-center justify-center bg-secondary_black rounded-lg
                                transform transition duration-400 hover:bg-primary_blue hover:scale-[1.005] hover:text-white"
                        onClick={handleAddToCart} // Bạn có thể thay đổi hành động cho nút này nếu cần
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           width="16"
                           height="16"
                           viewBox="0 0 16 16"
                           fill="currentColor"
                        >
                           <path
                              d="M11.0291 2.5C9.00032 2.5 8.00032 4.5 8.00032 4.5C8.00032 4.5 7.00032 2.5 4.97157 2.5C3.32282 2.5 2.01719 3.87937 2.00032 5.52531C1.96594 8.94187 4.71063 11.3716 7.71907 13.4134C7.80201 13.4699 7.9 13.5 8.00032 13.5C8.10063 13.5 8.19863 13.4699 8.28157 13.4134C11.2897 11.3716 14.0344 8.94187 14.0003 5.52531C13.9834 3.87937 12.6778 2.5 11.0291 2.5V2.5Z"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                           />
                        </svg>
                     </button>
                  </div>
                  <button
                     className="font-rubik text-[14px] font-medium rounded-lg flex-1 bg-primary_blue py-[13.5px] text-white
                            transform transition duration-400 hover:bg-[#294acc] hover:scale-[1.005]"
                     onClick={handleAddToCart} // Bạn có thể thay đổi hành động cho nút này nếu cần
                     disabled={!selectedSize}
                  >
                     BUY IT NOW
                  </button>
               </div>

               {/* Thông tin chi tiết sản phẩm */}
               <div>
                  <h3 className="mb-2 font-rubik text-secondary_black font-semibold text-[16px]">
                     ABOUT THE PRODUCT
                  </h3>
                  <p className="mb-4 text-[16px] font-normal text-[#4a4a47]">
                     {productData.description}
                  </p>

                  <p className="mb-4 text-[16px] font-normal text-[#4a4a47]">
                     This product is excluded from all promotional discounts and
                     offers.
                  </p>
                  <ul className="list-disc pl-6 text-base space-y-2 text-[16px] font-normal text-[#4a4a47]">
                     <li>
                        Pay over time in interest-free installments with Affirm,
                        Klarna or Afterpay.
                     </li>
                     <li>
                        Join adiClub to get unlimited free standard shipping,
                        returns, & exchanges.
                     </li>
                  </ul>
               </div>
            </div>
            {/* Xem chi tiết ảnh */}
            {selectedImage && (
               <div
                  className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50"
                  onClick={closeModal} // Bấm ra ngoài để đóng modal
               >
                  <img
                     src={selectedImage}
                     alt="Selected Product"
                     className="rounded-[48px] shadow-2xl object-cover max-w-[900px] max-h-[650px]"
                     onClick={(e) => e.stopPropagation()}
                  />
               </div>
            )}
         </div>
         <div className="mb-[24px] lg:mb-[55px]">
            <MayLike />
         </div>
      </div>
      </motion.div>
         )}
      </AnimatePresence>
   );
};
export default ProductDetailPage;
