// hooks/useHeader.ts
import { useState, useEffect } from "react";
import { useCart, CartItem } from "./useCart";
import { FavoriteProduct } from "./useFavorite";

// Định nghĩa kiểu dữ liệu cho user
interface User {
  id: number;
  firstName: string;
  image: string;
}

export function useHeader() {
  const [user, setUser] = useState<User | null>(null);
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const { cartItems, removeFromCart: handleRemoveFromCart } = useCart();

  // Lấy thông tin user và danh sách yêu thích khi component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        setUser(parsedUser);

        // Lấy danh sách yêu thích tương ứng với user
        const favoritesKey = `favorites_${parsedUser.id}`;
        const storedFavorites = localStorage.getItem(favoritesKey);
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (err) {
        console.error("Lỗi khi đọc dữ liệu từ localStorage:", err);
        setUser(null);
      }
    }
  }, []);

  // Hàm đăng xuất
  const handleLogout = () => {
    localStorage.removeItem("console_token");
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  // Hàm xóa sản phẩm khỏi danh sách yêu thích
  const handleRemoveFavorite = (productId: string | number) => {
    if (!user) return;

    const updatedFavorites = favorites.filter((item) => item.id !== productId);
    setFavorites(updatedFavorites);

    const favoritesKey = `favorites_${user.id}`;
    localStorage.setItem(favoritesKey, JSON.stringify(updatedFavorites));
  };

  return {
    user,
    cartItems,
    favorites,
    handleLogout,
    handleRemoveFavorite,
    handleRemoveFromCart,
  };
}