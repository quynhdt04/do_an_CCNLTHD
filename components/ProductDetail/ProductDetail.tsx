"use client"

import { Separator } from "@/components/ui/separator"
import { useProductData } from "./hooks/useProductData"
import { calculateAverageRating } from "./utils/productHelpers"
import { ProductDetailSkeleton } from "./components/ProductDetailSkeleton"
import { ProductFooter } from "./components/ProductFooter"
import { ProductImageGallery } from "./components/ProductImageGallery"
import { ProductInfo } from "./components/ProductInfo"
import { ProductActions } from "./components/ProductActions"
import { ProductFeatures } from "./components/ProductFeatures"
import { ProductDetails } from "./components/ProductDetails"
import { ProductReviews } from "./components/ProductReviews"
import { RelatedProducts } from "./components/RelatedProducts"

interface ProductDetailProps {
  productId?: string
}

export function ProductDetail({ productId }: ProductDetailProps) {
  const { product, loading, error } = useProductData(productId)

  if (loading) {
    return <ProductDetailSkeleton />
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-serif font-semibold text-foreground">
            {error || "Product not found"}
          </h2>
          <p className="text-muted-foreground">
            We couldn't load the product details. Please try again later.
          </p>
        </div>
      </div>
    )
  }

  const averageRating = calculateAverageRating(product.reviews)

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <ProductImageGallery images={product.images} title={product.title} />

          <div className="space-y-8">
            <ProductInfo product={product} averageRating={averageRating} />

            <Separator />

            <ProductActions stock={product.stock} minimumOrderQuantity={product.minimumOrderQuantity} />

            <Separator />

            <ProductFeatures
              shippingInformation={product.shippingInformation}
              warrantyInformation={product.warrantyInformation}
            />

            <ProductDetails product={product} />
          </div>
        </div>

        <ProductReviews reviews={product.reviews} />

        <RelatedProducts category={product.category} currentProductId={product.id} />
      </main>

      <ProductFooter />
    </div>
  )
}
