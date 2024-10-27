// src/assets/assets.js

// Import icons
import LogoIcon from './icons/logo.svg';
import MenuIcon from './icons/menu_icon.svg';
import SearchIcon from './icons/search_icon.svg';
import UserIcon from './icons/user_icon.svg';

// Import images
import MainHeroImage from './images/mainHero.jpg';
import SecondHeroImage1 from './images/secondHero_1.jpg';
import SecondHeroImage2 from './images/secondHero_2.jpg';
import p1_Img1 from './images/product_id-img1.png';
import p1_Img2 from './images/product_id-img2.png';
import p1_Img3 from './images/product_id-img3.png';
import p1_Img4 from './images/product_id-img4.png';

// Export all icons in a single object
export const icons = {
  LogoIcon,
  MenuIcon,
  SearchIcon,
  UserIcon,
};

// Export all images in a single object
export const images = {
  MainHeroImage,
  SecondHeroImage1,
  SecondHeroImage2,
  p1_Img1,
  p1_Img2,
  p1_Img3,
  p1_Img4,
};

// Define and export products object
export const products = [
  {
    product_id: 1,
    name: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    brand: "Adidas",
    description: "Shadow Navy / Army Green\nThis product is excluded from all promotional discounts and offers.",
    price: 125.00,
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
    description: "Shadow Navy / Army Green\nThis product is excluded from all promotional discounts and offers.",
    price: 125.00,
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
    description: "Shadow Navy / Army Green\nThis product is excluded from all promotional discounts and offers.",
    price: 125.00,
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
    description: "Shadow Navy / Army Green\nThis product is excluded from all promotional discounts and offers.",
    price: 125.00,
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
    description: "Shadow Navy / Army Green\nThis product is excluded from all promotional discounts and offers.",
    price: 125.00,
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
    description: "Shadow Navy / Army Green\nThis product is excluded from all promotional discounts and offers.",
    price: 125.00,
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
    description: "Shadow Navy / Army Green\nThis product is excluded from all promotional discounts and offers.",
    price: 125.00,
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
