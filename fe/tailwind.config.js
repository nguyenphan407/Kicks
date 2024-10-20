/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["Open Sans", "sans-serif"], // Sử dụng Open Sans cho font sans
                rubik: ["Rubik", "sans-serif"], // Sử dụng Rubik cho font rubik
            },
            container: {
                center: true, // Căn giữa container
                screens: {
                    sm: "100%", // Chiều rộng đầy đủ cho màn hình nhỏ
                    md: "100%", // Tương tự cho màn hình vừa
                    lg: "1024px", // Chiều rộng cố định cho màn hình lớn
                    xl: "1280px", // Màn hình lớn hơn nữa
                    "2xl": "1320px", // Đặt chiều rộng tối đa cho màn hình rất lớn
                },
            },
        },
    },
    plugins: ["prettier-plugin-tailwindcss"],
};
