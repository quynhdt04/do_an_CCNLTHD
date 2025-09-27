"use client";

import Link from "next/link";
import "swiper/css";
import { useEffect, useState } from "react";
import ProductItem from "@/app/components/ProductItem";
import CategorySub from "@/app/components/CategorySub";

interface Product {
    id: string;
    name: string;
    price: number;
    images: string[];
    discount?: number;
}

export default function ProductPage() {
    const [swipers, setSwipers] = useState<{ [key: string]: any }>({});
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedIndexes, setSelectedIndexes] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        const fakeProducts: Product[] = [
            { id: "product_1", name: "Quần bò", price: 1599000, images: ["/do.jpg", "/vest.png", "/quan.jpg"] },
            { id: "product_2", name: "Áo khoác", price: 1899000, images: ["/vest.png", "/do.jpg", "/quan.jpg"] },
            { id: "product_3", name: "Váy hoa", price: 990000, images: ["/quan.jpg"], discount: 50 },
            { id: "product_4", name: "Váy hoa", price: 990000, images: ["/quan.jpg"], discount: 80 },
            { id: "product_5", name: "Váy hoa", price: 990000, images: ["/quan.jpg"] },
            { id: "product_6", name: "Váy hoa", price: 990000, images: ["/quan.jpg"] },
        ];
        setProducts(fakeProducts);
    }, []);

    return (
        <div className="xl:px-40 lg:px-0 md:px-0 sm:px-5 px-5 py-4">
            <div className="flex items-center justify-between">
                <div className="text-base md:text-lg font-semibold">TẤT CẢ SẢN PHẨM</div>
                <CategorySub />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5">
                {products.map((product) => (
                    <ProductItem
                        key={product.id}
                        product={product}
                        selectedIndexes={selectedIndexes}
                        setSelectedIndexes={setSelectedIndexes}
                        swipers={swipers}
                        setSwipers={setSwipers}
                    />
                ))}
            </div>
        </div>
    );
}
