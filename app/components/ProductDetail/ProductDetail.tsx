"use client"

import { useState } from "react"
import { Star, ShoppingCart, Truck, Shield, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

const productData = {
  id: 1,
  title: "Essence Mascara Lash Princess",
  description:
    "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
  category: "beauty",
  price: 9.99,
  discountPercentage: 10.48,
  rating: 2.56,
  stock: 99,
  tags: ["beauty", "mascara"],
  brand: "Essence",
  sku: "BEA-ESS-ESS-001",
  weight: 4,
  dimensions: {
    width: 15.14,
    height: 13.08,
    depth: 22.99,
  },
  warrantyInformation: "1 week warranty",
  shippingInformation: "Ships in 3-5 business days",
  availabilityStatus: "In Stock",
  reviews: [
    {
      rating: 3,
      comment: "Would not recommend!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Eleanor Collins",
      reviewerEmail: "eleanor.collins@x.dummyjson.com",
    },
    {
      rating: 4,
      comment: "Very satisfied!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Lucas Gordon",
      reviewerEmail: "lucas.gordon@x.dummyjson.com",
    },
    {
      rating: 5,
      comment: "Highly impressed!",
      date: "2025-04-30T09:41:02.053Z",
      reviewerName: "Eleanor Collins",
      reviewerEmail: "eleanor.collins@x.dummyjson.com",
    },
  ],
  returnPolicy: "No return policy",
  minimumOrderQuantity: 48,
  images: ["https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/1.webp"],
  thumbnail: "https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp",
}

export function ProductDetail() {
  const [quantity, setQuantity] = useState(1)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const discountedPrice = productData.price * (1 - productData.discountPercentage / 100)
  const averageRating = productData.reviews.reduce((acc, review) => acc + review.rating, 0) / productData.reviews.length

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % productData.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + productData.images.length) % productData.images.length)
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-2xl font-serif font-semibold tracking-tight text-foreground">Beauty Store</h1>
          <nav className="flex items-center gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Shop
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-card rounded-lg overflow-hidden group">
              <img
                src={productData.images[currentImageIndex] || "/placeholder.svg"}
                alt={productData.title}
                className="w-full h-full object-cover"
              />
              {productData.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {productData.images.length > 1 && (
              <div className="flex gap-3">
                {productData.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative aspect-square w-20 rounded-md overflow-hidden border-2 transition-all ${
                      currentImageIndex === index ? "border-primary" : "border-transparent"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${productData.title} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-8">
            {/* Title & Brand */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="text-xs uppercase tracking-wide">
                  {productData.brand}
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {productData.category}
                </Badge>
              </div>
              <h1 className="text-4xl lg:text-5xl font-serif font-medium tracking-tight text-balance">
                {productData.title}
              </h1>
            </div>

            {/* Rating */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(averageRating) ? "fill-accent text-accent" : "fill-muted text-muted"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {averageRating.toFixed(1)} ({productData.reviews.length} reviews)
              </span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-serif font-semibold text-foreground">${discountedPrice.toFixed(2)}</span>
              <span className="text-xl text-muted-foreground line-through">${productData.price.toFixed(2)}</span>
              <Badge variant="destructive" className="text-sm">
                Save {productData.discountPercentage.toFixed(0)}%
              </Badge>
            </div>

            {/* Description */}
            <p className="text-base leading-relaxed text-muted-foreground">{productData.description}</p>

            <Separator />

            {/* Quantity & Add to Cart */}
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
                <span className="text-sm text-muted-foreground">{productData.stock} in stock</span>
              </div>

              <Button size="lg" className="w-full text-base h-12">
                <ShoppingCart className="mr-2 h-5 w-5" />
                Add to Cart
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                Minimum order quantity: {productData.minimumOrderQuantity} units
              </p>
            </div>

            <Separator />

            {/* Features */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 flex items-start gap-3 border-border">
                <Truck className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Fast Shipping</p>
                  <p className="text-xs text-muted-foreground">{productData.shippingInformation}</p>
                </div>
              </Card>
              <Card className="p-4 flex items-start gap-3 border-border">
                <Shield className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <p className="text-sm font-medium">Warranty</p>
                  <p className="text-xs text-muted-foreground">{productData.warrantyInformation}</p>
                </div>
              </Card>
            </div>

            {/* Product Details */}
            <Card className="p-6 space-y-4 border-border">
              <h3 className="text-lg font-serif font-medium">Product Details</h3>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm">
                <div>
                  <span className="text-muted-foreground">SKU:</span>
                  <span className="ml-2 text-foreground">{productData.sku}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Weight:</span>
                  <span className="ml-2 text-foreground">{productData.weight}g</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Dimensions:</span>
                  <span className="ml-2 text-foreground">
                    {productData.dimensions.width} × {productData.dimensions.height} × {productData.dimensions.depth} cm
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Status:</span>
                  <span className="ml-2 text-accent font-medium">{productData.availabilityStatus}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="mt-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-serif font-medium">Customer Reviews</h2>
            <Button variant="outline">Write a Review</Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productData.reviews.map((review, index) => (
              <Card key={index} className="p-6 space-y-4 border-border">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < review.rating ? "fill-accent text-accent" : "fill-muted text-muted"}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</span>
                </div>
                <p className="text-sm leading-relaxed text-foreground">{review.comment}</p>
                <p className="text-sm font-medium text-muted-foreground">{review.reviewerName}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-20">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-sm text-muted-foreground">© 2025 Beauty Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
