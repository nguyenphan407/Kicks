import React from "react";
import Header from "../Components/Layout/Header";
import Hero from "../Components/Layout/Hero";
import NewDrops from "../Components/Product/NewDrops";
import Categories from "../Components/Categories/Categories";
import Reviews from "../Components/Review/Reviews";
import Footer from "../Components/Layout/Footer";
import NewsletterSignup from "../Components/User/NewsletterSignup";
import RecentProduct from "../Components/Product/RecentProduct";

const LandingPage = () => {
    return (
        <div>
            <div className="container mx-auto">
                <Hero />
                <RecentProduct />
                <NewDrops />
            </div>
            <Categories />
            <div className="container mx-auto">
                <Reviews />
            </div>
        </div>
    );
};

export default LandingPage;
