import React, { useState, useEffect, useContext } from "react";
import { ShopConText } from "../../context/ShopContext";
import userApi from "../../apis/userApi";
import { toast } from "react-toastify";

const UpdateUserModal = ({ visible, onClose }) => {
  const { user, setUser } = useContext(ShopConText);
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    password: "",
    password_confirmation: "",
    phone_number: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Current user:", user);
    if (user) {
      setFormData({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        // Không pre-fill password
        password: "",
        password_confirmation: "",
        phone_number: user.phone_number || "",
      });
    }
  }, [user]);

  if (!visible) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      // Kiểm tra nếu password không trống thì cần có password_confirmation
      if (formData.password && formData.password !== formData.password_confirmation) {
        toast.error("Password and confirmation do not match.");
        setLoading(false);
        return;
      }

      const dataToUpdate = {
        user_id: user.user_id,
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone_number: formData.phone_number,
      };

      // Chỉ thêm password nếu người dùng muốn thay đổi
      if (formData.password) {
        dataToUpdate.password = formData.password;
      }

      console.log("Updating user with data:", dataToUpdate);
      const response = await userApi.updateUser(dataToUpdate);
      
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      toast.success("User information has been successfully updated!");
      onClose();
    } catch (error) {
      console.error("Update user failed:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        const errors = Object.values(error.response.data.errors).flat();
        errors.forEach(err => toast.error(err));
      } else {
        toast.error("Failed to update user information. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-11/12 max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Update Information</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm font-medium p-2 focus:ring-primary_blue focus:border-primary_blue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm font-medium p-2 focus:ring-primary_blue focus:border-primary_blue"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter new password"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm font-medium p-2 focus:ring-primary_blue focus:border-primary_blue"
            />
          </div>
          {formData.password && (
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="password_confirmation"
                value={formData.password_confirmation}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm font-medium p-2 focus:ring-primary_blue focus:border-primary_blue"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 font-medium focus:ring-primary_blue focus:border-primary_blue"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary_blue text-white rounded-md hover:bg-primary_blue-dark"
            >
              {loading ? "Updating..." : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUserModal;
