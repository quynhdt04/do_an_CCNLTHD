"use client";

import UsePagination from "@/hooks/UsePagination";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Pagination from "./Pagination";

export default function ListPost({ articles }: { articles: [] }) {
  const {
    currentPage,
    pageSize,
    totalPages,
    startIndex,
    paginatedData,
    handlePageChange,
    handlePageSizeChange,
  } = UsePagination(articles, 10);

  const router = useRouter();

  const handleClick = (article: any, index: number) => {
    localStorage.setItem("selectedArticle", JSON.stringify(article));
    router.push(`/blogs/${index}`);
  };

  return (
    <>
      <div className="grid sm:grid-cols-2  mb-5 space-x-0 sm:space-x-5 space-y-5">
        {paginatedData &&
          paginatedData.map((item: any, index: number) => (
            <div key={index} className="flex flex-col px-20 sm:px-0">
              <div
                className="cursor-pointer"
                onClick={() => handleClick(item, index)}
              >
                <div className="relative w-full h-[220px]">
                  <Image
                    src={item.urlToImage || "/fallback.jpg"}
                    alt={item.title}
                    fill
                    className="object-cover rounded-lg"
                    unoptimized
                  />
                </div>
                <div className="text-md font-semibold uppercase line-clamp-2">
                  {item.title}
                </div>
              </div>
              <div className="text-sm text-gray-500 line-clamp-2">
                {item.description}
              </div>
            </div>
          ))}
      </div>
      {articles.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          totalItems={articles.length}
          pageSize={pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}
    </>
  );
}
