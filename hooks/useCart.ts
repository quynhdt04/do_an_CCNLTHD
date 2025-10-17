import { useState, useEffect } from "react"

export interface CartItem {
  id: string | number
  title: string
  price: number
  discountPercentage?: number
  thumbnail?: string
  images?: string[]
  quantity: number
}

export function useCart() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userId, setUserId] = useState<string | null>(null)

  // Load cart items from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("console_token")
    const user = localStorage.getItem("user")
    
    if (token && user) {
      try {
        const userData = JSON.parse(user)
        setIsLoggedIn(true)
        setUserId(userData.id?.toString() || null)
        const items = getCartItems(userData.id?.toString())
        setCartItems(items)
      } catch (error) {
        console.error("Error parsing user:", error)
      }
    } else {
      setIsLoggedIn(false)
      setUserId(null)
    }
  }, [])

  const getCartItems = (userIdParam?: string): CartItem[] => {
    try {
      const effectiveUserId = userIdParam || userId
      if (!effectiveUserId) return []
      
      const cartKey = `cart_${effectiveUserId}`
      const cartStr = localStorage.getItem(cartKey)
      return cartStr ? JSON.parse(cartStr) : []
    } catch (error) {
      console.error("Error parsing cart:", error)
      return []
    }
  }

  const addToCart = (
    product: Omit<CartItem, "quantity">,
    quantity: number = 1
  ) => {
    if (!isLoggedIn || !userId) {
      return null
    }

    const items = getCartItems()
    const existingIndex = items.findIndex(
      (item) => item.id.toString() === product.id.toString()
    )

    let newItems: CartItem[]

    if (existingIndex !== -1) {
      // Update quantity if product already exists
      newItems = items.map((item, index) =>
        index === existingIndex
          ? { ...item, quantity: item.quantity + quantity }
          : item
      )
    } else {
      // Add new product to cart
      newItems = [...items, { ...product, quantity }]
    }

    const cartKey = `cart_${userId}`
    localStorage.setItem(cartKey, JSON.stringify(newItems))
    setCartItems(newItems)
    
    return newItems
  }

  const removeFromCart = (productId: string | number) => {
    if (!userId) return

    const items = getCartItems()
    const newItems = items.filter(
      (item) => item.id.toString() !== productId.toString()
    )
    const cartKey = `cart_${userId}`
    localStorage.setItem(cartKey, JSON.stringify(newItems))
    setCartItems(newItems)
  }

  const updateQuantity = (productId: string | number, quantity: number) => {
    if (!userId) return

    const items = getCartItems()
    const newItems = items.map((item) =>
      item.id.toString() === productId.toString()
        ? { ...item, quantity: Math.max(1, quantity) }
        : item
    )
    const cartKey = `cart_${userId}`
    localStorage.setItem(cartKey, JSON.stringify(newItems))
    setCartItems(newItems)
  }

  const clearCart = () => {
    if (!userId) return

    const cartKey = `cart_${userId}`
    localStorage.removeItem(cartKey)
    setCartItems([])
  }

  const getCartItemCount = (): number => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => {
      const price = item.price * (1 - (item.discountPercentage || 0) / 100)
      return total + price * item.quantity
    }, 0)
  }

  return {
    cartItems,
    isLoggedIn,
    userId,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartItemCount,
    getCartTotal,
  }
}
