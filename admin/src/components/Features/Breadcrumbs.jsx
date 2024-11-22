import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Breadcrumbs = ({ items }) => {
    return (
        <nav className="text-[16px] text-[#2E2E2D] font-semibold">
            {items.map((item, index) => (
                <span key={index}>
                    {item.link ? (
                        // nếu item có 1 link thì hiển thị nó dưới dạng 1 thẻ NavLink
                        <NavLink to={item.link} className="hover:underline">
                            {item.label}
                        </NavLink>
                    ) : (
                        // nếu không có link thì hiển thị dưới dạng thẻ span
                        <span>{item.label}</span>
                    )}
                    {/* nếu không phải là phần tử cuối cùng */}
                    {index < items.length - 1 && " > "}
                </span>
            ))}
        </nav>
    );
};

Breadcrumbs.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            link: PropTypes.string, // Link của breadcrumb (không bắt buộc)
        })
    ).isRequired,
};

export default Breadcrumbs;
