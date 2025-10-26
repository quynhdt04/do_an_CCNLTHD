"use client";

import productService from "@/services/productService";
import { Product } from "@/types/product.type";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setLoading(true);

        const data = await productService.getAll();

        if (data && data.products) {
          setProducts(data.products);
        } 
      } catch (err: any) {
        console.error("Error fetching products:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAPI();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  console.log("product: ", products);

  return <></>;
}
