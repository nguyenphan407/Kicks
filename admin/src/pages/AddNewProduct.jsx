import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Breadcrumbs from "../components/Features/Breadcrumbs";
import { images, icons } from "@/assets/assets";
import productApi from "@/apis/productApi";
import { ShopConText } from "@/context/ShopContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useLoader } from "@/context/LoaderContext";

// Mảng các màu cố định
const colors = [
   { name: "Dark Blue", colorCode: "#4A69E2" },
   { name: "Bright Orange", colorCode: "#FFA52F" },
   { name: "Black", colorCode: "#232321" },
   { name: "Dark Green", colorCode: "#234D41" },
   { name: "Charcoal Gray", colorCode: "#353336" },
   { name: "Light Orange", colorCode: "#F08155" },
   { name: "Light Gray", colorCode: "#C9CCC6" },
   { name: "Dark Gray", colorCode: "#677282" },
   { name: "Dark Brown", colorCode: "#925513" },
   { name: "Light Brown", colorCode: "#BB8056" },
];

// Schema validation với Yup
const schema = yup.object().shape({
   name: yup.string().required("Product name is required"),
   description: yup
      .string()
      .max(500, "Description cannot exceed 500 characters")
      .required("Description is required"),
   brand: yup.string().required("Brand is required"),
   size: yup.string().notOneOf(["Select Size"], "Please select a size"),
   color: yup
      .string()
      .oneOf(
         colors.map((color) => color.colorCode),
         "Please select a valid color"
      )
      .required("Color is required"),
   regular_price: yup
      .number()
      .typeError("Regular price must be a number")
      .positive("Price must be positive")
      .required("Regular price is required"),
   gender: yup.string().required("Gender is required"),
   price: yup
      .number()
      .typeError("Sale price must be a number")
      .positive("Price must be positive")
      .min(
         yup.ref("regular_price"),
         "Sell price must not be lower than regular price"
      )
      .required("Sale price is required"),
   quantity: yup
      .number()
      .typeError("Quantity must be a number")
      .integer("Quantity must be an integer")
      .min(0, "Quantity cannot be negative")
      .required("Quantity is required"),
   images: yup
      .array()
      .of(yup.object().required())
      .min(1, "Please upload at least one image")
      .max(4, "You can upload up to 4 images")
      .required("Please upload at least one image"),
});

const AddNewProduct = () => {
   const breadcrumbs = [
      { label: "Home", link: "/" },
      { label: "All Products", link: "/allproduct" },
      { label: "Add New Product" },
   ];

   // Setup React Hook Form
   const {
      register,
      handleSubmit,
      setValue,
      watch, // Sử dụng watch thay vì getValues
      formState: { errors, isValid },
      trigger,
   } = useForm({
      resolver: yupResolver(schema),
      mode: "onChange",
   });

   const selectedColor = watch("color"); // Theo dõi giá trị màu hiện tại

   const { currentCategory } = useContext(ShopConText);
   const navigate = useNavigate(); // dùng để quay về lại trang product list

   const [isOpen, setIsOpen] = useState(false);
   const [selected, setSelected] = useState("Select Size");
   const [uploadedImages, setUploadedImages] = useState([]);
   const [serverErrors, setServerErrors] = useState({});
   const options = ["38", "39", "40", "41", "42", "43", "44", "45", "46", "47"];

   const { showLoader, hideLoader } = useLoader();

   // Form submission
   const onSubmit = async (data) => {
      try {
         showLoader();
         const formData = new FormData();
         formData.append("name", data.name);
         formData.append("description", data.description);
         formData.append("category_id", currentCategory.category_id);
         formData.append("brand", data.brand);
         formData.append("size", data.size);
         formData.append("quantity", data.quantity);
         formData.append("color", data.color);
         formData.append("regular_price", data.regular_price);
         formData.append("price", data.price);
         formData.append("gender", data.gender);

         console.log(data);

         if (data.images && data.images.length > 0) {
            data.images.forEach((image) => {
               if (image.file instanceof File) {
                  formData.append("images[]", image.file);
               } else {
                  console.error("An image is not a valid File");
               }
            });
         } else {
            console.warn("No images to upload");
         }

         const response = await productApi.add(formData);
         console.log("Product added successfully:", response);
         toast.success("Product added successfully!");
         navigate("/allproduct"); // Reset form hoặc chuyển hướng theo nhu cầu

         hideLoader();
      } catch (error) {
         hideLoader();

         if (error.response) {
            console.error("Server responded with:", error.response.data);
            setServerErrors(error.response.data.errors || {});
            toast.error(
               error.response.data.message || "Failed to add product!"
            );
         } else {
            console.error("Error adding product:", error.message);
            toast.error("Something went wrong while adding the product!");
         }
      }
   };

   const handleImageUpload = (e) => {
      const files = Array.from(e.target.files);
      const maxSize = 10 * 1024 * 1024; // 4MB

      const validFiles = files.filter((file) => {
         if (file.size <= maxSize) {
            return true;
         } else {
            toast.error(`exceeds the maximum size of 2MB.`);
            return false;
         }
      });
      if (validFiles.length + uploadedImages.length > 4) {
         alert("You can only upload up to 4 images :)))");
         return;
      }
      const newImages = validFiles.map((file) => ({
         file,
         preview: URL.createObjectURL(file),
      }));

      const updatedImages = [...uploadedImages, ...newImages]; // gộp ảnh từ file vào mảng ảnh hiện tại
      setUploadedImages(updatedImages);
      setValue("images", updatedImages, { shouldValidate: true }); // setValue lại images (đã được đăng ký với react hook form)
   };

   const removeImage = (index) => {
      const updatedImages = uploadedImages.filter((_, i) => i !== index);
      setUploadedImages(updatedImages);
      setValue("images", updatedImages, { shouldValidate: true }); // setValue lại images (đã được đăng ký với react hook form)
   };

   const handleSizeSelect = (option) => {
      setSelected(option);
      setValue("size", option, {
         shouldValidate: true,
      });
      setIsOpen(false);
   };

   const handleColorSelect = (colorCode) => {
      setValue("color", colorCode, {
         shouldValidate: true,
      });
   };

   return (
      <div className="product-details container mx-auto">
         {/* Title */}
         <div className="mb-6 gap-2">
            <h1 className="font-rubik text-[24px] font-semibold text-black mb-1">
               Add New Product
            </h1>
            <Breadcrumbs items={breadcrumbs} />
         </div>
         <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-[60px] bg-white p-6 rounded-2xl border shadow-md"
         >
            {/* Main wrapper */}
            <div className="flex flex-row justify-between gap-[47px]">
               {/* Form Column */}
               <div className="flex flex-col flex-[1.26] gap-6 bg-white">
                  {/* Product Info */}
                  <div className="product-info w-auto flex-1 flex flex-col gap-6">
                     {/* Product Name */}
                     <div className="relative">
                        <h3 className="text-[20px] mb-4 font-semibold font-rubik text-[#232321]">
                           Product Name
                        </h3>
                        <input
                           {...register("name")}
                           placeholder="Product Name"
                           type="text"
                           className="w-full font-semibold px-[16px] py-[10px] border border-gray-800 rounded-lg font-inter text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                        />
                        {errors.name && (
                           <p className="absolute top-[100px] text-red-500 text-sm">
                              {errors.name.message}
                           </p>
                        )}
                        {serverErrors.name && (
                           <p className="absolute top-[120px] text-red-500 text-sm">
                              {serverErrors.name[0]}
                           </p>
                        )}
                     </div>
                     {/* Description */}
                     <div className="relative">
                        <h3 className="text-[20px] mb-4 font-semibold font-rubik text-[#232321]">
                           Description
                        </h3>
                        <textarea
                           {...register("description")}
                           placeholder="Description"
                           className="w-full font-medium px-[16px] py-[10px] h-[180px] flex justify-start items-start font-inter border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none resize-none"
                        ></textarea>
                        {errors.description && (
                           <p className="absolute top-[230px] text-red-500 text-sm">
                              {errors.description.message}
                           </p>
                        )}
                        {serverErrors.description && (
                           <p className="absolute top-[250px] text-red-500 text-sm">
                              {serverErrors.description[0]}
                           </p>
                        )}
                     </div>
                     {/* Brand */}
                     <div className="relative">
                        <h3 className="text-[20px] mb-4 font-semibold font-rubik text-[#232321]">
                           Brand Name
                        </h3>
                        <input
                           {...register("brand")}
                           type="text"
                           placeholder="Brand Name"
                           className="w-full p-[10px] font-semibold px-[16px] font-inter border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                        />
                        {errors.brand && (
                           <p className="absolute top-[100px] text-red-500 text-sm">
                              {errors.brand.message}
                           </p>
                        )}
                        {serverErrors.brand && (
                           <p className="absolute top-[120px] text-red-500 text-sm">
                              {serverErrors.brand[0]}
                           </p>
                        )}
                     </div>
                     {/* Size and Quantity */}
                     <div className="flex justify-between items-center gap-6">
                        {/* Size */}
                        <div className="w-full relative">
                           <h3 className="text-[20px] mb-4 font-semibold font-rubik text-[#232321]">
                              Size
                           </h3>
                           <div className="relative items-center z-20">
                              <button
                                 type="button"
                                 onClick={() => setIsOpen(!isOpen)}
                                 className="flex items-center justify-between bg-transparent border border-black px-4 py-[12px] font-semibold rounded-[8px] text-[#232321] text-[14px] w-full transition-all duration-150 ease-in-out focus:bg-[#cacaca]"
                              >
                                 <span>{selected}</span>
                                 <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 25"
                                    fill="none"
                                    className="w-5 h-5 ml-2"
                                 >
                                    <path
                                       d="M5.25 9.5L12 16.25L18.75 9.5"
                                       stroke="#232321"
                                       strokeWidth="1.5"
                                       strokeLinecap="round"
                                       strokeLinejoin="round"
                                    />
                                 </svg>
                              </button>
                              {isOpen && (
                                 <ul className="absolute bg-[#F4F2F2] text-secondary_black w-full mt-[10px] rounded-[8px] flex flex-col shadow-2xl border border-black overflow-hidden">
                                    {options.map((option, index) => (
                                       <li
                                          key={index}
                                          onClick={() =>
                                             handleSizeSelect(option)
                                          }
                                          className="px-4 py-2 hover:bg-[#d0d0d0] cursor-pointer text-[14px] font-semibold flex items-center justify-between"
                                       >
                                          {option}
                                          {selected === option && (
                                             <img
                                                src={icons.RoundCheckIcon}
                                                alt="Selected"
                                                className="w-4 h-4 ml-2"
                                             />
                                          )}
                                       </li>
                                    ))}
                                 </ul>
                              )}
                           </div>
                           {errors.size && (
                              <p className="absolute top-[100px] text-red-500 text-sm">
                                 {errors.size.message}
                              </p>
                           )}
                           {serverErrors.size && (
                              <p className="absolute top-[120px] text-red-500 text-sm">
                                 {serverErrors.size[0]}
                              </p>
                           )}
                        </div>
                        {/* Quantity */}
                        <div className="gap-4 w-full relative">
                           <h3 className="text-[20px] font-semibold font-rubik text-[#232321] mb-4">
                              Quantity
                           </h3>
                           <input
                              {...register("quantity")}
                              type="number"
                              placeholder="Quantity"
                              className="w-full font-semibold p-[10px] px-[16px] font-inter border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                           />
                           {errors.quantity && (
                              <p className="absolute top-[100px] text-red-500 text-sm">
                                 {errors.quantity.message}
                              </p>
                           )}
                           {serverErrors.quantity && (
                              <p className="absolute top-[120px] text-red-500 text-sm">
                                 {serverErrors.quantity[0]}
                              </p>
                           )}
                        </div>
                     </div>
                     {/* Prices */}
                     <div className="flex justify-between items-center gap-6">
                        {/* Regular Price */}
                        <div className="w-full relative">
                           <h3 className="text-[20px] mb-4 font-semibold font-rubik text-[#232321]">
                              Regular Price
                           </h3>
                           <input
                              {...register("regular_price")}
                              type="number"
                              placeholder="Regular Price"
                              className="w-full font-semibold p-[10px] px-[16px] font-inter border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                           />
                           {errors.regular_price && (
                              <p className="absolute top-[100px] text-red-500 text-sm">
                                 {errors.regular_price.message}
                              </p>
                           )}
                           {serverErrors.regular_price && (
                              <p className="absolute top-[120px] text-red-500 text-sm">
                                 {serverErrors.regular_price[0]}
                              </p>
                           )}
                        </div>
                        {/* Sale Price */}
                        <div className="w-full relative">
                           <h3 className="text-[20px] mb-4 font-semibold font-rubik text-[#232321]">
                              Sale Price
                           </h3>
                           <input
                              {...register("price")}
                              type="number"
                              placeholder="Sale Price"
                              className="w-full font-semibold p-[10px] px-[16px] font-inter border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                           />
                           {errors.price && (
                              <p className="absolute top-[100px] text-red-500 text-sm">
                                 {errors.price.message}
                              </p>
                           )}
                           {serverErrors.price && (
                              <p className="absolute top-[120px] text-red-500 text-sm">
                                 {serverErrors.price[0]}
                              </p>
                           )}
                        </div>
                     </div>
                     {/* Color */}
                     <div className="flex justify-between items-center gap-6">
                        <div className="w-full relative">
                           <h3 className="text-[20px] mb-4 font-semibold font-rubik text-[#232321]">
                              Color
                           </h3>
                           <div className="flex flex-wrap gap-2">
                              {colors.map((color, index) => (
                                 <button
                                    key={index}
                                    type="button"
                                    onClick={() =>
                                       handleColorSelect(color.colorCode)
                                    }
                                    className={`w-8 h-8 rounded-full border-2 ${
                                       selectedColor === color.colorCode
                                          ? "border-[#008B28]"
                                          : "border-transparent"
                                    }`}
                                    style={{
                                       backgroundColor: color.colorCode,
                                    }}
                                 >
                                    {/* Hiển thị dấu tick nếu màu đang được chọn */}
                                    {selectedColor === color.colorCode && (
                                       <span className="inline-block w-full h-full bg-white rounded-full opacity-50 flex items-center justify-center">
                                          <svg
                                             xmlns="http://www.w3.org/2000/svg"
                                             className="h-4 w-4 text-[#008B28]"
                                             viewBox="0 0 20 20"
                                             fill="currentColor"
                                          >
                                             <path
                                                fillRule="evenodd"
                                                d="M16.707 5.293a1 1 0 00-1.414 0L9 11.586 6.707 9.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l7-7a1 1 0 000-1.414z"
                                                clipRule="evenodd"
                                             />
                                          </svg>
                                       </span>
                                    )}
                                 </button>
                              ))}
                           </div>
                           {errors.color && (
                              <p className="absolute top-[60px] text-red-500 text-sm">
                                 {errors.color.message}
                              </p>
                           )}
                           {serverErrors.color && (
                              <p className="absolute top-[80px] text-red-500 text-sm">
                                 {serverErrors.color[0]}
                              </p>
                           )}
                        </div>
                        <div className="w-full relative">
                           <h3 className="text-[20px] mb-4 font-semibold font-rubik text-[#232321]">
                              Gender
                           </h3>
                           <input
                              {...register("gender")}
                              type="text"
                              placeholder="Gender"
                              className="w-full p-[10px] font-semibold px-[16px] font-inter border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                           />
                           {errors.gender && (
                              <p className="absolute top-[100px] text-red-500 text-sm">
                                 {errors.gender.message}
                              </p>
                           )}
                           {serverErrors.gender && (
                              <p className="absolute top-[120px] text-red-500 text-sm">
                                 {serverErrors.gender[0]}
                              </p>
                           )}
                        </div>
                     </div>
                  </div>
               </div>
               {/* Image Upload Section */}
               <div className="flex-1 flex flex-col gap-6">
                  {/* Image Upload */}
                  <div className="h-[164px] flex flex-col gap-4 p-4 justify-center items-center border-dashed border-2 border-black rounded-[8px] relative">
                     <label htmlFor="image-upload" className="cursor-pointer">
                        <img src={icons.UploadImgIcon} alt="" />
                     </label>
                     <input
                        type="file"
                        id="image-upload"
                        className="hidden"
                        multiple
                        accept="image/jpeg, image/png"
                        onChange={handleImageUpload}
                     />
                     <label
                        htmlFor="image-upload"
                        className="w-[262px] block text-center text-[#70706E] text-[16px] font-semibold cursor-pointer"
                     >
                        Drop your image here, or browse Jpeg, png are allowed
                     </label>
                     {errors.images && (
                        <p className="absolute bottom-[-20px] text-red-500 text-sm">
                           {errors.images.message}
                        </p>
                     )}
                     {serverErrors.images && (
                        <p className="absolute bottom-[-40px] text-red-500 text-sm">
                           {serverErrors.images[0]}
                        </p>
                     )}
                  </div>
                  {/* Display Uploaded Images */}
                  <div className="space-y-4">
                     {uploadedImages.map((image, index) => (
                        <section
                           key={index}
                           className="flex p-4 justify-between items-center gap-4 bg-gray-100 rounded-[8px]"
                        >
                           <img
                              src={image.preview}
                              alt={`Uploaded image ${index}`}
                              className="min-w-[64px] w-[64px] h-[64px] object-cover rounded-md"
                           />
                           <div className="flex-1 flex flex-col gap-4">
                              <span className="font-semibold text-[16px]  text-[#232321]">
                                 {image.file.name}
                              </span>
                              <div className="w-auto h-1 bg-[#4a69e2] rounded-lg" />
                           </div>
                           <button
                              type="button"
                              onClick={() => removeImage(index)}
                              className="p-2 rounded-[8px] bg-gray-200 hover:bg-gray-300"
                           >
                              <img
                                 src={icons.DeleteIcon}
                                 alt=""
                                 className="w-6 h-6"
                              />
                           </button>
                        </section>
                     ))}
                  </div>
               </div>
            </div>
            {/* Action Buttons */}
            <div className="w-96 flex flex-row gap-4 ml-auto">
               <button
                  type="submit"
                  className="w-full h-12 bg-[#232321] flex justify-center items-center rounded-lg text-white px-4 transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.003] hover:text-white active:scale-[96%]"
               >
                  <p className="text-sm font-rubik text-[14px] tracking-tight">
                     Add
                  </p>
               </button>
               <button
                  type="reset"
                  onClick={() => {
                     // Reset form fields và xóa ảnh đã tải lên
                     setUploadedImages([]);
                     setSelected("Select Size");
                     setIsOpen(false);
                     setValue("color", ""); // Đặt lại màu
                  }}
                  className="w-full h-12 bg-white border border-black flex justify-center items-center rounded-lg text-[#232321] px-4 transform transition duration-400 hover:bg-gray-100 uppercase hover:scale-[1.003] hover:text-black active:scale-[99%]"
               >
                  <p className="text-sm font-rubik text-[14px] tracking-tight">
                     Reset
                  </p>
               </button>
            </div>
         </form>
      </div>
   );
};

export default AddNewProduct;
