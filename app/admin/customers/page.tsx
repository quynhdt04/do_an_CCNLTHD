"use client";

import { apiDelete, apiGet } from "@/lib/api";
import { ChevronDown, ChevronLeft, ChevronRight, CirclePlus, Eye, Pencil, Search, Trash } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Swal from "sweetalert2";

interface User {
    _id: string;
    avatar: string;
    email: string;
    fullName: string;
    role: string;
    status: string;
}

interface UserResponse {
    success: boolean;
    users: User[];
}

interface UserDeleteResponse {
    success: boolean;
    user: User;
}

export default function CustomerPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 8;

    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const result = await apiGet<UserResponse>("/users");
                if (result.success) {
                    setUsers(result.users);
                }
            } catch (error) {
                console.error("Lỗi fetch users:", error);
            }
        };
        fetchAPI();
    }, []);

    const handleDel = async (id: string) => {
        const result = await Swal.fire({
            title: "Bạn có chắc chắn?",
            text: "Người dùng này sẽ bị xoá và không thể khôi phục!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Xoá",
            cancelButtonText: "Huỷ",
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
        });

        if (result.isConfirmed) {
            try {
                const res = await apiDelete<UserDeleteResponse>(`/users/${id}`);
                if (res.success) {
                    setUsers((prev) => prev.filter((item) => item._id !== res.user._id));
                    Swal.fire("Đã xoá!", "Người dùng đã bị xoá thành công.", "success");
                }
            } catch (error) {
                console.error("Lỗi delete user:", error);
                Swal.fire("Lỗi!", "Đã xảy ra lỗi khi xoá.", "error");
            }
        }
    };

    const totalPages = Math.ceil(users.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentData = users.slice(startIndex, startIndex + itemsPerPage);

    return (
        <>
            <div className="w-full p-2 bg-[#F8F8F8]">
                <div className="bg-white ">
                    <div className="flex items-center justify-between py-4">
                        <div className="flex-1">
                            <div className="flex items-center border border-gray-400 rounded-md w-[250px] p-1">
                                <span className="mr-1"><Search size={18} /></span>
                                <input type="text" className="text-sm flex-1 focus:outline-none" placeholder="Tìm kiếm theo Email hoặc Tên" />
                            </div>
                        </div>

                        <div className="flex items-center space-x-5">
                            <div className="flex items-center">
                                <span className="text-sm font-semibold">Sắp xếp: </span>
                                <select className="border-0 shadow-none focus:ring-0 focus:outline-none text-sm text-red-600 font-semibold">
                                    <option value="az" className="text-red-600 font-semibold">A - Z</option>
                                    <option value="za" className="text-red-600 font-semibold">Z - A</option>
                                </select>
                            </div>
                            <div className="relative">
                                <select
                                    className="appearance-none text-sm px-2 py-1 pr-8 rounded-lg border border-gray-300 bg-white text-gray-700 focus:outline-none cursor-pointer"
                                >
                                    <option value="all">-- Tất cả --</option>
                                    <option value="active">Hoạt động</option>
                                    <option value="inactive">Ngừng hoạt động</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                            </div>
                            <Link href="/admin/customers/add" className="flex items-center text-base text-white bg-blue-900 rounded-sm cursor-pointer space-x-1 px-2 py-1">
                                <span><CirclePlus size={16} /></span>
                                <span>Thêm mới</span>
                            </Link>
                        </div>
                    </div>
                    <table className="w-full border border-gray-100 table-auto">
                        <thead className="border border-gray-100 bg-[#F9F9F9]">
                            <tr>
                                <th className="p-2 text-left">Avatar</th>
                                <th className="p-2 text-center">Email</th>
                                <th className="p-2 text-center">Họ tên</th>
                                <th className="p-2 text-center">Vai trò</th>
                                <th className="p-2 text-center">Trạng thái</th>
                                <th className="p-2 text-center">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length > 0 && users.map((item) => (
                                <tr key={item._id} className="border-t border-gray-100">
                                    <td className="p-2">
                                        <div className="w-[40px] h-[40px] rounded-full overflow-hidden">
                                            <Image
                                                src={item.avatar || "/vest.png"}
                                                alt="avatar"
                                                width={40}
                                                height={40}
                                                className="object-cover"
                                            />
                                        </div>
                                    </td>
                                    <td className="text-sm text-center p-2">{item.email}</td>
                                    <td className="text-sm text-center p-2">{item.fullName}</td>
                                    <td className="text-sm text-center p-2">{item.role}</td>
                                    <td className="p-2 text-center">
                                        {item.status ? (
                                            <span className="text-xs text-green-800 bg-green-200 px-2 py-1 rounded-md">
                                                Hoạt động
                                            </span>
                                        ) : (
                                            <span className="text-xs text-red-800 bg-red-200 px-2 py-1 rounded-md">
                                                Ngừng hoạt động
                                            </span>
                                        )}
                                    </td>
                                    <td className="p-2">
                                        <div className="flex items-center justify-center space-x-2">
                                            <Link href={`/admin/customers/edit/${item._id}`}>
                                                <span className="cursor-pointer"><Pencil /></span>
                                            </Link>
                                            <span className="cursor-pointer"
                                                onClick={() => handleDel(item._id)}>
                                                <Trash />
                                            </span>
                                            <span className="cursor-pointer"><Eye /></span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {users.length > itemsPerPage && (
                        <div className="flex justify-between items-center p-2">
                            <button
                                className="flex items-center px-3 py-1 text-sm border rounded-md disabled:opacity-50 cursor-pointer"
                                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <ChevronLeft size={16} /> Trước
                            </button>

                            <div className="flex space-x-2">
                                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                                    <button
                                        key={num}
                                        className={`px-3 py-1 text-sm rounded-md border cursor-pointer ${currentPage === num
                                            ? "bg-blue-600 text-white"
                                            : "bg-white text-gray-700 hover:bg-gray-100"
                                            }`}
                                        onClick={() => setCurrentPage(num)}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>

                            <button
                                className="flex items-center px-3 py-1 text-sm border rounded-md disabled:opacity-50 cursor-pointer"
                                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                                disabled={currentPage === totalPages}
                            >
                                Sau <ChevronRight size={16} />
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}