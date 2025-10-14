import { Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { ProductData } from "../hooks/useProductData"

interface ProductInfoProps {
  product: ProductData
  averageRating: number
}

export function ProductInfo({ product, averageRating }: ProductInfoProps) {
  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <>
      {/* Title & Brand */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs uppercase tracking-wide">
            {product.brand}
          </Badge>
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
        </div>
        <h1 className="text-4xl lg:text-5xl font-serif font-medium tracking-tight text-balance">
          {product.title}
        </h1>
      </div>

      {/* Rating */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${
                i < Math.floor(averageRating) ? "fill-yellow-400 text-yellow-400" : "fill-muted text-muted"
              }`}
            />
          ))}
        </div>
        <span className="text-sm text-muted-foreground">
          {averageRating.toFixed(1)} ({product.reviews.length} reviews)
        </span>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-3">
        <span className="text-4xl font-serif font-semibold text-foreground">${discountedPrice.toFixed(2)}</span>
        <span className="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</span>
        <Badge variant="destructive" className="text-sm">
          Save {product.discountPercentage.toFixed(0)}%
        </Badge>
      </div>

      {/* Description */}
      <p className="text-base leading-relaxed text-muted-foreground">{product.description}</p>
    </>
  )
}
