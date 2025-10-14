"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function ListNewPost({ newArticles }: { newArticles: any[] }) {

    const router = useRouter();

    const handleClick = (article: any, index: number) => {
        localStorage.setItem("selectedArticle", JSON.stringify(article));
        router.push(`/blogs/${index}`);
    };

    return (
        <div className="grid space-y-4 bg-white">
            {newArticles && (
                newArticles.map((item: any, index: number) => (
                    <div key={index} className="flex flex-col justify-center items-center cursor-pointer"
                        onClick={() => handleClick(item, index)}>
                        <div className="relative w-full h-[220px]">
                            <Image
                                src={item.urlToImage || "/fallback.jpg"}
                                alt={item.title}
                                fill
                                className="object-cover rounded-lg"
                                unoptimized
                            />
                        </div>
                        <div className="text-md font-semibold uppercase text-center line-clamp-2">
                            {item.title}
                        </div>
                    </div>
                ))
            )}
        </div>
    )
}