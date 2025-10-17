"use client";

import {
  ChevronRight,
  Heart,
  Menu,
  Search,
  ShoppingCart,
  UserRound,
  X,
  LogOut,
  LogIn,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [openRegister, setOpenRegister] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [wishlist, setWishlist] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const pathname = usePathname();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Lỗi khi đọc user:", err);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("console_token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      <header className="sticky top-0 left-0 z-[999] flex items-center justify-between bg-white shadow-sm border-b border-gray-100 w-full px-4 py-3 md:px-8 transition-all">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Menu
            className="mr-2 md:hidden cursor-pointer hover:scale-110 transition-transform"
            onClick={() => setIsOpenMenu(true)}
          />
          <Link
            href="/"
            className="flex items-center space-x-2 transition-all hover:scale-110"
          >
            <Image
              src="/logo-clothes.jpg"
              alt="Clothing Shop Logo"
              width={70}
              height={70}
              className="rounded-md object-contain w-[50px] h-[50px] sm:w-[60px] sm:h-[60px]"
            />
            <span className="hidden sm:inline text-lg sm:text-2xl font-bold tracking-wide text-gray-900 hover:text-blue-600 transition-colors">
              CLOTHING SHOP
            </span>
          </Link>
        </div>

        {/* Search + Icons */}
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

          {/* === DESKTOP ICONS === */}
          <div className="hidden md:flex items-center space-x-5">
            {/* User */}
            {user ? (
              <div className="relative group">
                <div className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-black transition-all hover:scale-110">
                  <Image
                    src={user.image || "/default-avatar.png"}
                    alt="avatar"
                    width={24}
                    height={24}
                    className="rounded-full object-cover"
                  />
                  <span className="text-xs font-semibold">{user.firstName}</span>
                  <ChevronRight size={14} />
                </div>
                <div className="absolute hidden group-hover:flex flex-col right-0 top-full mt-2 bg-white shadow-lg border border-gray-200 rounded-md w-40 z-50">
                  <Link
                    href="/user-profile"
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-all"
                  >
                    Hồ sơ cá nhân
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 text-sm text-red-600 hover:bg-red-100 text-left transition-all"
                  >
                    Đăng xuất
                  </button>
                </div>
              </div>
            ) : (
              <UserRound
                size={20}
                className="cursor-pointer text-gray-700 hover:text-black transition-all hover:scale-110"
                onClick={() => setOpenLogin(true)}
              />
            )}

            {/* Wishlist */}
              <div className="relative group cursor-pointer">
              <Link
                href={user ? "/wishlist" : "#"}
                className="flex items-center space-x-1 text-gray-700 hover:text-red-600 transition-all hover:scale-110"
              >
                <Heart size={18} />
                <span className="text-xs font-semibold">({wishlist.length})</span>
              </Link>

              {/* Nếu chưa login */}
              {!user ? (
                <div className="absolute hidden group-hover:flex right-0 top-[120%] bg-white border border-gray-200 shadow-lg rounded-lg p-3 w-[220px] text-center text-sm text-gray-700">
                  <p>
                    🧭 Vui lòng{" "}
                    <span
                      className="text-blue-600 cursor-pointer hover:underline"
                      onClick={() => setOpenLogin(true)}
                    >
                      đăng nhập
                    </span>{" "}
                    để xem danh sách yêu thích.
                  </p>
                </div>
              ) : (
                <div className="absolute hidden group-hover:flex right-0 top-[120%] bg-white border border-gray-200 shadow-lg rounded-lg p-3 w-[260px] flex-col space-y-2">
                  {wishlist.length > 0 ? (
                    wishlist.map((item, i) => (
                      <div key={i} className="flex space-x-2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={60}
                          className="rounded-md object-cover"
                        />
                        <p className="text-xs font-medium text-gray-800 line-clamp-2">
                          {item.name}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-600 text-center">
                      💔 Chưa có sản phẩm yêu thích.
                    </p>
                  )}
                </div>
              )}
            </div>
            {/* Cart */}
            <div className="relative group cursor-pointer">
            <Link
              href={user ? "/cart" : "#"}
              className="flex items-center space-x-1 text-gray-700 hover:text-black transition-all hover:scale-110"
            >
              <ShoppingCart size={18} />
              <span className="text-xs font-semibold text-red-600">
                ({cart.length})
              </span>
            </Link>

            {/* Nếu chưa login */}
            {!user ? (
              <div className="absolute hidden group-hover:flex right-0 top-[120%] bg-white border border-gray-200 shadow-lg rounded-lg p-3 w-[220px] text-center text-sm text-gray-700">
                <p>
                  🔐 Vui lòng{" "}
                  <span
                    className="text-blue-600 cursor-pointer hover:underline"
                    onClick={() => setOpenLogin(true)}
                  >
                    đăng nhập
                  </span>{" "}
                  để xem giỏ hàng của bạn.
                </p>
              </div>
            ) : (
              <div className="absolute hidden right-0 top-[120%] bg-white z-50 w-[280px] shadow-xl border border-gray-200 rounded-lg p-3 md:group-hover:flex transition-all">
                <div className="flex flex-col space-y-4 max-h-[40vh] overflow-y-auto">
                  {cart.length > 0 ? (
                    cart.map((item, i) => (
                      <div key={i} className="flex space-x-2">
                        <Image
                          src={item.image}
                          alt={item.name}
                          height={80}
                          width={60}
                        />
                        <div className="flex flex-col space-y-1">
                          <p className="text-xs font-medium text-gray-800 line-clamp-2">
                            {item.name}
                          </p>
                          <p className="text-xs text-gray-600">
                            Số lượng: {item.quantity}
                          </p>
                          <p className="text-xs font-semibold text-gray-800">
                            {item.price.toLocaleString("vi-VN")} VNĐ
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-gray-600 text-center">
                      🛒 Giỏ hàng trống.
                    </p>
                  )}
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
            )}
          </div>
          </div>

          {/* === MOBILE ICON === */}
          <button
            className="md:hidden p-2 border rounded-md hover:bg-gray-100"
            onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          >
            {user ? (
              <div className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-black transition-all hover:scale-110">
                <Image
                  src={user.image || "/default-avatar.png"}
                  alt="avatar"
                  width={24}
                  height={24}
                  className="rounded-full object-cover"
                />
                <span className="text-xs font-semibold">{user.firstName}</span>
                <ChevronRight size={14} />
              </div>
            ) : (
              <UserRound size={22} />
              )
            }
          </button>
        </div>

        {/* Sidebar menu (mobile) */}
        <ul
          className={`fixed top-0 left-0 bg-white shadow-md w-[220px] h-full flex flex-col p-5 space-y-5 transform transition-transform duration-300 ease-in-out z-[9999]  
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
            <li
              key={item.path}
              className="font-semibold relative group transition-all hover:scale-110"
            >
              <Link
                href={item.path}
                onClick={() => setIsOpenMenu(false)}
                className={`block px-1 py-1 transition-all duration-200 ${
                  pathname.startsWith(item.path)
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

        {/* === MOBILE USER SLIDE MENU === */}
        <div
          className={`fixed top-0 right-0 bg-white shadow-md w-[220px] h-full flex flex-col p-5 space-y-5 transform transition-transform duration-300 ease-in-out z-[9999]
            ${isUserMenuOpen ? "translate-x-0" : "translate-x-full"}
            md:hidden`}
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-semibold text-gray-800">Tài khoản</h2>
            <X
              className="border border-gray-300 rounded-md p-1 cursor-pointer hover:bg-gray-100 transition-all"
              onClick={() => setIsUserMenuOpen(false)}
            />
          </div>

          {user ? (
            <>
              <Link
                href="/user-profile"
                onClick={() => setIsUserMenuOpen(false)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all"
              >
                <UserRound size={18} className="text-gray-500" />
                <span>Hồ sơ cá nhân</span>
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setIsUserMenuOpen(false)}
                className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition-all"
              >
                <Heart size={18} className="text-pink-500" />
                <span>Yêu thích</span>
              </Link>
              <Link
                href="/cart"
                onClick={() => setIsUserMenuOpen(false)}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all"
              >
                <ShoppingCart size={18} className="text-blue-500" />
                <span>Giỏ hàng</span>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-red-600 hover:text-red-800 transition-all"
              >
                <LogOut size={18} />
                <span>Đăng xuất</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setOpenLogin(true);
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all"
              >
                <LogIn size={18} className="text-blue-500" />
                <span>Đăng nhập</span>
              </button>
              <button
                onClick={() => {
                  setOpenRegister(true);
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-700 hover:text-green-600 transition-all"
              >
                <UserRound size={18} className="text-green-500" />
                <span>Đăng ký</span>
              </button>
              <button
                onClick={() => {
                  setOpenLogin(true);
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-700 hover:text-pink-600 transition-all"
              >
                <Heart size={18} className="text-pink-500" />
                <span>Yêu thích</span>
              </button>
            
              <button
                onClick={() => {
                  setOpenLogin(true);
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition-all"
              >
                <ShoppingCart size={18} className="text-blue-500" />
                <span>Giỏ hàng</span>
              </button>
            </>
          )}
        </div>

        {/* Overlay khi menu mở */}
        {/* {isUserMenuOpen && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden"
            onClick={() => setIsUserMenuOpen(false)}
          ></div>
        )} */}
        {(isOpenMenu || isUserMenuOpen) && (
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] md:hidden"
            onClick={() => {
              setIsOpenMenu(false);
              setIsUserMenuOpen(false);
            }}
          ></div>
        )}
      </header>

      {/* Modals */}
      {openLogin && (
        <LoginModal
          setOpenLogin={setOpenLogin}
          setOpenRegister={setOpenRegister}
        />
      )}
      {openRegister && (
        <RegisterModal
          setOpenRegister={setOpenRegister}
          setOpenLogin={setOpenLogin}
        />
      )}
    </>
  );
}