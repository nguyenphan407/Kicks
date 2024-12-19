// UserCard.jsx
import React, { useState } from "react";
import { icons } from "@/assets/assets"; // Đảm bảo đường dẫn đúng đến icons
import UpdateUserModal from "@/components/user/UpdateUserModal"; // Đảm bảo đường dẫn đúng

const UserCard = ({
    user_id,
    first_name,
    last_name,
    email,
    phone_number,
    role,
    avatar,
    created_at,
    updated_at,
    onUserUpdate, // Hàm callback khi người dùng được cập nhật
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fullName = `${first_name} ${last_name}`.trim();
    const formattedCreatedAt = new Date(created_at).toLocaleDateString();
    const formattedUpdatedAt = new Date(updated_at).toLocaleDateString();

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleUpdate = async (updatedData) => {
        try {
            console.log("Handle Update in UserCard - Updated Data:", updatedData);
            // Gọi hàm callback để cập nhật người dùng với user_id và updatedData
            await onUserUpdate(user_id, updatedData);
            // Có thể thêm thông báo thành công tại đây nếu cần
        } catch (error) {
            console.error("Failed to update user in UserCard:", error);
            // Có thể thêm thông báo lỗi tại đây nếu cần
        }
    };

    return (
        <div
            className="bg-white h-auto rounded-[16px] p-4 flex flex-col gap-4
                transition-all duration-300 ease-in-out"
        >
            {/* Phần thông tin người dùng */}
            <div className="flex justify-between items-start">
                <img
                    src={avatar || icons.UserIcon} // Sử dụng avatar nếu có, nếu không sử dụng hình mặc định
                    alt={fullName}
                    className="rounded-[8px] w-[60px] h-[60px] object-cover"
                />
                <div className="flex flex-col flex-1 ml-4">
                    <h3 className="text-[16px] font-semibold text-[#232321] limit-row">
                        {fullName || "No Name"}
                    </h3>
                    <p className="text-[14px] font-semibold text-[#646464] mb-2">
                        {email}
                    </p>
                    <p className="text-[14px] font-semibold text-[#646464]">
                        {phone_number || "No Phone Number"}
                    </p>
                </div>
                <button
                    className="px-2 py-3 rounded-[4px] bg-[#F3F3F3] hover:bg-gray-400 transition-all"
                    onClick={handleOpenModal}
                >
                    <img src={icons.DotsThreeBgIcon} alt="Actions" />
                </button>
            </div>

            {/* Phần Role */}
            <div>
                <h4 className="text-[16px] font-semibold text-[#232321] mb-1">
                    Role
                </h4>
                <p className="text-[14px] font-normal text-[#797978] limit-row">
                    {role.charAt(0).toUpperCase() + role.slice(1)}
                </p>
            </div>

            {/* Phần Thời gian tạo và cập nhật */}
            <div className="flex flex-col p-4 border border-[#BABAB9] rounded-[8px]">
                <div className="flex justify-between items-center text-[14px] font-semibold text-[#232321] pb-2 border-b border-b-[#BABAB9]">
                    <span>Created At</span>
                    <span className="text-[#646464] text-[14px] font-semibold">
                        {formattedCreatedAt}
                    </span>
                </div>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-[14px] font-semibold text-[#232321]">
                        Updated At
                    </span>
                    <span className="text-[#646464] text-[14px] font-semibold">
                        {formattedUpdatedAt}
                    </span>
                </div>
            </div>

            {/* Modal cập nhật thông tin người dùng */}
            <UpdateUserModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                user={{
                    user_id, // Thêm user_id vào đây nếu cần
                    first_name,
                    last_name,
                    // email,
                    phone_number,
                    role,
                }}
                onUpdate={handleUpdate}
            />
        </div>
    );
};

export default UserCard;
