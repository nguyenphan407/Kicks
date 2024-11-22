import React, { useState, useEffect, useCallback } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Breadcrumbs from "../components/Features/Breadcrumbs";
import { icons } from "@/assets/assets";
import productApi from "@/apis/productApi";
import categoryApi from "@/apis/categoryApi"; // Giả sử bạn có API để lấy danh sách danh mục
import { useParams, useNavigate } from "react-router-dom";
import { useLoader } from "@/context/LoaderContext";
import productApiNoAuth from "@/apis/productApiNoAuth"; // Tạm thời dùng noAuth vì backend chưa xử lý getProductId kèm theo token

// Schema validation với Yup
const schema = yup.object().shape({
  name: yup.string().required("Product name is required"),
  description: yup
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .required("Description is required"),
  category_id: yup
    .number()
    .typeError("Category is required")
    .required("Category is required"),
  brand: yup.string().required("Brand is required"),
  sizes: yup
    .array()
    .of(
      yup.object().shape({
        size: yup
          .number()
          .typeError("Size must be a number")
          .required("Size is required"),
        stock: yup
          .number()
          .typeError("Stock must be a number")
          .integer("Stock must be an integer")
          .min(0, "Stock cannot be negative")
          .required("Stock quantity is required"),
      })
    )
    .min(1, "At least one size is required"),
  color: yup
    .string()
    .matches(/^#[A-Fa-f0-9]{6}$/, "Invalid color code")
    .required("Color is required"),
  regularPrice: yup
    .number()
    .typeError("Regular price must be a number")
    .positive("Price must be positive")
    .required("Regular price is required"),
  salePrice: yup
    .number()
    .typeError("Sale price must be a number")
    .positive("Price must be positive")
    .min(yup.ref("regularPrice"), "Sale price cannot be lower than regular price")
    .nullable(),
  gender: yup.string().required("Gender is required"),
  images: yup
    .array()
    .of(
      yup.object().shape({
        file: yup.mixed(),
        preview: yup.string().url(),
        url: yup.string().url(),
      })
    )
    .min(1, "Please upload at least one image")
    .max(4, "You can upload up to 4 images"),
});

const ProductDetail = () => {
  const { productId } = useParams(); // Lấy productId từ URL
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();

  const breadcrumbs = [
    { label: "Home", link: "/" },
    { label: "All Products", link: "/allproduct" },
    { label: "Product Details" },
  ];

  // React Hook Form setup
  const {
    register,
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors, isValid },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      sizes: [{ size: "", stock: "" }],
      images: [],
    },
  });

  // Sử dụng useFieldArray để quản lý dynamic fields cho sizes
  const { fields: sizeFields, append: appendSize, remove: removeSize } = useFieldArray({
    control,
    name: "sizes",
  });

  const [isOpen, setIsOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);

  // Fetch categories từ API
  const fetchCategories = useCallback(async () => {
    try {
      const response = await categoryApi.getAll(); // Giả sử API này trả về danh sách danh mục
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (productId) {
      // Fetch the product data
      const fetchProductData = async () => {
        showLoader();
        try {
          const response = await productApiNoAuth.get(productId);
          const productData = response.data;
          console.log(productData);
          // Set form values
          setValue("name", productData.name);
          setValue("description", productData.description);
          setValue("category_id", productData.category_id);
          setValue("brand", productData.brand);
          setValue("color", productData.color);
          setValue("regularPrice", parseFloat(productData.regular_price));
          setValue("salePrice", parseFloat(productData.price) || null);
          setValue("gender", productData.gender);

          // Set sizes
          if (productData.sizes && productData.sizes.length > 0) {
            setValue("sizes", productData.sizes);
          }

          // Set images
          const images = productData.images.map((imgUrl) => ({
            url: imgUrl,
            preview: imgUrl,
            file: null,
          }));
          setUploadedImages(images);
          setValue("images", images);
        } catch (error) {
          console.error("Error fetching product data:", error);
          // Có thể hiển thị thông báo lỗi cho người dùng
        } finally {
          setLoadingData(false);
          hideLoader();
        }
      };

      fetchProductData();
    }
  }, [productId, setValue, showLoader, hideLoader]);

  // Clean up preview URLs khi component bị hủy
  useEffect(() => {
    return () => {
      uploadedImages.forEach((image) => {
        if (image.preview && image.file) {
          URL.revokeObjectURL(image.preview);
        }
      });
    };
  }, [uploadedImages]);

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + uploadedImages.length > 4) {
      alert("You can only upload up to 4 images.");
      return;
    }

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setUploadedImages((prev) => {
      const updated = [...prev, ...newImages];
      setValue("images", updated, { shouldValidate: true });
      return updated;
    });
  };

  // Remove Image
  const removeImage = (index) => {
    setUploadedImages((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      setValue("images", updated, { shouldValidate: true });
      return updated;
    });
  };

  // Handle Form Submission
  const onSubmit = async (data) => {
    showLoader();
    setSubmitLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("description", data.description);
      formData.append("category_id", data.category_id);
      formData.append("brand", data.brand);
      formData.append("color", data.color);
      formData.append("regular_price", data.regularPrice);
      formData.append("price", data.salePrice || data.regularPrice);
      formData.append("gender", data.gender);

      // Append sizes
      formData.append("sizes", JSON.stringify(data.sizes));

      // Handle images
      data.images.forEach((image, index) => {
        if (image.file) {
          formData.append(`images[${index}]`, image.file);
        } else if (image.url) {
          formData.append(`existingImages[${index}]`, image.url);
        }
      });

      // Call API to update the product
      const response = await productApi.update(productId, formData);

      console.log("Product updated successfully:", response);
      // Có thể hiển thị thông báo thành công cho người dùng
    } catch (error) {
      console.error("Error updating product:", error);
      // Có thể hiển thị thông báo lỗi cho người dùng
    } finally {
      setSubmitLoading(false);
      hideLoader();
    }
  };

  // Delete Handler
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    setDeleteLoading(true);
    showLoader();
    try {
      await productApi.delete(productId);
      console.log("Product deleted successfully");
      // Có thể chuyển hướng người dùng về trang danh sách sản phẩm
      navigate("/allproduct");
    } catch (error) {
      console.error("Error deleting product:", error);
      // Có thể hiển thị thông báo lỗi cho người dùng
    } finally {
      setDeleteLoading(false);
      hideLoader();
    }
  };

  if (loadingData) {
    return <div className="text-center mt-10">Loading...</div>;
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
        className="flex flex-col gap-8 bg-white p-6 rounded-2xl border shadow-md"
      >
        {/* Thẻ bọc 2 cột chính */}
        <div className="flex flex-row justify-between gap-8">
          {/* Cột form */}
          <div className="flex flex-col flex-1 gap-6 bg-white">
            {/* Product Info */}
            <div className="product-info w-auto flex-1 flex flex-col gap-6">
              {/* Product Name */}
              <div className="relative">
                <h3 className="text-[20px] mb-2 font-semibold font-rubik text-[#232321]">
                  Product Name
                </h3>
                <input
                  {...register("name")}
                  placeholder="Product Name"
                  type="text"
                  className={`w-full px-4 py-2 border rounded-lg font-inter text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none ${
                    errors.name ? "border-red-500" : "border-gray-800"
                  }`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Description */}
              <div className="relative">
                <h3 className="text-[20px] mb-2 font-semibold font-rubik text-[#232321]">
                  Description
                </h3>
                <textarea
                  {...register("description")}
                  placeholder="Description"
                  className={`w-full px-4 py-2 h-40 border rounded-lg font-inter text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none resize-none ${
                    errors.description ? "border-red-500" : "border-gray-800"
                  }`}
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Category */}
              <div className="relative">
                <h3 className="text-[20px] mb-2 font-semibold font-rubik text-[#232321]">
                  Category
                </h3>
                <select
                  {...register("category_id")}
                  className={`w-full px-4 py-2 border rounded-lg font-inter text-[16px] text-gray-700 bg-white focus:border-[#008B28] focus:outline-none ${
                    errors.category_id ? "border-red-500" : "border-gray-800"
                  }`}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category_id && (
                  <p className="text-red-500 text-sm mt-1">{errors.category_id.message}</p>
                )}
              </div>

              {/* Brand */}
              <div className="relative">
                <h3 className="text-[20px] mb-2 font-semibold font-rubik text-[#232321]">
                  Brand Name
                </h3>
                <input
                  {...register("brand")}
                  type="text"
                  placeholder="Brand Name"
                  className={`w-full px-4 py-2 border rounded-lg font-inter text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none ${
                    errors.brand ? "border-red-500" : "border-gray-800"
                  }`}
                />
                {errors.brand && (
                  <p className="text-red-500 text-sm mt-1">{errors.brand.message}</p>
                )}
              </div>

              {/* Sizes */}
              <div className="relative">
                <h3 className="text-[20px] mb-2 font-semibold font-rubik text-[#232321]">
                  Sizes
                </h3>
                {sizeFields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-4 mb-2">
                    <input
                      {...register(`sizes.${index}.size`)}
                      type="number"
                      placeholder="Size"
                      className={`w-1/2 px-4 py-2 border rounded-lg font-inter text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none ${
                        errors.sizes?.[index]?.size ? "border-red-500" : "border-gray-800"
                      }`}
                    />
                    <input
                      {...register(`sizes.${index}.stock`)}
                      type="number"
                      placeholder="Stock"
                      className={`w-1/2 px-4 py-2 border rounded-lg font-inter text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none ${
                        errors.sizes?.[index]?.stock ? "border-red-500" : "border-gray-800"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => removeSize(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => appendSize({ size: "", stock: "" })}
                  className="mt-2 text-blue-500 hover:text-blue-700"
                >
                  Add Size
                </button>
                {errors.sizes && typeof errors.sizes.message === "string" && (
                  <p className="text-red-500 text-sm mt-1">{errors.sizes.message}</p>
                )}
              </div>

              {/* Color */}
              <div className="relative">
                <h3 className="text-[20px] mb-2 font-semibold font-rubik text-[#232321]">
                  Color (e.g., #FFFFFF)
                </h3>
                <input
                  {...register("color")}
                  type="text"
                  placeholder="Color (e.g., #FFFFFF)"
                  className={`w-full px-4 py-2 border rounded-lg font-inter text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none ${
                    errors.color ? "border-red-500" : "border-gray-800"
                  }`}
                />
                {errors.color && (
                  <p className="text-red-500 text-sm mt-1">{errors.color.message}</p>
                )}
              </div>

              {/* Prices */}
              <div className="flex gap-4">
                <div className="relative w-1/2">
                  <h3 className="text-[20px] mb-2 font-semibold font-rubik text-[#232321]">
                    Regular Price
                  </h3>
                  <input
                    {...register("regularPrice")}
                    type="number"
                    placeholder="Regular Price"
                    className={`w-full px-4 py-2 border rounded-lg font-inter text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none ${
                      errors.regularPrice ? "border-red-500" : "border-gray-800"
                    }`}
                  />
                  {errors.regularPrice && (
                    <p className="text-red-500 text-sm mt-1">{errors.regularPrice.message}</p>
                  )}
                </div>
                <div className="relative w-1/2">
                  <h3 className="text-[20px] mb-2 font-semibold font-rubik text-[#232321]">
                    Sale Price
                  </h3>
                  <input
                    {...register("salePrice")}
                    type="number"
                    placeholder="Sale Price"
                    className={`w-full px-4 py-2 border rounded-lg font-inter text-[16px] text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none ${
                      errors.salePrice ? "border-red-500" : "border-gray-800"
                    }`}
                  />
                  {errors.salePrice && (
                    <p className="text-red-500 text-sm mt-1">{errors.salePrice.message}</p>
                  )}
                </div>
              </div>

              {/* Gender */}
              <div className="relative">
                <h3 className="text-[20px] mb-2 font-semibold font-rubik text-[#232321]">
                  Gender
                </h3>
                <select
                  {...register("gender")}
                  className={`w-full px-4 py-2 border rounded-lg font-inter text-[16px] text-gray-700 bg-white focus:border-[#008B28] focus:outline-none ${
                    errors.gender ? "border-red-500" : "border-gray-800"
                  }`}
                >
                  <option value="">Select Gender</option>
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Unisex">Unisex</option>
                </select>
                {errors.gender && (
                  <p className="text-red-500 text-sm mt-1">{errors.gender.message}</p>
                )}
              </div>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="flex flex-col flex-1 gap-6">
            {/* Image Thumbnails */}
            <section className="border-2 border-dashed rounded-lg p-4">
              {uploadedImages.length > 0 ? (
                <div className="grid grid-cols-2 gap-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image.preview}
                        alt={`Uploaded ${index}`}
                        className="w-full h-40 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-40">
                  <p className="text-gray-500">No images uploaded.</p>
                </div>
              )}
            </section>

            {/* Image Upload */}
            <div className="h-40 flex flex-col gap-4 p-4 justify-center items-center border-dashed border-2 border-black rounded-lg relative">
              <label htmlFor="image-upload" className="cursor-pointer">
                <img src={icons.UploadImgIcon} alt="Upload" />
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
                className="w-64 block text-center text-gray-500 text-sm font-semibold cursor-pointer"
              >
                Drop your image here, or browse. JPEG, PNG are allowed
              </label>
              {errors.images && (
                <p className="text-red-500 text-sm mt-1">{errors.images.message}</p>
              )}
            </div>
          </div>
        </div>

        {/* Update/Delete Product Buttons */}
        <div className="flex justify-end gap-4">
          <button
            type="submit"
            disabled={!isValid || submitLoading}
            className={`w-32 h-12 bg-[#232321] flex justify-center items-center rounded-lg text-white px-4 transform transition duration-300 hover:bg-[#008B28] ${
              (!isValid || submitLoading) && "opacity-50 cursor-not-allowed"
            }`}
          >
            {submitLoading ? "Updating..." : "Update"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleteLoading}
            className={`w-32 h-12 bg-red-500 flex justify-center items-center rounded-lg text-white px-4 transform transition duration-300 hover:bg-red-700 ${
              deleteLoading && "opacity-50 cursor-not-allowed"
            }`}
          >
            {deleteLoading ? "Deleting..." : "Delete"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/allproduct")}
            className="w-32 h-12 bg-gray-200 flex justify-center items-center rounded-lg text-gray-700 px-4 transform transition duration-300 hover:bg-gray-300"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductDetail;
