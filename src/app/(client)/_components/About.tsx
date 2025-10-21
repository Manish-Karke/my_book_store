import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import React from "react";

const About = () => {
  return (
    <section className="max-w-6xl mx-auto px-5 md:py-20 py-14">
      <div className="px-10 py-14 rounded-t-[3rem] bg-gradient-to-b from-gray-200 to-transparent max-w-4xl mx-auto flex justify-center items-center flex-col">
        <div className="flex justify-center items-center flex-col">
          <Separator className="w-20 bg-brown-900 h-0.5 " />
          <h2 className="text-brown-900 text-3xl font-bold tracking-tight">
            Special Products
          </h2>
          <Separator className="w-20 bg-brown-900 h-0.5" />
        </div>
        <p className="text-center mt-10 w-10/12">
          ChocoApp is redefining chocolate delivery — where speed meets
          sophistication. We partner with top chocolatiers and local artisans to
          ensure every bite you receive is rich, fresh, and unforgettable.
          Whether it’s a late-night craving or a moment worth celebrating,
          ChocoApp delivers indulgence in minutes — because life’s sweetest
          pleasures shouldn’t wait.
        </p>
      <Button className="mt-10 mx-30 bg-brown-800 hover:bg-brown-900 active:bg-brown-600 px-8">
        Shop Now
      </Button>
      </div>

    </section>
  );
};

export default About;
