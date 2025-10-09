"use client";

import {
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import LoginModal from "./LoginModal";
import RegisterModal from "./RegisterModal";

const navItems = [
  { name: "TRANG CHỦ", path: "/" },
  { name: "SẢN PHẨM", path: "/products" },
  { name: "BLOG", path: "/blogs" },
  { name: "LIÊN HỆ", path: "/contact" },
];

export default function Header() {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* 🔝 Header chính */}
      <header className="sticky top-0 left-0 z-[999] flex items-center justify-between bg-white shadow-sm border-b border-gray-100 w-full px-4 py-3 md:px-8 transition-all">
        {/* ✅ Logo */}
        <div className="flex items-center space-x-2">
          <Menu
            className="mr-2 md:hidden cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setIsOpenMenu(true)}
          />
          <Link href="/" className="flex items-center space-x-2 transition-all hover:scale-110">
            <Image
              src="/logo-clothes.jpg"
              alt="Clothing Shop Logo"
              width={70}
              height={70}
              className="rounded-md object-contain"
            />
            <span className="text-lg sm:text-2xl font-bold tracking-wide text-gray-900 hover:text-blue-600 transition-colors">
              CLOTHING SHOP
            </span>
          </Link>
        </div>

        {/* Navigation + Icons */}
        <div className="flex items-center space-x-4 sm:space-x-6">
          {/* Search */}
          <div
            className={`flex items-center border rounded-full px-3 py-1 transition-all ${
              openSearch
                ? "border-gray-300 bg-gray-50"
                : "border-transparent hover:bg-gray-50"
            }`}
          >
            <input
              type="text"
              placeholder="Tìm sản phẩm..."
              className={`text-sm focus:outline-none bg-transparent transition-all ${
                openSearch ? "w-32 sm:w-48" : "w-0"
              }`}
            />
            <Search
              size={18}
              className="cursor-pointer text-gray-700 hover:text-black transition-all hover:scale-110"
              onClick={() => setOpenSearch((prev) => !prev)}
            />
          </div>

          {/* User */}
          <UserRound
            size={20}
            className="cursor-pointer text-gray-700 hover:text-black transition-all hover:scale-110"
            onClick={() => setOpenLogin(true)}
          />

          {/* Wishlist */}
          <Link
            href="/wishlist"
            className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-all hover:scale-110"
          >
            <Heart size={18} />
            <span className="text-xs font-semibold">(0)</span>
          </Link>

          {/* Cart */}
          <div className="relative group cursor-pointer">
            <Link
              href="/cart"
              className="flex items-center space-x-1 text-gray-700 hover:text-black transition-all hover:scale-110"
            >
              <ShoppingCart size={18} />
              <span className="text-xs font-semibold text-red-600">(0)</span>
            </Link>

            {/* Cart Dropdown */}
            <div className="absolute hidden right-0 top-[120%] bg-white z-50 w-[280px] shadow-xl border border-gray-200 rounded-lg p-3 md:group-hover:flex transition-all">
              <div className="flex flex-col space-y-4 max-h-[40vh] overflow-y-auto">
                <div className="flex space-x-2">
                  <Image src="/vest.png" alt="vest" height={80} width={60} />
                  <div className="flex flex-col space-y-1">
                    <p className="text-xs font-medium text-gray-800 line-clamp-2">
                      Áo khoác vest dài tay cơ bản giao một hàng khuy - Xám - S
                    </p>
                    <p className="text-xs text-gray-600">Số lượng : 2</p>
                    <p className="text-xs font-semibold text-gray-800">
                      1.999.000 VNĐ
                    </p>
                  </div>
                </div>
                <div className="border-t pt-2 flex justify-center">
                  <Link
                    href="/cart"
                    className="px-4 py-1 border border-black rounded-md hover:bg-black hover:text-white transition-all"
                  >
                    Xem giỏ hàng
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar menu (mobile) */}
        <ul
          className={`fixed top-0 left-0 bg-white shadow-md w-[220px] h-full flex flex-col p-5 space-y-5 transform transition-transform duration-300 ease-in-out
            ${isOpenMenu ? "translate-x-0" : "-translate-x-full"}
            md:space-x-10 md:space-y-0 md:relative md:flex-row md:bg-transparent md:w-auto md:shadow-none md:p-0 md:translate-x-0 md:items-center`}
        >
          <li className="md:hidden">
            <X
              className="border border-gray-300 rounded-md p-1 cursor-pointer hover:bg-gray-100 transition-all"
              onClick={() => setIsOpenMenu(false)}
            />
          </li>

          {navItems.map((item) => (
            <li key={item.path} className="font-semibold relative group transition-all hover:scale-110">
              <Link
                href={item.path}
                className={`block px-1 py-1 transition-all duration-200 ${
                  item.path === "/"
                    ? pathname === "/"
                      ? "text-blue-600"
                      : "text-gray-800 hover:text-blue-600"
                    : pathname.startsWith(item.path)
                    ? "text-blue-600"
                    : "text-gray-800 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
              <span
                className={`absolute bottom-0 left-0 h-[2px] bg-blue-600 rounded-full transition-all duration-300 origin-left scale-x-0 group-hover:scale-x-100 ${
                  pathname.startsWith(item.path) ? "scale-x-100" : ""
                }`}
              ></span>
            </li>
          ))}
        </ul>
      </header>

      {/* Modals */}
      {openLogin && (
        <LoginModal
          setOpenLogin={setOpenLogin}
          setOpenRegister={setOpenRegister}
        />
      )}
      {openRegister && <RegisterModal setOpenRegister={setOpenRegister} />}
    </>
  );
}
