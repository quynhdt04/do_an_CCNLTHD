"use client";

import { ChevronRight, Heart, Menu, Search, ShoppingCart, UserRound, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const navItems = [
    { name: "TRANG CHỦ", path: "/" },
    {
        name: "SẢN PHẨM",
        path: "/products",
        children: [
            { name: "Áo khoác", path: "/products/ao" },
            { name: "Chân váy", path: "/products/chan-vay" },
            { name: "Quần", path: "/products/quan" },
        ],
    },
    { name: "BLOG", path: "/blogs" },
    { name: "LIÊN HỆ", path: "/contact" },
];

export default function Header() {
    const [isOpenMenu, setIsOpenMenu] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);
    const [openRegister, setOpenRegister] = useState(false);
    const pathname = usePathname();
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    return (
        <>
            <div className="sticky left-0 top-0 z-999 flex justify-content items-center bg-white shadow-md w-full p-3">
                <div className="flex flex-col sm:items-center sm:flex-row">
                    <Menu className="mr-2 md:hidden cursor-pointer"
                        onClick={() => setIsOpenMenu(true)} />
                    <Link href="/" className="sm:text-2xl text-sm font-semibold">
                        LOTHING SHOP
                    </Link>
                </div>
                <div className="flex-1 space-y-0 md:space-y-4">
                    <ul className="flex items-center space-x-5 justify-self-end sm:space-x-5 md:space-x-10">
                        <li className={`cursor-pointer flex items-center px-1 ${openSearch
                            ? "border border-gray-400 rounded-md flex items-center"
                            : "border-0"
                            } `}>
                            <div>
                                <input className={`text-sm focus:outline-none ${openSearch
                                    ? ""
                                    : "hidden"}`} type="text" placeholder="Tìm tên sản phẩm" />
                            </div>
                            <Search
                                size={14}
                                onClick={() => setOpenSearch((prev) => !prev)} />
                        </li>
                        <li className="cursor-pointer">
                            <UserRound
                                size={14}
                                onClick={() => setOpenLogin(true)} />
                        </li>
                        <li className="cursor-pointer">
                            <Link href="/wishlist" className="flex items-center">
                                <Heart size={14} />
                                <span className="text-xs ml-1 text-red-700 font-semibold">(0)</span>
                            </Link>
                        </li>
                        <li className="cursor-pointer relative group">
                            <Link href="/cart" className="flex items-center">
                                <ShoppingCart size={14} />
                                <span className="text-xs ml-1 text-red-700 font-semibold">(0)</span>
                            </Link>
                            <div className={`absolute hidden right-0 top-[100%] bg-white z-99 w-[280px] 
                                    shadow-md flex flex-col items-center border border-gray-200 p-2
                                    md:group-hover:flex group-hover:hidden
                                   `}>
                                {/* <div className="p-4 border border-gray-300 rounded-xl">
                                    <ShoppingCart size={35} />
                                </div>
                                <div className="flex flex-col items-center p-4">
                                    <span>Giỏ hàng đang trống!</span>
                                    <span>Mua ngay để nhận ưu đãi</span>
                                </div> */}
                                <div className="relative">
                                    <div className="flex flex-col space-y-4  max-h-[40vh] overflow-y-auto">
                                        <div className="flex space-x-2">
                                            <Image
                                                src="/vest.png"
                                                alt="vest"
                                                height={250}
                                                width={100}
                                            />
                                            <div className="flex-col space-y-1">
                                                <div className="text-xs">
                                                    Áo khoác vest dài tay cơ bản giao một hàng khuy - Xám - S
                                                </div>
                                                <div className="text-xs font-semibold">
                                                    Số lượng : 2
                                                </div>
                                                <div className="text-xs font-semibold">
                                                    1.999.000 vnđ
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-2">
                                            <Image
                                                src="/vest.png"
                                                alt="vest"
                                                height={250}
                                                width={100}
                                            />
                                            <div className="flex-col space-y-1">
                                                <div className="text-xs">
                                                    Áo khoác vest dài tay cơ bản giao một hàng khuy - Xám - S
                                                </div>
                                                <div className="text-xs font-semibold">
                                                    Số lượng : 2
                                                </div>
                                                <div className="text-xs font-semibold">
                                                    1.999.000 vnđ
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sticky bottom-0 left-0 z-999 bg-white w-full flex items-center justify-center border-t border-gray-100">
                                        <Link href="/cart" className="px-4 py-1 border border-black rounded-sm mt-2">
                                            Xem giỏ hàng
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <ul
                        className={
                            ` fixed top-0 left-0 inset-0 bg-white shadow-md w-[180px] min-h-screen flex flex-col p-5
                                space-y-5 transform transition-transform duration-300
                                 ${isOpenMenu ? "translate-x-0" : "-translate-x-full"} 
                                md:space-x-10 md:space-y-0 md:relative md:flex-row md:bg-transparent md:w-auto md:shadow-none md:min-h-0 md:h-auto md:justify-self-end md:p-0 md:translate-x-0 md:items-center`
                        }>
                        <li className="md:hidden">
                            <X className="border border-gray-200 cursor-pointer"
                                onClick={() => setIsOpenMenu(false)} />
                        </li>
                        {navItems.map((item) => (
                            <li
                                key={item.path}
                                className="text-base font-semibold relative group"
                            >
                                <div className="flex items-center justify-between">
                                    <Link
                                        href={item.path}
                                        className={`${item.path === "/"
                                            ? pathname === "/" ? "text-blue-500" : ""
                                            : pathname.startsWith(item.path) ? "text-blue-500" : ""
                                            }`}
                                    >
                                        {item.name}
                                    </Link>

                                    {item.children && (
                                        <ChevronRight
                                            size={18}
                                            className={`cursor-pointer transition-transform duration-200 
                                                    md:hidden
                                                    ${openDropdown === item.path ? "rotate-90" : ""}
                                                `}
                                            onClick={() =>
                                                setOpenDropdown(
                                                    openDropdown === item.path ? null : item.path
                                                )
                                            }
                                        />
                                    )}
                                </div>

                                {item.children && openDropdown === item.path && (
                                    <ul className="space-y-2 px-2 pt-2 md:hidden">
                                        {item.children.map((child) => (
                                            <li key={child.path}>
                                                <Link
                                                    href={child.path}
                                                    className={`${pathname === child.path ? "text-blue-500" : ""}`}
                                                >
                                                    {child.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {item.children && (
                                    <ul
                                        className="
                                            hidden
                                            absolute md:group-hover:flex
                                            flex-col
                                            space-y-2 px-2 pt-2
                                            md:right-0 md:top-[100%]
                                            w-[120px]
                                            bg-white shadow-md border border-gray-200 rounded
                                            z-50
                                            "
                                    >
                                        {item.children.map((child) => (
                                            <li key={child.path}>
                                                <Link
                                                    href={child.path}
                                                    className={`${pathname === child.path ? "text-blue-500" : ""}`}
                                                >
                                                    {child.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {openLogin && <LoginModal
                setOpenLogin={setOpenLogin}
                setOpenRegister={setOpenRegister} />}
            {openRegister && <RegisterModal
                setOpenRegister={setOpenRegister} />}
        </>
    )
}