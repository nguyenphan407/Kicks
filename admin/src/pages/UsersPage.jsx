import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Breadcrumbs from "../components/Features/Breadcrumbs";
import { icons } from "../assets/assets";
import UserCard from "@/components/Cart/UserCard";
import Pagination from "@/components/Pagination";
import { NavLink } from "react-router-dom";
import userApi from "@/apis/userApi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UsersPage = () => {
    const breadcrumbs = [
        { label: "Home", link: "/" },
        { label: "UsersList" },
    ];

    const [users, setUsers] = useState([]); // Trạng thái để lưu trữ danh sách người dùng
    const [loading, setLoading] = useState(true); // Trạng thái để quản lý loading
    const [error, setError] = useState(null); // Trạng thái để quản lý lỗi
    const [filters, setFilters] = useState({
        page: 1,
        // Các bộ lọc khác nếu có
    });
    const [dateRange, setDateRange] = useState({
        startDate: null,
        endDate: null,
    });

    const handleDateChange = (range) => {
        setDateRange(range);
        console.log("Selected Date Range:", range);
    };

    // Hàm để lấy danh sách người dùng
    const fetchUsers = async () => {
        setLoading(true);
        try {
            const params = {
                page: filters.page,
                // Thêm các params khác nếu cần, ví dụ: dateRange
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
            };
            const response = await userApi.getAll(params);
            setUsers(response.data); // Giả sử API trả về dữ liệu trong `data`
            console.log("Fetched Users:", response.data);
        } catch (err) {
            console.error("Failed to fetch users:", err);
            setError(err);
            toast.error("Failed to fetch users.");
        } finally {
            setLoading(false);
        }
    };

    // Gọi API khi component mount và khi các filter thay đổi
    useEffect(() => {
        fetchUsers();
    }, [filters.page, dateRange]); // Thêm các dependencies nếu cần

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [filters.page]);

    // Hàm để cập nhật người dùng
    const handleUserUpdate = async (userId, updatedData) => {
        try {
            const response = await userApi.update({ user_id: userId, ...updatedData });
            if (response.data.message === "No changes were made") {
                toast.info("No changes were detected.");
                return;
            }
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.user_id === userId
                        ? { ...user, ...updatedData, updated_at: new Date().toISOString() }
                        : user
                )
            );
            toast.success("User updated successfully!");
        } catch (error) {
            const errorMessage = error.response?.data?.message || "Failed to update user.";
            toast.error(errorMessage);
            throw error;
        }
    };

    // Framer Motion Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    };

    if (loading) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-rubik text-4xl flex items-center justify-center"
            >
                Loading...
            </motion.div>
        );
    }

    if (error) {
        return (
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-rubik text-4xl flex items-center justify-center"
            >
                Error loading users.
            </motion.div>
        );
    }

    return (
        <div>
            {/* Title */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex justify-between relative items-end pb-6"
            >
                <div>
                    <h1 className="font-rubik text-[24px] font-semibold text-black mb-1">
                        All Users
                    </h1>
                    <Breadcrumbs items={breadcrumbs} />
                </div>
                <div className="z-0">
                    <NavLink
                        to="/addnewuser"
                        className="bg-[#232321] flex items-center justify-between gap-2 px-[26px] py-[15.5px] rounded-[8px]
                        transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.005] active:opacity-90 hover:text-white active:scale-[97%]"
                    >
                        <img src={icons.AddIcon} alt="Add Icon" />
                        <p className="font-rubik text-[14px] font-medium text-white">
                            ADD NEW USER
                        </p>
                    </NavLink>
                </div>
            </motion.div>

            {/* Users List */}
            <motion.section
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="flex flex-col"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
                    {users.map((user) => (
                        <motion.div key={user.user_id} variants={itemVariants}>
                            <UserCard
                                user_id={user.user_id}
                                first_name={user.first_name}
                                last_name={user.last_name}
                                email={user.email}
                                phone_number={user.phone_number}
                                role={user.role}
                                avatar={null}
                                created_at={user.created_at}
                                updated_at={user.updated_at}
                                onUserUpdate={handleUserUpdate}
                            />
                        </motion.div>
                    ))}
                </div>
            </motion.section>

            {/* Toast Notifications */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default UsersPage;
