import React, { createContext, useEffect, useState, useCallback } from "react";
import productApi from "../apis/productApi";
import categoryApi from "../apis/categoryApi";
import PropTypes from "prop-types";
import { useLoader } from "./LoaderContext";
import io from "socket.io-client";
import Echo from "laravel-echo";
import { toast } from "react-toastify";

export const ShopConText = createContext();

const ShopContextProvider = ({ children }) => {
   // const { showLoader, hideLoader } = useLoader(); // bug khi sử dụng loader
   const [products, setProducts] = useState([]);
   const currency = "$";
   const delivery_fee = "6.99";
   const [pagination, setPagination] = useState({
      currentPage: 1,
      totalPages: 1,
      totalItems: 0,
      itemsPerPage: 9,
   });
   const [categories, setCategories] = useState([]);
   const [currentCategory, setCurrentCategory] = useState({
      category_id: 1,
      category_name: null,
   });
   const [isOpenCategories, setIsOpenCategories] = useState(false); // khai báo thằng này ở đây để chỉ hiện khi nào mở trang

   const echo = new Echo({
      broadcaster: "socket.io",
      host: "ws://localhost:6001", // URL của Laravel Echo Server
      client: io, // Truyền đối tượng socket.io client
      transports: ["websocket"],
      reconnectionDelayMax: 10000,
   });

   // Toggle hiển thị dropdown
   const toggleDropdownCategories = () =>
      setIsOpenCategories(!isOpenCategories);

   const [filters, setFilters] = useState({
      page: 1,
      category: "",
   });

   // fetch Categories api
   const fetchCategories = useCallback(async () => {
      try {
         const response = await categoryApi.getAll();
         setCategories(response.data);
      } catch (error) {
         console.error("Failed to fetch categories:", error);
      }
   }, [filters]);

   const fetchProducts = useCallback(async () => {
      try {
         const response = await productApi.getAll(filters);
         const productsData = response.data.data.map((product) => {
            const imageUrls = product.images.map((imageObj) => imageObj.image);
            return {
               ...product,
               images: imageUrls,
            };
         });
         setProducts(productsData);
         console.log(products);
         setPagination({
            currentPage: response.data.current_page,
            totalPages: response.data.last_page,
            totalItems: response.data.total,
            itemsPerPage: response.data.per_page,
         });
      } catch (error) {
         console.error("Failed to fetch products:", error);
      }
   }, [filters]);

   const handleCategoryChange = useCallback((newCategory) => {
      setCurrentCategory(newCategory); // { category_id, category_name }
      setFilters((prev) => ({
         ...prev,
         category: newCategory.category_name, // Sử dụng category_name trong filters
      }));
   }, []);

   const handlePageChange = useCallback((newPage) => {
      setFilters((prev) => ({
         ...prev,
         page: newPage,
      }));
   }, []);

   useEffect(() => {
      fetchProducts();
      fetchCategories();
   }, [filters]);

   const value = {
      products,
      currency,
      delivery_fee,
      pagination,
      fetchProducts,
      fetchCategories,
      filters,
      setFilters,
      handlePageChange,
      currentCategory,
      setCurrentCategory,
      categories,
      handleCategoryChange,
      isOpenCategories,
      setIsOpenCategories,
      toggleDropdownCategories,
   };

   useEffect(() => {
      console.log(echo.connector);

      // Lắng nghe sự kiện 'MessageSent' trên channel 'kicks_database_messages'
      echo
         .channel("kicks_database_orders")
         .listen(".OrderNotification", function (event) {
            console.log(event.order); // In ra thông tin sự kiện

            if (event.order.event == "created") {
               toast.info(
                  "Order " + event.order.order.order_id + " has created",
                  { autoClose: 2000 }
               );
            }
            // Cập nhật state để hiển thị message
            if (event.order.event == "updated") {
               if (event.order.order.payment_status == "failed") {
                  toast.error(
                     "Order " + event.order.order.order_id + " was cancelled",
                     { autoClose: 2000 }
                  );
               }
               if (event.order.order.payment_status == "paid") {
                  toast.success(
                     "Order " + event.order.order.order_id + " has paid",
                     { autoClose: 2000 }
                  );
               }
            }
         });

      // Dọn dẹp khi component bị unmount
      return () => {
         echo.leaveChannel("kicks_database_messages");
      };
   }, []);

   return <ShopConText.Provider value={value}>{children}</ShopConText.Provider>;
};

ShopContextProvider.propTypes = {
   children: PropTypes.node.isRequired,
};

export default ShopContextProvider;
