"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import 'swiper/css/navigation';
import Image from "next/image";
import "@/styles/swiper-custom.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import ProductItem from "./components/ProductItem";
import Header from "./components/Header";

interface Product {
  id: string;
  name: string;
  price: number;
  images: string[];
  discount?: number;
}

export default function Home() {
  const [swipers, setSwipers] = useState<{ [key: string]: any }>({});
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedIndexes, setSelectedIndexes] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    const fakeProducts: Product[] = [
      { id: "product_1", name: "Quần bò", price: 1599000, images: ["/do.jpg", "/vest.png", "/quan.jpg"] },
      { id: "product_2", name: "Áo khoác", price: 1899000, images: ["/vest.png", "/do.jpg", "/quan.jpg"] },
      { id: "product_3", name: "Váy hoa", price: 990000, images: ["/quan.jpg", "/vest.png"], discount: 50 },
      { id: "product_4", name: "Váy hoa", price: 990000, images: ["/quan.jpg"], discount: 80 },
      { id: "product_5", name: "Váy hoa", price: 990000, images: ["/quan.jpg"], discount: 80 },
    ];
    setProducts(fakeProducts);
  }, []);

  return (
    <>
      <Header />
      <div className="px-2 w-full h-auto">
        <Swiper
          modules={[Pagination, Autoplay]}
          pagination={{
            clickable: true,
            dynamicBullets: true
          }}
          autoplay={{
            delay: 3500,
            disableOnInteraction: false
          }}
          loop={true}
          navigation={true}
          className="mySwiper"
        >
          <SwiperSlide>
            <Image
              src="/bg.jpg"
              alt="bg-1"
              width={1200}
              height={600}
              className="w-full h-auto object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              src="/bg-1.jpg"
              alt="bg-1"
              width={1200}
              height={600}
              className="w-full h-auto object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="px-2 py-0 md:py-20">
        <Swiper
          spaceBetween={2}
          slidesPerView={3}
          slidesPerGroup={1}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={true}
          modules={[Autoplay, Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 5,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 1,
            },
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <div className="relative">
              <Image
                src="/vay-lien.jpg"
                alt="bg-1"
                width={600}
                height={180}
                className="w-full h-auto object-cover"
              />
              <div className="absolute left-[10%] bottom-[10%] flex flex-col space-y-1">
                <Link href="/" className="text-lg text-white font-semibold uppercase">
                  VÁY LIỀN
                </Link>
                <Link href="/" className="text-base text-white underline">
                  Khám phá thêm
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <Image
                src="/ao.jpg"
                alt="bg-2"
                width={600}
                height={180}
                className="w-full h-auto object-cover"
              />
              <div className="absolute left-[10%] bottom-[10%] flex flex-col space-y-1">
                <Link href="/" className="text-lg text-white font-semibold uppercase">
                  ÁO
                </Link>
                <Link href="/" className="text-base text-white underline">
                  Khám phá thêm
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <Image
                src="/bz.jpg"
                alt="bg-2"
                width={600}
                height={180}
                className="w-full h-auto object-cover"
              />
              <div className="absolute left-[10%] bottom-[10%] flex flex-col space-y-1">
                <Link href="/" className="text-lg text-white font-semibold uppercase">
                  BLAZER
                </Link>
                <Link href="/" className="text-base text-white underline">
                  Khám phá thêm
                </Link>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="relative">
              <Image
                src="/chan-vay.jpg"
                alt="bg-2"
                width={600}
                height={180}
                className="w-full h-auto object-cover"
              />
              <div className="absolute left-[10%] bottom-[10%] flex flex-col space-y-1">
                <Link href="/" className="text-lg text-white font-semibold uppercase">
                  CHÂN VÁY
                </Link>
                <Link href="/" className="text-base text-white underline">
                  Khám phá thêm
                </Link>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="xl:px-40 md:px-5 md:py-5 px-5 py-10">
        <div className="text-2xl text-gray-600 uppercase text-center font-semibold">
          SẢN PHẨM NỔI BẬT
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-4 gap-4 py-5">
          {products.map((product) => (
            <ProductItem
              key={product.id}
              product={product}
              selectedIndexes={selectedIndexes}
              setSelectedIndexes={setSelectedIndexes}
              swipers={swipers}
              setSwipers={setSwipers}
            />
          ))}
        </div>
      </div>
      <div className="xl:px-10 md:px-5 md:py-5 px-5 py-10">
        <div className="text-2xl text-gray-600 uppercase text-center font-semibold">
          Mới có ở của hàng
        </div>
        <Swiper
          spaceBetween={0}
          slidesPerView={4}
          slidesPerGroup={1}
          loop={true}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            0: {
              slidesPerView: 1,
              spaceBetween: 0,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 2,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 0,
            },
          }}
          className="mySwiper mt-5"
        >
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2  lg:grid-cols-4 gap-4 py-5">
            {products.map((product) => (
              <SwiperSlide key={product.id}>
                <ProductItem
                  product={product}
                  selectedIndexes={selectedIndexes}
                  setSelectedIndexes={setSelectedIndexes}
                  swipers={swipers}
                  setSwipers={setSwipers}
                />
              </SwiperSlide>
            ))}
          </div>
        </Swiper>
      </div>
    </>
  );
}
