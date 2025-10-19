"use client";

import React from "react";
import { DataTable } from "./DataTable";
import { columns } from "./columns";
import { useQuery } from "@tanstack/react-query";
import { getAllProducts } from "@/http/api";
import { Product } from "@/types";
import ProductSheet from "./productSheet";
import { useNewProduct } from "@/store/product/product-store";
import { Loader2 } from "lucide-react";

const ProductPage = () => {
  const { onOpen } = useNewProduct();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => getAllProducts(),
  });
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className=" text-2xl font-bold tracking-tighter">Products</h3>
        <button
          className="sm: border-b-amber-800 bg-slate-400 rounded-md "
          onClick={onOpen}
        >
          Add Product
        </button>
        <ProductSheet />
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-10 z-1">
          <Loader2 className="size-10 animate-spin" />
        </div>
      ) : (
        <DataTable columns={columns} data={products || []} />
      )}

      {isError && (
        <span className="flex items-center justify-center text-red-700">
          Something went wrong
        </span>
      )}
    </>
  );
};

export default ProductPage;
