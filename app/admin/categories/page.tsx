"use client";

import categoryService from "@/services/categoryService";
import { Category, CategoryListResponse } from "@/types/category.type";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const [categories, setCategories] = useState<CategoryListResponse>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAPI = async () => {
      try {
        setLoading(true);
        const res = await categoryService.getAll();
        if (res) {
          setCategories(res);
        }
      } catch (error) {
        throw error;
      } finally {
        setLoading(false);
      }
    };
    fetchAPI();
  }, []);

  if (loading) {
    return <div>Loading categories...</div>;
  }

  console.log("categories: ", categories);

  return <></>;
}
