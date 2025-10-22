"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getAllProducts } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Loader2 } from "lucide-react";
import { Product } from "@/types";

const Products = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    staleTime: 10 * 1000,
  });

  // ✅ Show loader while fetching
  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <Loader2 className="size-10 animate-spin text-brown-800" />
      </div>
    );
  }

  // ✅ Handle error case
  if (isError) {
    return (
      <div className="text-center py-20 text-red-600">
        Something went wrong while fetching products.
      </div>
    );
  }

  return (
    <section className="bg-[#f5f5f5] px-5 py-14 md:py-20">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <div className="flex items-center justify-center gap-5">
          <Separator className="h-0.5 w-20 bg-brown-900" />
          <h2 className="text-3xl font-bold tracking-tight text-brown-900">
            Products
          </h2>
          <Separator className="h-0.5 w-20 bg-brown-900" />
        </div>

        {/* Product Grid */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {products?.map((product: Product) => (
            <div
              key={product.id}
              className="flex flex-col justify-center gap-5 items-start"
            >
              <Image
                src={`/assets/${product.image}`}
                alt={product.name}
                width={500}
                height={500}
                sizes="100vw"
                className="aspect-square rounded-t-md object-cover shadow-lg hover:scale-105 transition-transform duration-300 hover:cursor-pointer"
              />

              <div className="w-full items-center">
                <p className="text-lg font-semibold text-brown-900">
                  {product.name}
                </p>
                <div className="mt-2 space-x-2">
                  <span className="font-bold">${product.price}</span>
                </div>

                <Link href={`/product/${product.id}`} className="block">
                  <Button className="bg-brown-800 hover:bg-brown-600 w-full mt-3">
                    Buy Now
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
