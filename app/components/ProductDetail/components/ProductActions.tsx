import { useState } from "react"
import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductActionsProps {
  stock: number
  minimumOrderQuantity: number
}

export function ProductActions({ stock, minimumOrderQuantity }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = () => {
    console.log("Adding to cart:", quantity)
    // Add your cart logic here
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="text-sm font-medium">Quantity:</label>
        <div className="flex items-center border border-border rounded-md">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 hover:bg-muted transition-colors"
          >
            -
          </button>
          <span className="px-6 py-2 border-x border-border">{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 hover:bg-muted transition-colors"
          >
            +
          </button>
        </div>
        <span className="text-sm text-muted-foreground">{stock} in stock</span>
      </div>

      <Button size="lg" className="w-full text-base h-12" onClick={handleAddToCart}>
        <ShoppingCart className="mr-2 h-5 w-5" />
        Add to Cart
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        Minimum order quantity: {minimumOrderQuantity} units
      </p>
    </div>
  )
}
