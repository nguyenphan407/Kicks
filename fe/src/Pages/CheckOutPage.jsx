/* eslint-disable react/no-unescaped-entities */
import React, { useContext, useState, useEffect } from "react";
import { ShopConText } from "../context/ShopContext";
import { Link, NavLink } from "react-router-dom";
import { icons} from "../assets/assets"
import Modal from "../Components/Modal";

const CheckOutPage = () => {
    const [selectedOption, setSelectedOption] = useState("Standard Delivery");

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
    };
    
    const [selectedOptionPayment, setSelectedOptionPayment] = useState("Payment via Momo e-wallet");

    const handleOptionSelectPayment = (option) => {
        setSelectedOptionPayment(option);
    };
    const {
        products,
        currency,
        cartItems,
        getCartAmount,
        getCartCount,
        delivery_fee,
        navigate,
    } = useContext(ShopConText);
    const [cartData, setCartData] = useState([]);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => setIsModalOpen(false);

    const handleConfirm = async () => {
        setIsModalOpen(false);
        //alert("Proceeding to Payment...");
        // Thực hiện các bước tiếp theo, như điều hướng sang trang thanh toán.
        try {
            const productData = {
                productName: "Khóa Học Advanced",
                description: "Thanh toán đơn hàng",
                returnUrl: "https://effortless-english-red.vercel.app/success",
                cancelUrl: "https://effortless-english-red.vercel.app/cancel",
                price: 2000,
            };

            const response = await fetch(
              "http://localhost:8000/api/payment/create-payment-link",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(productData),
              }
            );
      
            const textResponse = await response.text();
      
            if (textResponse) {
              window.location.href = textResponse; // Chuyển hướng tới đường dẫn
            } else {
              console.error("Link không tồn tại trong dữ liệu trả về");
            }
          } catch (error) {
            console.error("Có lỗi xảy ra:", error);
          }
    };

    useEffect(() => {
        const tempData = [];
        for (const productId in cartItems) {
            for (const size in cartItems[productId]) {
                if (cartItems[productId][size] > 0) {
                    tempData.push({
                        product_id: productId,
                        size: size,
                        quantity: cartItems[productId][size],
                    });
                }
            }
        }
        setCartData(tempData);
    }, [cartItems]);
    return (
        // div: phải đặt display thì mới dùng được justify-start items-center (kiến thức flexbox)
        // Không dùng padding để căn lề
        // div cần có container bọc lại để căn lề. (Nó được cấu hình trong file tailwind.config)
        // đặt flex và flex-col-reverse lg:flex-row để xếp ngang trên desktop xếp dọc theo hướng ngược lại trên mobile
        <div className="h-auto container flex flex-col-reverse lg:flex-row  justify-between mt-8">
            {/* Contact & Order */}
            {/* gap trên mobile khác gap trên desktop */}
            <section className="flex flex-col lg:flex-row gap-5 lg:gap-8 mb-6 lg:mb-12">
                <section className="flex flex-col gap-5 lg:gap-8 w-full rounded-lg">
                    {/* Ở đây đăng nhập nên cần bọc nó để router sang trang login */}
                    <NavLink to="/login">
                        {/* thêm decoration để chỉnh độ giày của underline */}
                        {/* font-size mobile khác desktop */}
                        <h2 className="text-[16px] lg:text-xl font-semibold underline decoration-1 max-w-[253px] pb-[1px] ">
                            Login and Checkout faster
                        </h2>
                    </NavLink>

                    {/* Contact Details */}
                    <div>
                        {/* cái nào có font rubik thì thêm vào */}
                        {/* Kích thước h3 bị sai so với thiết kế, desktop là 32px trong khi text-3xl là 30px */}
                        {/* Nếu không có kích cỡ mặc định thì đặt px tùy chỉnh */}
                        {/* Thiếu margin bottom vì h3 cách thẻ dưới nó 8px */}
                        <h3 className="font-rubik text-2xl lg:text-[32px] font-semibold mb-2">
                            Contact Details
                        </h3>
                        {/* p này cách thẻ dưới nó trên desktop là 32px, trên mobile là 20px */}
                        <p className="opacity-80 text-sm lg:text-base font-semibold mb-5 lg:mb-8">
                            We will use these details to keep you informed about
                            your delivery.
                        </p>
                        <input
                            type="email"
                            placeholder="Email"
                            // chiều rộng không đúng theo thiết kế là 342px khi active nó có viền xanh và bỏ outline đi
                            // để ý cái padding theo chiều dọc là py, trong thiết kế nó để là 10 nhưng thực tế khi đo phải tính luôn từ đầu cho đến viền chữ
                            // dùng cái chế độ ruler để đo
                            className="w-full lg:w-[342px] h-12 px-4 py-[14.5px] border border-gray-800 rounded-lg text-sm text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                        />
                    </div>

                    {/* Shipping Address */}
                    {/* Không đặt height cho thẻ bọc này, mình xét kích thước cho các thẻ con thì thẻ bọc nó tự giản ra, đặt kích thước như vậy thì nó sẽ bị dư nếu như chiều cao các thẻ con cộng lại không lớn hơn chiều rộng mình xét */}
                    {/* gap trên mobile chỉ là 16px */}
                    <section className="flex-col justify-start items-start lg:gap-8 inline-flex">
                        {/* bỏ cái text-neutral-800 đi nha, thêm font-rubik vào, tương tự ở trên cho thẻ này, text là 32 không phải 30 */}
                        {/* Chưa đặt màu cho text, màu "dark gray" nó có màu mặc định cài sẵn rồi */}
                        <h3 className="font-rubik text-2xl lg:text-[32px] font-semibold text-secondary_black">
                            Shipping Address
                        </h3>

                        {/* đặt flex và chiều flex (flex-col) rồi sau đó mới xét gap được, gap mobile khác trên desktop */}
                        {/* Đặt width full trên mobile để các thẻ input nó giản ra hết ở vừa khung khi ở trên mobile, đặt kích thước cố định 
                        trên desktop */}
                        <section className="flex flex-col gap-4 lg:gap-5 w-full lg:w-[704px] ">
                            <div className="flex w-full flex-col md:flex-row gap-4 mt-2">
                                {/* Mấy cái input này tương tự như đã note ở trên */}
                                <input
                                    type="text"
                                    placeholder="First Name*"
                                    className="w-full flex-1 lg:w-[342px] h-12 px-4 py-[14.5px] border border-gray-800 rounded-lg text-sm text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                />
                                <input
                                    type="text"
                                    placeholder="Last Name*"
                                    className="w-full lg:w-[342px] h-12 px-4 py-[14.5px] border border-gray-800 rounded-lg text-sm text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                />
                            </div>
                            {/* Vì dùng gap nên bỏ margin top đi, khuyến khích dùng gap nếu được, vì nó dễ làm responsive */}
                            <div>
                                <input
                                    type="text"
                                    placeholder="Find Delivery Address*"
                                    className="w-full flex flex-1 lg:w-[342px] h-12 px-4 py-[14.5px] border border-gray-800 rounded-lg text-sm text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                />
                                <p className="text-neutral-700 text-xs mt-1">
                                    Start typing your street address or zip code
                                    for suggestions
                                </p>
                            </div>
                            <div className="relative">
                                <input
                                    type="tel"
                                    placeholder="Phone Number*"
                                    className="w-full flex flex-1 lg:w-[342px] h-12 px-4 py-[14.5px] border border-gray-800 rounded-lg text-sm text-gray-700 bg-transparent focus:border-[#008B28] focus:outline-none"
                                />
                                <p className="text-xs text-gray-700 mt-1">
                                    E.g. (123) 456-7890
                                </p>
                            </div>
                        </section>
                    </section>
                    {/* Delivery Options */}
                    {/* Cái lg:w-3/5 là sao, không dùng gap ở đây được nha, gap các hàng khác nhau thì sao lại dùng gap, gap là cách đều nhau mà */}
                    {/* Bỏ inline-flex, bỏ padding left (pl-6) */}
                    <section className="flex flex-col">
                        {/* Cái thẻ h3 này note tương tự như trên */}
                        {/* vì không dùng gap nên dùng margin bottom */}
                        <h3 className="font-rubik text-2xl lg:text-[32px] font-semibold text-secondary_black mb-4 lg:mb-8">
                            Delivery Options
                        </h3>
                        {/* Không đặt height chỗ này nha, bỏ h-52, đặt width chỗ này, khi width của thẻ cha đặt cố định, thẻ con chỉ cần cho width full và flex-1 là nó sẽ chiếm hết không gian hiện có */}
                        {/* Đặt width full trên mobile để nó chiếm full và đặt width cố định trên desktop */}
                        <section className="flex-col justify-start items-start gap-6 inline-flex w-full lg:w-[782px]">
                            <div
                                // chỗ này sai border-radius theo thiết kế rồi nha, 16 chứ không phải 12, 12 trên mobile thôi
                                className={`w-full p-4 rounded-xl lg:rounded-2xl flex justify-between items-start cursor-pointer ${
                                    selectedOption === "Standard Delivery"
                                        ? "bg-[#FAFAFA]"
                                        : "border border-[#232321]"
                                }`}
                                onClick={() =>
                                    handleOptionSelect("Standard Delivery")
                                }
                            >
                                {/* tạo thêm 1 thẻ div bọc lại và đặt flex và gap ở đây để giá và title có khoảng cách với nhau theo thiết kế tránh sát nhau đặt sát nhau*/}
                                <div className="flex justify-between gap-2">
                                    {/* Đặt width cục này để nó căn lề ra 2 bên chuẩn */}
                                    <div className="lg:w-[684px]">
                                        <h3 className=" font-rubik text-[#232321] text-xl lg:text-2xl font-semibold">
                                            Standard Delivery
                                        </h3>
                                        <p className="opacity-80 text-[#232321] text-sm lg:text-base font-semibold">
                                            Enter your address to see when
                                            you'll get your order
                                        </p>
                                    </div>
                                    {/* Thiếu font-rubik ở thẻ span, dùng các biến toàn cục là đơn vị tiền và tiền vận chuyển */}
                                    {/* text trên mobile là 16, không phải 18 */}
                                    <span className="font-rubik text-[#4A69E2] text-[16px] lg:text-xl font-semibold">
                                        {currency}
                                        {delivery_fee}
                                    </span>
                                </div>
                            </div>
                            <div
                                className={`w-full p-4 rounded-xl flex justify-between items-start cursor-pointer ${
                                    selectedOption === "Collect in Store"
                                        ? "bg-[#FAFAFA]"
                                        : "border border-[#232321]"
                                }`}
                                onClick={() =>
                                    handleOptionSelect("Collect in Store")
                                }
                            >
                                <div>
                                    <h3 className="font-rubik text-[#232321] text-xl lg:text-2xl font-semibold">
                                        Collect in store
                                    </h3>
                                    <p className="opacity-80 text-[#232321] text-sm lg:text-base font-semibold">
                                        Pay now, collect in store
                                    </p>
                                </div>
                                {/* text trên mobile là 16, không phải 18 */}
                                <span className="font-rubik text-[#232321] text-[16px] lg:text-xl font-semibold">
                                    Free
                                </span>
                            </div>
                        </section>
                    </section>


                    <section className="flex flex-col">
                        {/* Cái thẻ h3 này note tương tự như trên */}
                        {/* vì không dùng gap nên dùng margin bottom */}
                        <h3 className="font-rubik text-2xl lg:text-[32px] font-semibold text-secondary_black mb-4 lg:mb-8">
                        Payment Method
                        </h3>
                        {/* Không đặt height chỗ này nha, bỏ h-52, đặt width chỗ này, khi width của thẻ cha đặt cố định, thẻ con chỉ cần cho width full và flex-1 là nó sẽ chiếm hết không gian hiện có */}
                        {/* Đặt width full trên mobile để nó chiếm full và đặt width cố định trên desktop */}
                        <section className="flex-col justify-start items-start gap-6 inline-flex w-full lg:w-[782px]">
                            <div
                                // chỗ này sai border-radius theo thiết kế rồi nha, 16 chứ không phải 12, 12 trên mobile thôi
                                className={`w-full p-4 rounded-xl lg:rounded-2xl flex justify-between items-start cursor-pointer ${
                                    selectedOptionPayment === "Momo e-wallet"
                                        ? "bg-[#FAFAFA]"
                                        : "border border-[#232321]"
                                }`}
                                onClick={() =>
                                    handleOptionSelectPayment("Momo e-wallet")
                                }
                            >
                                {/* tạo thêm 1 thẻ div bọc lại và đặt flex và gap ở đây để giá và title có khoảng cách với nhau theo thiết kế tránh sát nhau đặt sát nhau*/}
                                <div className="flex justify-between gap-2">
                                    {/* Đặt width cục này để nó căn lề ra 2 bên chuẩn */}
                                    <div className="lg:w-[684px]">
                                        <h3 className=" font-rubik text-[#232321] text-xl lg:text-2xl font-semibold">
                                        Momo e-wallet
                                        </h3>
                                        <p className="opacity-80 text-[#232321] text-sm lg:text-base font-semibold">
                                        Secure payment via Momo. Enter address for delivery time.
                                        </p>
                                    </div>
                                    {/* Thiếu font-rubik ở thẻ span, dùng các biến toàn cục là đơn vị tiền và tiền vận chuyển */}
                                    {/* text trên mobile là 16, không phải 18 */}
                                    <img src={icons.MomoIcon} alt="" className="max-w-[58px]"/>
                                </div>
                            </div>
                            <div
                                className={`w-full p-4 rounded-xl flex justify-between items-start cursor-pointer ${
                                    selectedOptionPayment === "Cart Bank"
                                        ? "bg-[#FAFAFA]"
                                        : "border border-[#232321]"
                                }`}
                                onClick={() =>
                                    handleOptionSelectPayment("Cart Bank")
                                }
                            >
                                <div>
                                    <h3 className="font-rubik text-[#232321] text-xl lg:text-2xl font-semibold">
                                    Cart Bank
                                    </h3>
                                    <p className="opacity-80 text-[#232321] text-sm lg:text-base font-semibold">
                                    Pay by bank card. Quick in-store pickup.
                                    </p>
                                </div>
                                {/* text trên mobile là 16, không phải 18 */}
                                <img src={icons.VisaIcon} alt="" className="max-w-[58px]"/>
                            </div>
                            <div
                                className={`w-full p-4 rounded-xl flex justify-between items-start cursor-pointer ${
                                    selectedOptionPayment === "Cash on Delivery"
                                        ? "bg-[#FAFAFA]"
                                        : "border border-[#232321]"
                                }`}
                                onClick={() =>
                                    handleOptionSelectPayment("Cash on Delivery")
                                }
                            >
                                <div>
                                    <h3 className="font-rubik text-[#232321] text-xl lg:text-2xl font-semibold">
                                    Cash on Delivery
                                    </h3>
                                    <p className="opacity-80 text-[#232321] text-sm lg:text-base font-semibold">
                                    Pay cash upon pickup. Ideal for in-store orders.
                                    </p>
                                </div>
                                {/* text trên mobile là 16, không phải 18 */}
                                <img src={icons.CashIcon} alt="" className="max-w-[58px]" />
                            </div>
                        </section>
                    </section>

                    {/* Checkbox Section */}
                    {/* Tương tự, không đặt padding ở đây. Tương tự, thẻ cha đã có gap, thì bỏ margin top, bỏ luôn space-y-2*/}
                    {/* đặt flex và xét flex thành col ở đây để đặt gap, vì các phần tử cách đều nhau trên mobile là 16px trên desktop là 24px */}
                    <section className="flex flex-col gap-4 lg:gap-6">
                        {/* tham khảo các checkbox của tui */}
                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2 w-4 h-4 outline-none border-2 border-gray-400 rounded-sm accent-[#1F1A24]"
                            />
                            <span className="text-secondary_black text-x[16px] font-semibold">
                                My billing and delivery information are the same
                            </span>
                        </label>

                        <label className="flex items-center">
                            <input
                                type="checkbox"
                                className="mr-2 w-4 h-4 outline-none border-2 border-gray-400 rounded-sm accent-[#1F1A24]"
                            />
                            <span className="text-secondary_black text-x[16px] font-semibold">
                                I'm 13+ year old
                            </span>
                        </label>
                        {/* thiếu thẻ p title ở đây */}
                        <div>
                            <p className="font-rubik text-secondary_black  text-[16px] font-semibold">
                                Also want product updates with our newsletter?
                            </p>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    className="mr-2 w-4 h-4 outline-none border-2 border-gray-400 rounded-sm accent-[#1F1A24]"
                                />
                                <span className="text-secondary_black text-x[16px] font-semibold">
                                    Yes, I'd like to receive emails about
                                    exclusive sales and more.
                                </span>
                            </label>
                        </div>
                    </section>

                    {/* Review and Pay Button */}
                    {/* Xem kĩ cách làm cái button này */}
                    <button className="w-full lg:w-[362px] bg-secondary_black flex justify-between lg:justify-center rounded-lg text-white px-4 py-[15.5px]
                    
                    transform transition duration-400 hover:bg-primary_blue uppercase hover:scale-[1.003] hover:text-white active:scale-[99%]"
                            onClick={handleOpenModal}
                    >
                        <p className="font-rubik text-[14px] font-medium">REVIEW AND PAY</p>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            // cho nó ẩn ở trên desktop và hiện trên mobile
                            className="block lg:hidden"
                        >
                            <path
                                d="M8.375 3.5L12.875 8L8.375 12.5M12.25 8H3.125"
                                stroke="white"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </button>
                    {/* Trên mobile nó có icon nữa */}
                </section>
            </section>

            {/* Order Summary & Details */}
            {/* Để ý ở đây trên mobile flex cái order detail nó nằm ở trên nên ta đảo ngược thứ tự cột lại trên mobile */}
            <aside className="flex flex-col-reverse lg:flex-col gap-6 lg:gap-[47px] ml-2">
                {/* Order Summary*/}
                <div className="bg-white rounded-3xl p-4 lg:p-6 w-full lg:w-[418px]">
                    <h2 className="font-rubik text-[20px] lg:text-[32px] font-semibold text-[#232321] mb-2">
                        Order Summary
                    </h2>
                    <div className="flex flex-col gap-4">
                        <div className="flex justify-between items-center">
                            <p className="text-[#232321] text-[16px] lg:text-xl font-semibold ">
                                {getCartCount() + " "} ITEM
                            </p>
                            <p className="text-[16px] lg:text-xl font-semibold text-[#4a4a47]">
                                {currency}
                                {getCartAmount()}
                            </p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-[#232321] text-[16px] lg:text-xl font-semibold">
                                Delivery
                            </p>
                            <p className="text-[16px] lg:text-xl font-semibold text-[#4a4a47]">
                                {currency}
                                {delivery_fee}
                            </p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-[#232321] text-[16px] lg:text-xl font-semibold">
                                Sales Tax
                            </p>
                            <p className="text-[16px] lg:text-xl font-semibold text-[#4a4a47]">
                                -
                            </p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="font-rubik text-xl lg:text-[24px] font-semibold">
                                Total
                            </p>
                            <p className="font-rubik text-xl lg:text-[24px] font-semibold text-[#4a4a47]">
                                {currency}
                                {getCartAmount() === 0
                                    ? 0
                                    : Number(getCartAmount()) +
                                      Number(delivery_fee)}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Order Details*/}
                {/* Bỏ shadow đi, bỏ max-width đi */}
                <div className="bg-white p-6 rounded-2xl w-full lg:w-[418px]">
                    <h2 className="font-rubik text-2xl font-semibold mb-6 leading-5">
                        Order Details
                    </h2>
                    <div className="flex flex-col gap-6">
                    {cartData.map((item, index) => {
                        const productData = products.find(
                            (product) =>
                                String(product.product_id) ===
                                String(item.product_id)
                        );
                        console.log("Product Data:", productData); // Log để kiểm tra từng sản phẩm
                        return (
                            <div key={index} className="flex gap-6 h-full">
                                <img
                                    className="rounded-xl lg:rounded-3xl object-cover max-w-[157px] lg:max-h-[157px] lg:max-w-[138px] border border-[#e6e6e6]"
                                    src={productData.images[0]}
                                    alt="Product Image"
                                />
                                <div className="flex flex-col justify-between flex-1">
                                    <div className="flex flex-col justify-between items-start">
                                        <div className="max-w-[350px]">
                                            <h3 className="font-rubik font-semibold text-[16px] lg:text-[20px] uppercase text-[#232321]">
                                                {productData.name}
                                            </h3>
                                            <p className="opacity-80 text-[#4e4e4c] text-[14px] lg:text-[16px] font-semibold mb-2 lg:mb-2">
                                                {productData.description}
                                            </p>
                                            <div className="flex  justify-between lg:justify-start gap-2 lg:gap-10">
                                                <div className="flex gap-2 justify-center items-center">
                                                    <p className="opacity-80 text-[#4e4e4c] text-[14px] lg:text-[16px] font-semibold ">
                                                        Size {item.size}
                                                    </p>
                                                </div>
                                                <div className="flex gap-2 justify-center items-center">
                                                    <p className="opacity-80 text-[#4e4e4c] text-[14px] lg:text-[16px] font-semibold">
                                                        Quantity {item.quantity}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <p className="font-rubik text-[16px] my-2 lg:my-0 lg:text-[20px] font-semibold text-primary_blue">
                                            {currency}
                                            {productData.price}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                    </div>
                </div>
            </aside>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleConfirm}
                userData={{
                    firstName: "Nguyen",
                    lastName: "Phan",
                    email: "phn040704@gmail.com",
                    phoneNumber: "0961187213",
                    deliveryAddress: "20b Ling Trung"
                }}
            />
        </div>
    );
};

export default CheckOutPage;
