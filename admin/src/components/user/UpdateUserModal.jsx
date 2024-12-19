// UpdateUserModal.jsx
import React, { useState, useEffect } from "react";
import { icons } from "@/assets/assets"; // Đảm bảo đường dẫn đúng đến icons

const UpdateUserModal = ({ isOpen, onClose, user, onUpdate }) => {
    const [formData, setFormData] = useState({
        first_name: user.first_name || "",
        last_name: user.last_name || "",
        // email: user.email || "",
        phone_number: user.phone_number || "",
        role: user.role || "customer",
    });

    // Cập nhật formData khi người dùng thay đổi thông tin trong modal
    useEffect(() => {
        if (user) {
            setFormData({
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                // email: user.email || "",
                phone_number: user.phone_number || "",
                role: user.role || "customer",
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Submitting Update - User ID:", user.user_id);
        console.log("Form Data:", formData);
        // Gọi hàm onUpdate chỉ với formData
        await onUpdate(formData);
        onClose(); // Đóng modal sau khi cập nhật
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl w-1/3 p-6 relative">
                {/* Nút đóng modal */}
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
                    onClick={onClose}
                >
                    <img src={icons.ErrorCircle} alt="Close" />
                </button>

                <h2 className="text-2xl mb-4 font-rubik font-medium">Update User</h2>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-gray-700 font-semibold">First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            value={formData.first_name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded font-semibold"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            value={formData.last_name}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded font-semibold"
                        />
                    </div>
                    {/* <div>
                        <label className="block text-gray-700 font-semibold">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded font-semibold"
                            required
                        />
                    </div> */}
                    <div>
                        <label className="block text-gray-700 font-semibold">Phone Number</label>
                        <input
                            type="text"
                            name="phone_number"
                            value={formData.phone_number}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded font-semibold"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 font-semibold">Role</label>
                        <select
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="w-full border border-gray-300 p-2 rounded font-semibold"
                        >
                            <option value="admin">Admin</option>
                            <option value="customer">Customer</option>
                        </select>
                    </div>
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 active:scale-95 transition-all font-rubik font-medium"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-[#4A69E2] text-white rounded-md hover:opacity-85 active:scale-95 transition-all font-rubik font-medium"
                        >
                            Update
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateUserModal;
 