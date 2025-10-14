"use client";

import { ArrowLeft, Calendar, User, ExternalLink, Globe } from "lucide-react";
import { useEffect, useState } from "react";

export default function BlogDetail() {
    const [article, setArticle] = useState<any>(null);

    useEffect(() => {
        const saved = localStorage.getItem("selectedArticle");
        if (saved) setArticle(JSON.parse(saved));
    }, []);

    const formatDate = (dateString: any) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("es-ES", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        });
    };

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center text-lg text-gray-500">
                Đang tải bài viết...
            </div>
        );
    }

    return (
        <div className="min-h-screen ">
            <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <article className="bg-white rounded-2xl shadow-xl overflow-hidden">
                    {article?.urlToImage && (
                        <div className="relative h-96 w-full overflow-hidden bg-slate-200">
                            <img
                                src={article.urlToImage}
                                alt={article.title}
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                        </div>
                    )}

                    <div className="p-8 sm:p-12">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
                                <Globe className="w-4 h-4" />
                                {article?.source?.name || "Không rõ nguồn"}
                            </div>
                        </div>

                        <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6 leading-tight">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-6 mb-8 pb-8 border-b border-slate-200">
                            {article.author && (
                                <div className="flex items-center gap-2 text-slate-600">
                                    <User className="w-5 h-5 text-slate-400" />
                                    <span className="font-medium">{article.author}</span>
                                </div>
                            )}
                            <div className="flex items-center gap-2 text-slate-600">
                                <Calendar className="w-5 h-5 text-slate-400" />
                                <time>{formatDate(article.publishedAt)}</time>
                            </div>
                        </div>

                        {article.description && (
                            <div className="mb-8">
                                <p className="text-xl text-slate-700 leading-relaxed font-medium italic border-l-4 border-blue-500 pl-6 py-2 bg-blue-50/50">
                                    {article.description}
                                </p>
                            </div>
                        )}

                        {article.content && (
                            <div className="prose prose-lg max-w-none mb-8">
                                <p className="text-slate-700 leading-relaxed text-lg">
                                    {article.content}
                                </p>
                            </div>
                        )}

                        <div className="mt-12 pt-8 border-t border-slate-200">
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                            >
                                <span>Đọc bài viết đầy đủ</span>
                                <ExternalLink className="w-5 h-5" />
                            </a>
                            <p className="mt-3 text-sm text-slate-500">
                                Nguồn bài viết gốc:{" "}
                                {article.url ? new URL(article.url).hostname : "Không rõ"}
                            </p>
                        </div>
                    </div>
                </article>

                <div className="mt-8 bg-white rounded-2xl shadow-lg p-6 border border-slate-200">
                    <h3 className="text-lg font-bold text-slate-900 mb-4">
                        Thông tin bài viết
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                            <span className="text-slate-500">Nguồn:</span>
                            <span className="ml-2 font-medium text-slate-900">
                                {article?.source?.name || "Không rõ"}
                            </span>
                        </div>
                        <div>
                            <span className="text-slate-500">Tác giả:</span>
                            <span className="ml-2 font-medium text-slate-900">
                                {article.author || "Không rõ"}
                            </span>
                        </div>
                        <div>
                            <span className="text-slate-500">Ngày xuất bản:</span>
                            <span className="ml-2 font-medium text-slate-900">
                                {new Date(article.publishedAt).toLocaleDateString("vi-VN")}
                            </span>
                        </div>
                        <div>
                            <span className="text-slate-500">Thời gian:</span>
                            <span className="ml-2 font-medium text-slate-900">
                                {new Date(article.publishedAt).toLocaleTimeString("vi-VN")}
                            </span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
