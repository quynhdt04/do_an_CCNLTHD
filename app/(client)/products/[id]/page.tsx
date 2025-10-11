"use client"

import { useParams } from "next/navigation"
import { ProductDetail } from "@/app/components/ProductDetail/ProductDetail"

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string

  return <ProductDetail productId={productId} />
}
