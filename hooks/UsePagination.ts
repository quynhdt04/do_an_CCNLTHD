"use client";

import { useMemo, useState } from "react";

export default function UsePagination(data = [], defaultPageSize = 10) {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSize || 10);

    const totalPages = Math.ceil(data.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const paginatedData = useMemo(() => {
        return data.slice(startIndex, endIndex);
    }, [data, startIndex, endIndex]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    }

    const handlePageSizeChange = (size: number) => {
        setPageSize(size);
        setCurrentPage(1);
    }

    return {
        currentPage,
        pageSize,
        totalPages,
        startIndex,
        paginatedData,
        handlePageChange,
        handlePageSizeChange,
    };
}