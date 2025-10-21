"use client";
import React from "react";

import Navigation from "./_components/header";
import Hero from "./_components/hero";
import SpecialProducts from "./_components/SpecialProducts";
import About from "./_components/About";
const HomePage = () => {
  return (
    <>
      <Navigation />
      <Hero />
      <SpecialProducts />
      <About />
    </>
  );
};

export default HomePage;
