import { useState, useEffect } from "react"

export interface FavoriteProduct {
  id: string | number
  title: string
  price: number
  discountPercentage?: number
  thumbnail?: string
  images?: string[]
}

export function useFavorite(productId: string | number) {
  const [isFavorite, setIsFavorite] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  // Check if user is logged in and get user ID
  useEffect(() => {
    const token = localStorage.getItem("console_token")
    const user = localStorage.getItem("user")

    console.log("Token:", token)
    console.log("User:", user)
    
    if (token && user) {
      try {
        const userData = JSON.parse(user)
        setIsLoggedIn(true)
        setUserId(userData.id?.toString() || null)
      } catch (error) {
        console.error("Error parsing user:", error)
        setIsLoggedIn(false)
        setUserId(null)
      }
    } else {
      setIsLoggedIn(false)
      setUserId(null)
    }
  }, [])

  // Check if product is already favorited
  useEffect(() => {
    if (!isLoggedIn || !userId) return

    const favorites = getFavorites()
    const exists = favorites.some(
      (fav) => fav.id.toString() === productId.toString()
    )
    setIsFavorite(exists)
  }, [productId, isLoggedIn, userId])

  const getFavorites = (userIdParam?: string): FavoriteProduct[] => {
    try {
      const effectiveUserId = userIdParam || userId
      if (!effectiveUserId) return []
      
      const favoritesKey = `favorites_${effectiveUserId}`
      const favoritesStr = localStorage.getItem(favoritesKey)
      return favoritesStr ? JSON.parse(favoritesStr) : []
    } catch (error) {
      console.error("Error parsing favorites:", error)
      return []
    }
  }

  const toggleFavorite = (product: FavoriteProduct): { success: boolean; isFavorited: boolean } => {
    if (!isLoggedIn || !userId) {
      return { success: false, isFavorited: false }
    }

    const favorites = getFavorites()
    const existingIndex = favorites.findIndex(
      (fav) => fav.id.toString() === productId.toString()
    )

    let newFavorites: FavoriteProduct[]
    let isFavoritedNow: boolean

    if (existingIndex !== -1) {
      // Remove from favorites
      newFavorites = favorites.filter((_, index) => index !== existingIndex)
      isFavoritedNow = false
      setIsFavorite(false)
    } else {
      // Add to favorites
      newFavorites = [...favorites, product]
      isFavoritedNow = true
      setIsFavorite(true)
    }

    const favoritesKey = `favorites_${userId}`
    localStorage.setItem(favoritesKey, JSON.stringify(newFavorites))
    
    return { success: true, isFavorited: isFavoritedNow }
  }

  return {
    isFavorite,
    isLoggedIn,
    userId,
    toggleFavorite,
  }
}
