import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PropTypes from "prop-types"; // Import PropTypes
import { icons } from "../../assets/assets";

const DateRangePicker = ({ onDateChange }) => {
    // Lấy ngày hiện tại và ngày cách đó 7 ngày
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);

    const [startDate, setStartDate] = useState(lastWeek);
    const [endDate, setEndDate] = useState(today);

    const handleDateChange = (dates) => {
        const [start, end] = dates;
        setStartDate(start);
        setEndDate(end);

        if (onDateChange) {
            onDateChange({ startDate: start, endDate: end }); // Gửi dữ liệu ra ngoài
        }
    };

    return (
        <div className="flex items-center gap-2 relative z-10">
            <img src={icons.CalendarIcon} alt="calendar icon" />
            <DatePicker
                selected={startDate}
                onChange={handleDateChange}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                dateFormat="MMM dd, yyyy"
                className="bg-transparent text-[16px] font-semibold w-[210px] outline-none z-[0]"
            />
        </div>
    );
};

// Định nghĩa PropTypes
DateRangePicker.propTypes = {
    onDateChange: PropTypes.func.isRequired, // Bắt buộc phải truyền hàm onDateChange
};

export default DateRangePicker;
