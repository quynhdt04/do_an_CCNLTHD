import ListNewPost from "@/components/ListNewPost";
import ListPost from "@/components/ListPost";
import Image from "next/image";
import Link from "next/link";

async function getPost() {
    const res = await fetch("https://newsapi.org/v2/everything?q=tesla&from=2025-09-08&sortBy=publishedAt&apiKey=9a2d50b8e0c643f88476cc70f48eb632")
    const result = await res.json();
    return result;
}

export default async function BlogPage() {
    const data = await getPost();
    const articles = data.articles || [];

    const newArticles = articles
        .sort((a: any, b: any) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        .slice(0, 6);


    return (
        <>
            <div className="flex flex-row justify-center mx-auto space-x-0 py-5 md:px-2 lg:px-10 md:space-x-5">
                <div className="flex-1">
                    <div className="text-2xl text-center font-semibold uppercase mb-5">
                        Tất cả bài viết
                    </div>
                    <ListPost articles={articles} />
                </div>
                <div className="w-[320px] space-y-5 hidden md:block">
                    <div className="w-full text-base font-semibold text-left text-gray-700 uppercase p-4 bg-white shadow-[0_10px_36px_0_rgba(0,0,0,0.16),_0_0_0_1px_rgba(0,0,0,0.06)]">
                        Tất cả bài viết
                    </div>
                    <div className="bg-white shadow-[0_10px_36px_0_rgba(0,0,0,0.16),_0_0_0_1px_rgba(0,0,0,0.06)] p-4">
                        <div className="text-md font-semibold uppercase">
                            Bài viết mới nhất
                        </div>
                        <ListNewPost newArticles={newArticles} />
                    </div>
                </div>
            </div>
        </>
    );
}
