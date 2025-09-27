"use client";

import ProductItem from "@/app/components/ProductItem";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Product {
    id: string;
    name: string;
    price: number;
    images: string[];
    discount?: number;
}

export default function Cart() {
    const [quantity, setQuantity] = useState(1);

    const [swipers, setSwipers] = useState<{ [key: string]: any }>({});
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedIndexes, setSelectedIndexes] = useState<{ [key: string]: number }>({});

    const handleDecrease = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 1) value = 1;
        setQuantity(value);
    };

    useEffect(() => {
        const fakeProducts: Product[] = [
            { id: "product_1", name: "Quần bò", price: 1599000, images: ["/do.jpg", "/vest.png", "/quan.jpg"] },
            { id: "product_2", name: "Áo khoác", price: 1899000, images: ["/vest.png", "/do.jpg", "/quan.jpg"] },
            { id: "product_3", name: "Váy hoa", price: 990000, images: ["/quan.jpg", "/vest.png"], discount: 50 },
            { id: "product_4", name: "Váy hoa", price: 990000, images: ["/quan.jpg"], discount: 80 },
        ];
        setProducts(fakeProducts);
    }, []);
    return (
        <>
            <div className="xl:px-40 lg:px-0 md:px-0 sm:px-5 px-5 py-4">
                <div className="flex flex-col items-center justify-center space-y-2 md:space-y-4 py-10">
                    <span className="text-xl md:text-4xl font-semibold">
                        Giỏ hàng của bạn
                    </span>
                    <span className="text-sm font-semibold text-gray-500 capitalize">
                        có 3 sản phẩm trong giỏ hàng
                    </span>
                </div>
                <table className="w-full border border-gray-100 table-auto hidden md:table">
                    <thead className="border border-gray-100 bg-[#F9F9F9]">
                        <tr>
                            <th className="p-2 text-left">Sản phẩm</th>
                            <th className="p-2 text-center">Mô tả</th>
                            <th className="p-2 text-center">Đơn giá</th>
                            <th className="p-2 text-center">Số lượng</th>
                            <th className="p-2 text-center">Tổng</th>
                            <th className="p-2 text-center">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-gray-100">
                            <td className="p-2 text-center align-middle">
                                <Image src="/vest.png" alt="vest" width={80} height={100} />
                            </td>
                            <td className="p-2 text-center align-middle whitespace-normal break-words w-[300px]">
                                <Link
                                    href="/products/123"
                                    className="text-xs text-blue-500 font-semibold"
                                >
                                    Áo khoác vest dài tay cơ bản giao một hàng khuy - Xám - S
                                </Link>
                            </td>
                            <td className="p-2 text-center align-middle">
                                <span className="text-xs font-semibold">1.502.000 vnđ</span>
                            </td>
                            <td className="p-2 text-center align-middle">
                                <div className="flex items-center justify-center gap-1">
                                    <button
                                        type="button"
                                        aria-label="Giảm số lượng"
                                        onClick={handleDecrease}
                                        className="w-6 h-6 flex items-center justify-center rounded border bg-white text-gray-600 hover:bg-gray-100 active:scale-95 cursor-pointer text-sm"
                                    >
                                        -
                                    </button>

                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={handleChange}
                                        className="w-8 h-6 text-center rounded border text-sm focus:outline-none focus:ring-1 focus:ring-blue-400
                                            [appearance:textfield] 
                                            [&::-webkit-outer-spin-button]:appearance-none 
                                            [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <button
                                        type="button"
                                        aria-label="Tăng số lượng"
                                        onClick={handleIncrease}
                                        className="w-6 h-6 flex items-center justify-center rounded border bg-white text-gray-600 hover:bg-gray-100 active:scale-95 cursor-pointer text-sm"
                                    >
                                        +
                                    </button>
                                </div>

                            </td>
                            <td className="p-2 text-center align-middle">
                                <span className="text-xs font-semibold">3.004.000 vnđ</span>
                            </td>
                            <td className="p-2 text-center align-middle">
                                <button className="text-xs text-blue-500 font-semibold">Xóa</button>
                            </td>
                        </tr>
                        <tr className="border-t border-gray-100">
                            <td className="p-2 text-center align-middle">
                                <Image src="/vest.png" alt="vest" width={80} height={100} />
                            </td>
                            <td className="p-2 text-center align-middle whitespace-normal break-words w-[300px]">
                                <Link
                                    href="/products/123"
                                    className="text-xs text-blue-500 font-semibold"
                                >
                                    Áo khoác vest dài tay cơ bản giao một hàng khuy - Xám - S
                                </Link>
                            </td>
                            <td className="p-2 text-center align-middle">
                                <span className="text-xs font-semibold">1.502.000 vnđ</span>
                            </td>
                            <td className="p-2 text-center align-middle">
                                <div className="flex items-center justify-center gap-1">
                                    <button
                                        type="button"
                                        aria-label="Giảm số lượng"
                                        onClick={handleDecrease}
                                        className="w-6 h-6 flex items-center justify-center rounded border bg-white text-gray-600 hover:bg-gray-100 active:scale-95 cursor-pointer text-sm"
                                    >
                                        -
                                    </button>

                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={handleChange}
                                        className="w-8 h-6 text-center rounded border text-sm focus:outline-none focus:ring-1 focus:ring-blue-400
                                            [appearance:textfield] 
                                            [&::-webkit-outer-spin-button]:appearance-none 
                                            [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <button
                                        type="button"
                                        aria-label="Tăng số lượng"
                                        onClick={handleIncrease}
                                        className="w-6 h-6 flex items-center justify-center rounded border bg-white text-gray-600 hover:bg-gray-100 active:scale-95 cursor-pointer text-sm"
                                    >
                                        +
                                    </button>
                                </div>

                            </td>
                            <td className="p-2 text-center align-middle">
                                <span className="text-xs font-semibold">3.004.000 vnđ</span>
                            </td>
                            <td className="p-2 text-center align-middle">
                                <button className="text-xs text-blue-500 font-semibold">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <table className="w-full border border-gray-100 table-auto md:hidden table">
                    <thead className="border border-gray-100 bg-[#F9F9F9]">
                        <tr>
                            <th className="p-2 text-left">Sản phẩm</th>
                            <th className="p-2 text-center">Mô tả</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-t border-gray-100">
                            <td className="p-2 text-center align-middle">
                                <Image src="/vest.png" alt="vest" width={140} height={160} />
                            </td>
                            <td className="p-2 text-center align-middle flex flex-col space-y-2">
                                <Link
                                    href="/products/123"
                                    className="text-xs text-blue-500 font-semibold whitespace-normal break-words"
                                >
                                    Áo khoác vest dài tay cơ bản giao một hàng khuy - Xám - S
                                </Link>
                                <span className="text-xs font-semibold">1.502.000 vnđ</span>
                                <div className="flex items-center justify-center gap-1">
                                    <button
                                        type="button"
                                        aria-label="Giảm số lượng"
                                        onClick={handleDecrease}
                                        className="w-6 h-6 flex items-center justify-center rounded border bg-white text-gray-600 hover:bg-gray-100 active:scale-95 cursor-pointer text-sm"
                                    >
                                        -
                                    </button>

                                    <input
                                        type="number"
                                        min="1"
                                        value={quantity}
                                        onChange={handleChange}
                                        className="w-8 h-6 text-center rounded border text-sm focus:outline-none focus:ring-1 focus:ring-blue-400
                                            [appearance:textfield] 
                                            [&::-webkit-outer-spin-button]:appearance-none 
                                            [&::-webkit-inner-spin-button]:appearance-none"
                                    />
                                    <button
                                        type="button"
                                        aria-label="Tăng số lượng"
                                        onClick={handleIncrease}
                                        className="w-6 h-6 flex items-center justify-center rounded border bg-white text-gray-600 hover:bg-gray-100 active:scale-95 cursor-pointer text-sm"
                                    >
                                        +
                                    </button>
                                </div>
                                <span className="text-xs font-semibold">3.004.000 vnđ</span>
                                <button className="text-xs text-blue-500 font-semibold">Xóa</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="flex justify-end items-end gap-1 py-5">
                    <span className="text-base">
                        Tổng số tiền:
                    </span>
                    <span className="text-xl font-bold">
                        1.999.000 vnđ
                    </span>
                </div>
                <div className="flex-col md:flex-row border-t border-gray-100 flex items-center justify-between">
                    <div className="px-4 py-2 mt-5 w-full md:w-auto text-center border border-gray-200 font-semibold uppercase text-sm md:text-base cursor-pointer">
                        <Link href="/">
                            tiếp tục mua sắm
                        </Link>
                    </div>
                    <div className="px-4 py-2 mt-5  w-full md:w-auto text-center bg-black text-white uppercase text-sm md:text-base cursor-pointer">
                        <Link href="/">
                            tiến hành thanh toán
                        </Link>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-100 my-8">

            </div>

            <div className="xl:px-40 md:px-5 md:py-5 px-5 py-10">
                <div className="text-xl text-gray-600 uppercase text-left font-semibold">
                    cÓ thể bạn cũng thích
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-4 gap-4 py-5">
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
        </>
    )
}