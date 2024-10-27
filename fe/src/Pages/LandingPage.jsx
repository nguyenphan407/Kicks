import React from 'react';
import Header from '../Components/Header';
import Hero from '../Components/Hero';
import NewDrops from '../Components/NewDrops';
import Categories from '../Components/Categories';
import Reviews from '../Components/Reviews';
import Footer from '../Components/Footer';

const LandingPage = () => {
  return (
    <div>
      <div className="container mx-auto">
        <Hero />
        <NewDrops />
      </div>
      <Categories />
      <div className="container mx-auto">
        <Reviews />
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
