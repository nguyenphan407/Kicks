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
      <Hero />
      <NewDrops />
      <Categories />
      <Reviews />
      <Footer />
    </div>
  );
};

export default LandingPage;
