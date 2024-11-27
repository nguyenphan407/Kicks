// src/assets/assets.js

// Import icons
import LogoIcon from "./icons/logo.svg";
import MenuIcon from "./icons/menu_icon.svg";
import SearchIcon from "./icons/search_icon.svg";
import UserIcon from "./icons/user_icon.svg";
import LogoIconWhite from "./icons/Logo-white.svg";
import CartIcon from "./icons/cart_icon.svg"
import MomoIcon from "./icons/momo-icon.png";
import VisaIcon from "./icons/visa-icon.png"
import CashIcon from "./icons/cash-icon.png"
import OrderIcon from "./icons/order_icon.svg"

// Import images
import MainHeroImage from "./images/mainHero.jpg";
import SecondHeroImage1 from "./images/secondHero_1.jpg";
import SecondHeroImage2 from "./images/secondHero_2.jpg";
import p1_Img1 from "./images/product_id-img1.png";
import p1_Img2 from "./images/product_id-img2.png";
import p1_Img3 from "./images/product_id-img3.png";
import p1_Img4 from "./images/product_id-img4.png";
import LifestyleShoes from "./images/categories-lifestyle.png";
import BasketBall from "./images/categories-basketball.png";
import Running from "./images/categories-running.png";
import Soccer from "./images/categories-soccer.png";
import ReviewImg1 from "./images/review-img1.png";
import ReviewImg2 from "./images/review-img2.png";
import ReviewImg3 from "./images/review-img3.png";
import AvatarUser1 from "./images/avatar-user1.jpg";
import AvatarUser2 from "./images/avatar-user2.png";
import AvatarUser3 from "./images/avatar-user3.jpg";
import Thumbnail from "./images/Thumbnail.jpg"
import SizeChartMen from "./images/sizechart-men.jpg"
import SizeChartWomen from "./images/sizechart-women.jpg"
import MainHero1 from "./images/mainHero1.jpg"
import MainHero2 from "./images/mainHero2.jpg"
import MainHero3 from "./images/mainHero3.jpg"
import MainHero4 from "./images/mainHero4.jpg"
import MainHero5 from "./images/mainHero5.jpg"
import MainHero6 from "./images/mainHero6.jpg"
import MainHero7 from "./images/mainHero7.jpg"





// Export all icons in a single object
export const icons = {
  LogoIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
  LogoIconWhite,
  CartIcon,
  MomoIcon,
  VisaIcon,
  CashIcon,
  OrderIcon
};

// Export all images in a single object
export const images = {
  MainHeroImages: [
    MainHeroImage,
    MainHero1,
    MainHero2,
    MainHero3,
    MainHero5,
    MainHero6,
    MainHero7,
],
  SecondHeroImage1,
  SecondHeroImage2,
  p1_Img1,
  p1_Img2,
  p1_Img3,
  p1_Img4,
  LifestyleShoes,
  BasketBall,
  ReviewImg1,
  ReviewImg2,
  ReviewImg3,
  AvatarUser1,
  AvatarUser2,
  AvatarUser3,
  Thumbnail,
  SizeChartMen,
  SizeChartWomen
};

// Define and export products object
export const products = [
  {
    product_id: 1,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    brand: "Adidas",
    description:
      "Shadow Navy / Army Green\nThis product is excluded from all promotional discounts and offers.",
    price: 125.0,
    stock_quantity: 20,
    size: ["38", "39", "40", "41", "42", "43", "44", "45", "46", "47"], // Available sizes
    color: ["Shadow Navy", "Army Green"], // Available colors
    category_id: 1,
    image: [p1_Img1, p1_Img2, p1_Img3, p1_Img4],
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    product_id: 2,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    brand: "Adidas",
    description:
      "Shadow Navy / Army Green\nThis product is excluded from all promotional discounts and offers.",
    price: 125.0,
    stock_quantity: 20,
    size: ["38", "39", "40", "41", "42", "43", "44", "45", "46", "47"], // Available sizes
    color: ["Shadow Navy", "Army Green"], // Available colors
    category_id: 1,
    image: [p1_Img1, p1_Img2, p1_Img3, p1_Img4],
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    product_id: 3,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    brand: "Adidas",
    description:
      "Shadow Navy / Army Green\nThis product is excluded from all promotional discounts and offers.",
    price: 125.0,
    stock_quantity: 20,
    size: ["38", "39", "40", "41", "42", "43", "44", "45", "46", "47"], // Available sizes
    color: ["Shadow Navy", "Army Green"], // Available colors
    category_id: 1,
    image: [p1_Img1, p1_Img2, p1_Img3, p1_Img4],
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    product_id: 4,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    brand: "Adidas",
    description:
      "Shadow Navy / Army Green\nThis product is excluded from all promotional discounts and offers.",
    price: 125.0,
    stock_quantity: 20,
    size: ["38", "39", "40", "41", "42", "43", "44", "45", "46", "47"], // Available sizes
    color: ["Shadow Navy", "Army Green"], // Available colors
    category_id: 1,
    image: [p1_Img1, p1_Img2, p1_Img3, p1_Img4],
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    product_id: 5,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    brand: "Adidas",
    description:
      "Shadow Navy / Army Green\nThis product is excluded from all promotional discounts and offers.",
    price: 125.0,
    stock_quantity: 20,
    size: ["38", "39", "40", "41", "42", "43", "44", "45", "46", "47"], // Available sizes
    color: ["Shadow Navy", "Army Green"], // Available colors
    category_id: 1,
    image: [p1_Img1, p1_Img2, p1_Img3, p1_Img4],
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    product_id: 6,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    brand: "Adidas",
    description:
      "Shadow Navy / Army Green\nThis product is excluded from all promotional discounts and offers.",
    price: 125.0,
    stock_quantity: 20,
    size: ["38", "39", "40", "41", "42", "43", "44", "45", "46", "47"], // Available sizes
    color: ["Shadow Navy", "Army Green"], // Available colors
    category_id: 1,
    image: [p1_Img1, p1_Img2, p1_Img3, p1_Img4],
    created_at: new Date(),
    updated_at: new Date(),
  },
  {
    product_id: 7,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    brand: "Adidas",
    description:
      "Shadow Navy / Army Green\nThis product is excluded from all promotional discounts and offers.",
    price: 125.0,
    stock_quantity: 20,
    size: ["38", "39", "40", "41", "42", "43", "44", "45", "46", "47"], // Available sizes
    color: ["Shadow Navy", "Army Green"], // Available colors
    category_id: 1,
    image: [p1_Img1, p1_Img2, p1_Img3, p1_Img4],
    created_at: new Date(),
    updated_at: new Date(),
  },
  // Add more products as needed
];

export const categories = [
  {
    category_id: 1,
    category_name: "Lifestyle Shoes",
    image: LifestyleShoes, // Đảm bảo biến này đã được import chính xác
  },
  {
    category_id: 2,
    category_name: "Basketball Shoes",
    image: BasketBall,
  },
  {
    category_id: 3,
    category_name: "Running Shoes",
    image: Running,
  },
  {
    category_id: 4,
    category_name: "Soccer Shoes",
    image: Soccer,
  },
];

// Define and export reviews object
export const reviews = [
  {
    review_id: 1,
    product_id: 1,
    user_id: 1,
    rating: 5,
    review_title: "Good Quality.",
    review_text: "I highly recommend shopping from kicks",
    review_date: new Date(),
    image: ReviewImg1,
    image_avatar: AvatarUser1,
  },
  {
    review_id: 2,
    product_id: 2,
    user_id: 2,
    rating: 4,
    review_title: "Good Quality.",
    review_text: "I highly recommend shopping from kicks",
    review_date: new Date(),
    image: ReviewImg2,
    image_avatar: AvatarUser2,
  },
  {
    review_id: 3,
    product_id: 3,
    user_id: 3,
    rating: 4,
    review_title: "Good Quality.",
    review_text: "I highly recommend shopping from kicks",
    review_date: new Date(),
    image: ReviewImg3,
    image_avatar: AvatarUser3,
  },
];
