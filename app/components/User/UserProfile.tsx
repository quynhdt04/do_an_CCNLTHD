"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
// Thêm các icon cần thiết
import { Heart, ShoppingCart, LogOut, PackageOpen, Trash2 } from "lucide-react";

// Định nghĩa kiểu dữ liệu cho sản phẩm
interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string; // Thêm slug để tạo link thân thiện với SEO
}

// Giao diện cho một trạng thái trống
const EmptyState = ({
  icon,
  message,
  buttonText,
  buttonLink,
}: {
  icon: React.ReactNode;
  message: string;
  buttonText: string;
  buttonLink: string;
}) => (
  <div className="text-center py-16 px-6 bg-gray-100 rounded-2xl flex flex-col items-center">
    <div className="mb-4 text-gray-400">{icon}</div>
    <p className="text-gray-600 mb-6">{message}</p>
    <Link
      href={buttonLink}
      className="inline-block bg-indigo-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-indigo-700 transition-transform transform hover:scale-105"
    >
      {buttonText}
    </Link>
  </div>
);

export default function UserProfile() {
  const [user, setUser] = useState<any>(null);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);

  useEffect(() => {
    // --- Logic lấy dữ liệu người dùng ---
    const storedUser = localStorage.getItem("user");
    if (!storedUser || storedUser === "undefined") {
      window.location.href = "/login"; // Chuyển hướng đến trang đăng nhập
      return;
    }
    try {
      setUser(JSON.parse(storedUser));
    } catch (err) {
      console.error("Lỗi khi đọc user:", err);
      localStorage.clear();
      window.location.href = "/login";
    }

    // --- Dữ liệu giả lập (thêm slug) ---
    const fakeWishlist: Product[] = [
      { id: "1", name: "Áo Sơ Mi Lụa Trắng", price: 499000, image: "/ao.jpg", slug: "ao-so-mi-lua-trang" },
      { id: "2", name: "Váy Hoa Nhí Vintage", price: 799000, image: "/vay-lien.jpg", slug: "vay-hoa-nhi-vintage" },
    ];
    const fakeCart: Product[] = [
      { id: "3", name: "Áo Khoác Da Biker", price: 1299000, image: "/vest.png", slug: "ao-khoac-da-biker" },
      { id: "4", name: "Quần Jeans Skinny Fit", price: 899000, image: "/quan.jpg", slug: "quan-jeans-skinny-fit" },
    ];
    
    // Thử nghiệm trạng thái trống bằng cách comment dòng dưới đây
    setWishlist(fakeWishlist);
    // setCart(fakeCart);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Tiêu đề trang */}
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-slate-800 tracking-tight">Tài khoản của bạn</h1>
<p className="mt-2 text-lg text-slate-600">Quản lý thông tin, đơn hàng và sản phẩm yêu thích.</p>
        </header>

        {/* Thẻ thông tin người dùng */}
        {user && (
          <div className="bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-2xl p-8 mb-12 flex flex-col sm:flex-row items-center gap-8 transition-shadow duration-300 hover:shadow-xl">
            <Image
              src={user.image || "/default-avatar.png"}
              alt="User Avatar"
              width={120}
              height={120}
              className="rounded-full border-4 border-indigo-200 object-cover shadow-md"
            />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-2xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600 mt-1">{user.email}</p>
              <p className="text-gray-500 text-sm capitalize">Giới tính: {user.gender}</p>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 sm:mt-0 inline-flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-all duration-300 transform hover:scale-105"
            >
              <LogOut size={18} />
              <span>Đăng xuất</span>
            </button>
          </div>
        )}

        {/* Danh sách yêu thích */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-200">
            <Heart className="text-pink-500" size={28} />
            <h3 className="text-2xl font-semibold text-gray-800">Sản phẩm yêu thích</h3>
          </div>
          {wishlist.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {wishlist.map((item) => (
                <Link key={item.id} href={`/products/${item.slug}`} className="group block">
                  <div className="bg-white rounded-xl p-4 shadow-md border border-gray-200/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-indigo-400 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={300}
                      height={300}
                      className="rounded-lg w-full h-52 object-cover mb-4"
                    />
                    <h4 className="font-semibold text-gray-800 truncate group-hover:text-indigo-600">{item.name}</h4>
                    <p className="text-lg text-red-600 font-bold mt-1">
                      {item.price.toLocaleString("vi-VN")} VNĐ
                    </p>
                    <button className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm p-2 rounded-full text-gray-600 hover:text-white hover:bg-indigo-500 transition-colors opacity-0 group-hover:opacity-100">
<ShoppingCart size={20} />
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <EmptyState 
              icon={<Heart size={48} />}
              message="Bạn chưa có sản phẩm yêu thích nào."
              buttonText="Khám phá ngay"
              buttonLink="/products"
            />
          )}
        </section>

        {/* Giỏ hàng */}
        <section>
          <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-200">
            <ShoppingCart className="text-blue-500" size={28} />
            <h3 className="text-2xl font-semibold text-gray-800">Sản phẩm trong giỏ hàng</h3>
          </div>
          {cart.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {cart.map((item) => (
                   <div key={item.id} className="group relative bg-white rounded-xl p-4 shadow-md border border-gray-200/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                     <Link href={`/products/${item.slug}`} className="block">
                       <Image
                         src={item.image}
                         alt={item.name}
                         width={300}
                         height={300}
                         className="rounded-lg w-full h-52 object-cover mb-4"
                       />
                       <h4 className="font-semibold text-gray-800 truncate">{item.name}</h4>
                       <p className="text-lg text-red-600 font-bold mt-1">
                         {item.price.toLocaleString("vi-VN")} VNĐ
                       </p>
                     </Link>
                     <button className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm p-2 rounded-full text-gray-500 hover:text-white hover:bg-red-500 transition-colors">
                         <Trash2 size={20} />
                     </button>
                   </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link
                  href="/cart"
                  className="inline-block text-indigo-600 font-semibold hover:text-indigo-800 transition-colors"
                >
                  Xem chi tiết giỏ hàng và thanh toán →
                </Link>
              </div>
            </>
          ) : (
             <EmptyState 
              icon={<PackageOpen size={48} />}
              message="Giỏ hàng của bạn đang trống."
              buttonText="Tiếp tục mua sắm"
              buttonLink="/products"
            />
          )}
        </section>
      </div>
    </div>
  );
}