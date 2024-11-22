import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Breadcrumbs from "../components/Features/Breadcrumbs";
import { images, icons } from "@/assets/assets";
import productApi from "@/apis/productApi";
import { useParams, useNavigate } from "react-router-dom";
import { useLoader } from "@/context/LoaderContext";
import productApiNoAuth from "@/apis/productApiNoAuth"; // tạm thời dùng noAuth vì backend chưa xử lý getProductId kèm theo token
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from 'sweetalert2'

// Schema validation với Yup
const schema = yup.object().shape({
    name: yup.string().required("Product name is required"),
    description: yup
        .string()
        .max(500, "Description cannot exceed 500 characters")
        .required("Description is required"),
    category: yup.string().required("Category is required"),
    brand: yup.string().required("Brand is required"),
    color: yup
        .string()
        .matches(/^#[A-Fa-f0-9]{6}$/, "Invalid color code")
        .required("Color is required"),
    regularPrice: yup
        .number()
        .typeError("Regular price must be a number")
        .positive("Price must be positive")
        .required("Regular price is required"),
    gender: yup.string().required("Gender is required"),
    salePrice: yup
        .number()
        .typeError("Sale price must be a number")
        .positive("Price must be positive")
        .min(
            yup.ref("regularPrice"),
            "Sale price cannot be lower than regular price"
        ),
    sizes: yup
        .array()
        .of(
            yup.object().shape({
                size: yup.number().required(),
                stock: yup
                    .number()
                    .typeError("Stock must be a number")
                    .integer("Stock must be an integer")
                    .min(0, "Stock cannot be negative")
                    .required("Stock quantity is required"),
            })
        )
        .required("Sizes are required"),
    images: yup
        .array()
        .of(yup.object().required())
        .min(1, "Please upload at least one image")
        .max(4, "You can upload up to 4 images")
        .required("Please upload at least one image"),
});

const ProductDetail = () => {
    const { productId } = useParams(); // lấy cái id
    const { showLoader, hideLoader } = useLoader();
    const navigate = useNavigate();

    const breadcrumbs = [
        { label: "Home", link: "/" },
        { label: "All Products", link: "/allproduct" },
        { label: "Product Details" },
    ];

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors, isValid },
        trigger,
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onChange",
    });

    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState("Select Size");
    const [uploadedImages, setUploadedImages] = useState([]);
    // {
    //     file: File, // hoặc null nếu là ảnh đã tồn tại
    //     preview: "url của ảnh",
    //     url: "url của ảnh"
    // }

    const [loading, setLoading] = useState(true);

    const allSizes = Array.from({ length: 10 }, (_, i) => 38 + i); // Tạo mảng [38, 39, ..., 47]
    const [sizeOptions, setSizeOptions] = useState([]); // Lưu trữ danh sách kích cỡ và tồn kho

    useEffect(() => {
        if (productId) {
            const fetchProductData = async () => {
                try {
                    console.log("productId tai get: ", productId);
                    const response = await productApiNoAuth.get(productId);
                    const productData = response.data;

                    // Khởi tạo sizes với tất cả các kích cỡ từ 38 đến 47
                    const initializedSizes = allSizes.map((size) => {
                        const sizeFromAPI = productData.sizes.find(
                            (s) => s.size === size
                        );
                        return {
                            size: size,
                            stock: sizeFromAPI ? sizeFromAPI.stock : 0,
                        };
                    });

                    setSizeOptions(initializedSizes);
                    setValue("sizes", initializedSizes);

                    // Cài đặt các giá trị khác của form
                    setValue("name", productData.name);
                    setValue("description", productData.description);
                    setValue("category", productData.category_id);
                    setValue("brand", productData.brand);
                    setValue("color", productData.color);
                    setValue("regularPrice", productData.regular_price);
                    setValue("salePrice", productData.price);
                    setValue("gender", productData.gender);

                    const images = productData.images.map((imgUrl) => ({
                        file: null,
                        preview: imgUrl,
                        url: imgUrl,
                    }));
                    setUploadedImages(images);
                    setValue("images", images);
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching product data:", error);
                    setLoading(false);
                }
            };

            fetchProductData();
        }
    }, [productId]);

    // Submit cập nhật sản phẩm
    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            // Thêm các trường cơ bản
            formData.append("name", data.name || ""); // Có thể null
            formData.append("description", data.description || ""); // Có thể null
            formData.append("category_id", data.category || ""); // Sửa thành category_id
            formData.append("brand", data.brand || ""); // Có thể null
            formData.append("color", data.color || ""); // Có thể null
            formData.append("regular_price", data.regularPrice); // Bắt buộc
            formData.append("price", data.salePrice || ""); // Có thể null
            formData.append("gender", data.gender || ""); // Có thể null

            // Xử lý danh sách kích cỡ và tồn kho
            data.sizes.forEach((sizeObj) => {
                if (sizeObj.size && sizeObj.stock !== undefined) {
                    formData.append("size", sizeObj.size); // Truyền size
                    formData.append("quantity", sizeObj.stock); // Truyền quantity
                }
            });

            // Xử lý ảnh
            data.images.forEach((image, index) => {
                if (image.file) {
                    formData.append(`images[${index}]`, image.file); // Truyền file mới
                } else if (image.url) {
                    formData.append(`existingImages[${index}]`, image.url); // Truyền ảnh cũ
                }
            });

            for (let pair of formData.entries()) {
                console.log(`${pair[0]}: ${pair[1]}`);
            }

            // Gọi API cập nhật sản phẩm
            console.log("FormData:", formData);
            const response = await productApi.update(productId, formData);
            console.log("Product updated successfully:", response);
            toast.success("Product updated successfully!");
        } catch (error) {
            console.error("Error updating product:", error);
            if (error.response && error.response.data) {
                console.error("Backend Error:", error.response.data); // Xem chi tiết lỗi từ backend
            }
            toast.error("Failed to update product!");
        }
    };

    // Handler Xóa sản phẩm
    // const handleDelete = async () => {
        
    //     try {
    //         await productApi.delete(productId);
    //         console.log("Product deleted successfully");
    //         toast.success("Product deleted successfully!");
    //         navigate("/allproduct");
    //     } catch (error) {
    //     console.error("Error deleting product:", error);
    // }
    const handleDelete = async () => {
        try {
          // Confirmation with SweetAlert2
          const confirmation = await Swal.fire({
            title: "Are you sure to delete this product?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#4A69E2",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          });
      
          if (!confirmation.isConfirmed) {
            return; // User canceled deletion
          }
      
          // Delete Product
          await productApi.delete(productId);
      
          // Success Message with Toast
          toast.success("Product deleted successfully!");
          navigate("/allproduct");
        } catch (error) {
          // Error Handling with User-Friendly Message
          Swal.fire({
            title: "Error Deleting Product",
            text: "An error occurred while deleting the product. Please try again later.",
            icon: "error"
          });
          console.error("Error deleting product:", error);
        }
      };



    const handleImageUpload = (e) => {
        // upload ảnh
        const files = Array.from(e.target.files);

        if (files.length + uploadedImages.length > 4) {
            // tối đa 4 ảnh
            alert("You can only upload up to 4 images.");
            return;
        }

        const newImages = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        const updatedImages = [...uploadedImages, ...newImages];
        setUploadedImages(updatedImages);
        setValue("images", updatedImages, { shouldValidate: true });
    };

    const removeImage = (index) => {
        const updatedImages = uploadedImages.filter((_, i) => i !== index);
        setUploadedImages(updatedImages);
        setValue("images", updatedImages, { shouldValidate: true });
    };

    if (loading) {
        return (
            <div className="font-rubik text-4xl flex items-center justify-center">
                Loading...
            </div>
        );
    }

    return (
        <div className="product-details container mx-auto">
            {/* Title */}
            <div className="mb-6 gap-2">
                <h1 className="font-rubik text-[24px] font-semibold text-black mb-1">
                    Product Details
                </h1>
                <Breadcrumbs items={breadcrumbs} />
            </div>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-[60px] bg-white p-6 rounded-2xl border shadow-md"
            >
                {/* Thẻ bọc 2 cột chính */}
                <div className="flex flex-row justify-between gap-[47px]">
                    {/* Cột form */}
                    <div className="flex flex-col flex-[1.26] gap-6 bg-white">
                        {/* Product Info */}
                        <div className="product-info w-auto flex-1 flex flex-col gap-6">
                            <div className="relative">
                                <h3 className="text-[20px] mb-4 font-semibold font-rubik text-[#232321]">
                                    Product Name
                                </h3>
                                <input
                                    {...register("name")}
                                    placeholder="Product Name"
                                    type="text"
                                    className="w-full px-[16px] py-[10px] border border-gray-800 rounded-lg font-inter text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                />
                                {errors.name && (
                                    <p className="absolute top-[100px] text-red-500 text-sm">
                                        {errors.name.message}
                                    </p>
                                )}
                            </div>
                            <div className="relative">
                                <h3 className="text-[20px] mb-4 font-semibold font-rubik text-[#232321]">
                                    Description
                                </h3>
                                <textarea
                                    {...register("description")}
                                    placeholder="Description"
                                    className="w-full px-[16px] py-[10px] h-[180px] flex justify-start items-start font-inter border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none resize-none"
                                ></textarea>
                                {errors.description && (
                                    <p className="absolute top-[230px] text-red-500 text-sm">
                                        {errors.description.message}
                                    </p>
                                )}
                            </div>

                            <div className="relative">
                                <h3 className="text-[20px] mb-4 font-semibold font-rubik text-[#232321]">
                                    Category
                                </h3>
                                <input
                                    {...register("category")}
                                    placeholder="Category Name"
                                    type="text"
                                    className="w-full px-[16px] py-[10px] border border-gray-800 rounded-lg font-inter text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                />
                                {errors.category && (
                                    <p className="absolute top-[100px] text-red-500 text-sm">
                                        {errors.category.message}
                                    </p>
                                )}
                            </div>

                            <div className="relative">
                                <h3 className="text-[20px] mb-4 font-semibold font-rubik text-[#232321]">
                                    Brand Name
                                </h3>
                                <input
                                    {...register("brand")}
                                    type="text"
                                    placeholder="Brand Name"
                                    className="w-full p-[10px] px-[16px] font-inter border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                />
                                {errors.brand && (
                                    <p className="absolute top-[100px] text-red-500 text-sm">
                                        {errors.brand.message}
                                    </p>
                                )}
                            </div>
                            {/* Section Sizes and Stock Quantities */}
                            <div className="flex flex-col gap-6">
                                <h3 className="text-[20px] mb-4 font-semibold font-rubik text-[#232321]">
                                    Sizes and Stock Quantities
                                </h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {sizeOptions.map((sizeObj, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <label className="pr-2 flex flex-1 justify-center items-center font-semibold text-xl">
                                                {sizeObj.size}
                                            </label>
                                            <input
                                                type="number"
                                                min="0"
                                                {...register(
                                                    `sizes.${index}.stock`
                                                )}
                                                defaultValue={sizeObj.stock}
                                                className="w-full p-[10px] px-[16px] font-inter border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                            />
                                        </div>
                                    ))}
                                </div>
                                {errors.sizes && (
                                    <p className="text-red-500 text-sm">
                                        {errors.sizes.message}
                                    </p>
                                )}
                            </div>
                            <div className="flex justify-between items-center gap-6">
                                <div className="w-full relative">
                                    <h3 className="text-[20px] mb-4 font-semibold font-rubik text-[#232321]">
                                        Regular Price
                                    </h3>
                                    <div className="relative">
                                        <span className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-700">
                                            $
                                        </span>
                                        <input
                                            {...register("regularPrice")}
                                            type="number"
                                            placeholder="Regular Price"
                                            className="w-full p-[10px] px-[16px] pl-[24px] font-inter border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                        />
                                    </div>
                                    {errors.regularPrice && (
                                        <p className="absolute top-[100px] text-red-500 text-sm">
                                            {errors.regularPrice.message}
                                        </p>
                                    )}
                                </div>
                                <div className="w-full relative">
                                    <h3 className="text-[20px] mb-4 font-semibold font-rubik text-[#232321]">
                                        Sale Price
                                    </h3>
                                    <div className="relative">
                                        <span className="absolute top-1/2 transform -translate-y-1/2 left-3 text-gray-700">
                                            $
                                        </span>
                                        <input
                                            {...register("salePrice")}
                                            type="number"
                                            placeholder="Sale Price"
                                            className="w-full p-[10px] px-[16px] pl-[24px] font-inter border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                        />
                                    </div>
                                    {errors.salePrice && (
                                        <p className="absolute top-[100px] text-red-500 text-sm">
                                            {errors.salePrice.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-6">
                                <div className="w-full relative">
                                    <h3 className="text-[20px] mb-4 font-semibold font-rubik text-[#232321]">
                                        Color (e.g., #FFFFFF)
                                    </h3>
                                    <input
                                        {...register("color")}
                                        type="text"
                                        placeholder="Color (e.g., #FFFFFF)"
                                        className="w-full p-[10px] px-[16px] font-inter border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                    />
                                    {errors.color && (
                                        <p className="absolute top-[100px] text-red-500 text-sm">
                                            {errors.color.message}
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
                                        className="w-full p-[10px] px-[16px] font-inter border border-gray-800 rounded-lg text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                    />
                                    {errors.gender && (
                                        <p className="absolute top-[100px] text-red-500 text-sm">
                                            {errors.gender.message}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Image Upload Section */}
                    <div className="flex-1 flex flex-col gap-6">
                        {/* Image thumbnails */}
                        <section className="border-[8px] rounded-[8px]">
                            <img
                                src={
                                    uploadedImages[0]?.preview ||
                                    images.Thumbnails[0]
                                }
                                alt="Thumbnails image"
                                className="w-full min-h-[550px] h-[550px] object-cover"
                            />
                        </section>
                        {/* Image Upload Section */}
                        <div className="h-[164px] flex flex-col gap-4 p-4 justify-center items-center border-dashed border-2 border-black rounded-[8px] relative">
                            <label
                                htmlFor="image-upload"
                                className="cursor-pointer"
                            >
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
                                Drop your image here, or browse Jpeg, png are
                                allowed
                            </label>
                            {errors.images && (
                                <p className="absolute bottom-[-20px] text-red-500 text-sm">
                                    {errors.images.message}
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
                                        <span className="font-semibold text-[16px] text-[#232321]">
                                            Product image {index + 1}
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

                {/* Update/Delete Product Buttons */}
                <div className="w-96 flex flex-row gap-4 ml-auto">
                    <button
                        type="submit"
                        className="w-full h-12 bg-[#232321] flex justify-center items-center rounded-lg text-white px-4 transform transition duration-400 hover:bg-primary_blue uppercase hover:opacity-80 hover:text-white active:scale-[97%]"
                    >
                        <p className="text-sm font-rubik text-[14px] tracking-tight">
                            Update
                        </p>
                    </button>
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="w-full h-12 bg-[#D00000] flex justify-center items-center rounded-lg text-white px-4 transform transition duration-400 hover:bg-primary_blue uppercase hover:opacity-80 hover:text-white active:scale-[97%]"
                    >
                        <p className="text-sm font-rubik text-[14px] tracking-tight">
                            Delete
                        </p>
                    </button>
                    <button
                        type="button"
                        className="w-full h-12 bg-white border border-black flex justify-center items-center rounded-lg text-[#232321] px-4 transform transition duration-400 hover:opacity-80 hover:bg-primary_blue uppercase active:scale-[97%]"
                    >
                        <p className="text-sm font-rubik text-[14px] tracking-tight">
                            Cancel
                        </p>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ProductDetail;
