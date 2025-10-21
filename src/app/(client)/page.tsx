"use client";
import React from "react";

import Navigation from "./_components/header";
import Hero from "./_components/hero";
import SpecialProducts from "./_components/SpecialProducts";
import About from "./_components/About";
import NewsLetter from "./_components/newsLetter";
import Footer from "./_components/Footer";
const HomePage = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <SpecialProducts />
      <About />
      <NewsLetter/>
      <Footer/>
    </>
  );
};

export default HomePage;
