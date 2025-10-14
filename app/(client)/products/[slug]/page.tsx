"use client";

import CategorySub from "@/app/components/CategorySub";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/free-mode";
// import "swiper/css/navigation";
// import "swiper/css/thumbs";
// import "../../../../styles/swiper-custom.css";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProductItem from "@/app/components/ProductItem";

interface Product {
    id: string;
    name: string;
    price: number;
    images: string[];
    discount?: number;
}

interface Color {
    name: string;
    code: string;
}

export default function ProductDetail() {

    const sections = [
        {
            title: "Thông số sản phẩm",
            content: (
                <ul>
                    <li className="text-sm font-semibold">Thông tin sản phẩm:</li>
                    <li className="text-sm">- Kiểu dáng: Quần dài âu xuông đứng</li>
                    <li className="text-sm">
                        - Chất liệu: Thân trước là ly dọc, cạp thường có đỉa, túi chéo bên hông.
                    </li>
                    <li className="text-sm">- Chi tiết: Tuytsi, lót habutai</li>
                </ul>
            ),
        },
        {
            title: "Hướng dẫn bảo quản",
            content: (
                <ul>
                    <li className="text-sm font-semibold">Lưu ý khi sử dụng:</li>
                    <li className="text-sm">- Giặt ở nhiệt độ thường</li>
                    <li className="text-sm">- Không dùng chất tẩy mạnh</li>
                    <li className="text-sm">- Ủi ở nhiệt độ thấp</li>
                </ul>
            ),
        },
    ];

    const images = [
        "/vest.png",
        "/vay-lien.jpg",
        "/chan-vay.jpg",
        "/quan.jpg",
        "/do.jpg",
        "https://swiperjs.com/demos/images/nature-6.jpg",
        "https://swiperjs.com/demos/images/nature-7.jpg",
        "https://swiperjs.com/demos/images/nature-8.jpg",
        "https://swiperjs.com/demos/images/nature-9.jpg",
        "https://swiperjs.com/demos/images/nature-10.jpg",
    ];

    const colors: Color[] = [
        { name: "Đỏ", code: "red" },
        { name: "Trắng", code: "white" },
        { name: "Đen", code: "black" },
        { name: "Xanh dương", code: "blue" },
    ];

    const sizes = ["S", "M", "L"];

    const params = useParams();
    const productId = params.id;
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
    const [openTab, setOpenTab] = useState<number | null>(null);

    const [swipers, setSwipers] = useState<{ [key: string]: any }>({});
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedIndexes, setSelectedIndexes] = useState<{ [key: string]: number }>({});

    const [selectedColor, setSelectedColor] = useState<Color>(colors[0]);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [quantity, setQuantity] = useState(1);


    const handleDecrease = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const handleIncrease = () => {
        setQuantity((prev) => prev + 1);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = parseInt(e.target.value, 10);
        if (isNaN(value) || value < 1) value = 1;
        setQuantity(value);
    };

    const toggleTab = (index: number) => {
        setOpenTab(openTab === index ? null : index);
    };

    useEffect(() => {
        const fakeProducts: Product[] = [
            { id: "product_1", name: "Quần bò", price: 1599000, images: ["/do.jpg", "/vest.png", "/quan.jpg"] },
            { id: "product_2", name: "Áo khoác", price: 1899000, images: ["/vest.png", "/do.jpg", "/quan.jpg"] },
            { id: "product_3", name: "Váy hoa", price: 990000, images: ["/quan.jpg", "/vest.png"], discount: 50 },
            { id: "product_4", name: "Váy hoa", price: 990000, images: ["/quan.jpg"], discount: 80 },
        ];
        setProducts(fakeProducts);
    }, []);

    const handleAddToCart = () => {
        console.log("selectedColor", selectedColor);
        console.log("selectedSize", selectedSize);
        console.log("quantity", quantity);
    }


    return (
        <>
            <div className="xl:px-60 lg:px-0 md:px-0 sm:px-5 px-5 py-4">
                <div className="flex justify-center">
                    <div className="w-auto">
                        <CategorySub />
                    </div>
                </div>

                <div className="flex flex-col py-5 space-x-10 md:flex-row">
                    <div className="w-full md:w-1/2">
                        <div className="flex">
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                direction="vertical"
                                spaceBetween={2}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                slideToClickedSlide={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper !hidden md:!block h-[700px] w-[150px]"
                                loop={true}
                            >
                                {images.map((src, i) => (
                                    <SwiperSlide key={i} className="p-1">
                                        <img
                                            src={src}
                                            alt={`thumb-${i}`}
                                            className="w-full h-full object-cover rounded-md cursor-pointer"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>

                            <Swiper
                                loop={false}
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{
                                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : undefined,
                                }}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper2 flex-1"
                            >
                                {images.map((src, i) => (
                                    <SwiperSlide key={i}>
                                        <div className="w-full h-[700px] flex items-center justify-center">
                                            <img
                                                src={src}
                                                alt={`main-${i}`}
                                                className="max-h-full max-w-full object-cover rounded-lg"
                                            />
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                        <div className="space-y-2 mt-5">
                            {sections.map((section, index) => (
                                <div key={index}>
                                    <div
                                        className="flex items-center justify-between border-b border-gray-300 cursor-pointer py-2"
                                        onClick={() => toggleTab(index)}
                                    >
                                        <span className="text-base font-semibold uppercase">
                                            {section.title}
                                        </span>
                                        <span>
                                            {openTab === index ? <ChevronUp /> : <ChevronDown />}
                                        </span>
                                    </div>

                                    {openTab === index && <div className="mt-2">{section.content}</div>}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-full mt-10 md:w-1/2 md:mt-0">
                        <div className="text-xl font-semibold text-gray-600">
                            Quần dài ống đứng xếp hai ly cơ bản
                        </div>
                        <div className="text-xs font-semibold uppercase bg-gray-200 p-1 my-5 inline-block">
                            Còn hàng
                        </div>
                        <div className="text-lg text-red-600 font-semibold mb-5">
                            999,000 vnđ
                        </div>
                        <div>
                            <div className="flex items-center space-x-5">
                                <div className="text-xl font-semibold text-gray-700 uppercase">
                                    màu sắc
                                </div>
                                <div className="text-sm font-semibold normal-case">
                                    {selectedColor.name}
                                </div>
                            </div>
                            <ul className="flex items-center space-x-2 mt-2">
                                {colors.map((color) => (
                                    <li key={color.code}>
                                        <span
                                            className={`w-6 h-6 rounded-full flex border cursor-pointer ${color.code === "white" ? "border-gray-400" : "border-gray-200"
                                                }`}
                                            style={{ backgroundColor: color.code }}
                                            onClick={() => setSelectedColor(color)}
                                        ></span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="my-5">
                            <div className="flex items-center space-x-2">
                                <div className="text-xl font-semibold text-gray-700 uppercase">
                                    Kích cỡ
                                </div>
                                <div className="text-sm font-semibold capitalize">
                                    (Chọn zise của bạn)
                                </div>
                            </div>
                            <ul className="flex items-center space-x-2 mt-2">
                                {sizes.map((size) => (
                                    <li key={size}>
                                        <span
                                            onClick={() => setSelectedSize(size)}
                                            className={`text-base font-semibold uppercase border py-1 px-8 cursor-pointer
                                                ${selectedSize === size
                                                    ? "border-black opacity-100"
                                                    : "border-gray-400 opacity-50"
                                                }`}
                                        >
                                            {size}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mt- 10 flex items-center gap-2">
                            <button
                                type="button"
                                aria-label="Giảm số lượng"
                                onClick={handleDecrease}
                                className="w-9 h-9 flex items-center justify-center rounded-md border bg-white text-gray-500 hover:bg-gray-50 active:scale-95 cursor-pointer"
                            >-</button>

                            <input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={handleChange}
                                className="w-16 text-center rounded-md border py-1 px-2 focus:outline-none focus:ring-2 focus:ring-blue-400 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />

                            <button
                                type="button"
                                aria-label="Tăng số lượng"
                                onClick={handleIncrease}
                                className="w-9 h-9 flex items-center justify-center rounded-md border bg-white text-gray-500 hover:bg-gray-50 active:scale-95 cursor-pointer"
                            >+</button>
                        </div>

                        <div className="space-y-4 mt-5">
                            <div className="text-base uppercase font-semibold text-white text-center bg-black w-full py-2 cursor-pointer"
                            onClick={handleAddToCart}>
                                Thêm vào giỏ hàng
                            </div>
                            <div className="text-base uppercase font-semibold text-white text-center bg-black w-full py-2 cursor-pointer">
                                mua hàng
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="xl:px-40 md:px-5 md:py-5 px-5 py-10">
                <div className="text-2xl text-gray-600 uppercase text-center font-semibold">
                    CÁC SẢN PHẨM TƯƠNG TỰ
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

            <div className="xl:px-40 md:px-5 md:py-5 px-5 py-10">
                <div className="text-2xl text-gray-600 uppercase text-center font-semibold">
                    sản phẩm đã xem
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

            <style jsx global>{`
                .mySwiper .swiper-slide img { opacity: 0.85; transition: transform .15s, opacity .15s; }

                .mySwiper .swiper-slide-thumb-active img {
                opacity: 1;
                transform: scale(1.03);
                box-shadow: 0 6px 18px rgba(0,0,0,0.12);
                border: 2px solid rgba(59,130,246,0.9); 
                border-radius: 6px;
                }

                .mySwiper2 img { width: 100%; height: 100%; object-fit: cover; }
            `}</style>
        </>
    );
}
