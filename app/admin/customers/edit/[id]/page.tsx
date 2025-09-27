"use client";

import { apiGet, apiPatch, apiUpload } from "@/lib/api";
import { Eye, EyeClosed, Loader2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

interface User {
    _id: string;
    fullName: string;
    avatar: string;
    email: string;
    role: string;
    status: string;
}

interface UserResponse {
    success: boolean;
    user: User;
}

export default function EditCustomerPage() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const [preview, setPreview] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [password, setPassword] = useState("");

    const [infoUser, setInfoUser] = useState<User | null>(null);

    // Fetch user by id
    useEffect(() => {
        const fetchAPI = async () => {
            try {
                const result = await apiGet<UserResponse>(`/users/${id}`);
                if (result.success) {
                    setInfoUser(result.user);
                }
            } catch (error) {
                console.error("Lỗi fetch info user:", error);
            }
        };
        fetchAPI();
    }, [id]);

    const handleChange = (field: keyof User, value: string) => {
        setInfoUser((prev) => (prev ? { ...prev, [field]: value } : prev));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    const handleRemoveImage = () => {
        setPreview(null);
        setAvatarFile(null);
        const input = document.getElementById("avatar") as HTMLInputElement;
        if (input) input.value = "";
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!infoUser) return;

        setLoading(true);

        try {
            let avatarUrl = infoUser.avatar;

            // upload avatar nếu có chọn file
            if (avatarFile) {
                const uploadForm = new FormData();
                uploadForm.append("files", avatarFile);

                const uploadRes = await apiUpload<{ success: boolean; results: any[] }>(
                    "/upload",
                    uploadForm
                );

                if (uploadRes.success && uploadRes.results.length > 0) {
                    avatarUrl = uploadRes.results[0].secure_url;
                }
            }

            // data gửi lên server
            const data = {
                email: infoUser.email,
                fullName: infoUser.fullName,
                role: infoUser.role,
                status: infoUser.status,
                avatar: avatarUrl,
                ...(password ? { password } : {}),
            };

            await apiPatch(`/users/${id}`, data);

            router.push("/admin/customers");
        } catch (err) {
            console.error("Lỗi cập nhật user:", err);
        } finally {
            setLoading(false);
        }
    };

    if (!infoUser) {
        return <p className="p-5">Đang tải dữ liệu...</p>;
    }

    return (
        <div className="relative w-full p-2 bg-[#F8F8F8]">
            <div className="bg-white p-5">
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Email */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-base font-medium">Email: </label>
                        <input
                            type="email"
                            name="email"
                            required
                            className="flex-1 w-full text-base border border-gray-600 rounded-sm p-1 text-gray-700
                focus:outline-none focus:border-blue-500"
                            value={infoUser.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                    </div>

                    {/* FullName */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-base font-medium">Họ tên: </label>
                        <input
                            type="text"
                            name="fullName"
                            required
                            className="flex-1 w-full text-base border border-gray-600 rounded-sm p-1 text-gray-700
                focus:outline-none focus:border-blue-500"
                            value={infoUser.fullName}
                            onChange={(e) => handleChange("fullName", e.target.value)}
                        />
                    </div>

                    {/* Password */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-base font-medium">Mật khẩu (mới): </label>
                        <div className="flex items-center border border-gray-300 rounded">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                placeholder="Nhập mật khẩu mới nếu muốn đổi"
                                onChange={(e) => setPassword(e.target.value)}
                                className="text-base p-2 flex-1 focus:outline-none"
                            />
                            <span
                                className="px-2 cursor-pointer"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                            </span>
                        </div>
                    </div>

                    {/* Avatar */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-base font-medium">Avatar:</label>
                        <input
                            type="file"
                            id="avatar"
                            accept="image/*"
                            onChange={handleFileChange}
                            className="text-sm cursor-pointer"
                        />

                        {(preview || infoUser.avatar) && (
                            <div className="relative mt-3 w-[100px] h-[100px]">
                                <div className="w-full h-full rounded-full overflow-hidden border border-gray-200">
                                    <Image
                                        src={preview || infoUser.avatar}
                                        alt="Avatar preview"
                                        width={100}
                                        height={100}
                                        className="object-cover"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={handleRemoveImage}
                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow hover:bg-red-600"
                                >
                                    <X size={14} />
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Role */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-base font-medium">Vai trò: </label>
                        <select
                            name="role"
                            value={infoUser.role}
                            onChange={(e) => handleChange("role", e.target.value)}
                            className="text-base border border-gray-600 rounded-sm p-1 text-gray-700
                focus:outline-none focus:border-blue-500"
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>

                    {/* Status */}
                    <div className="flex flex-col space-y-2">
                        <label className="text-base font-medium">Trạng thái:</label>
                        <div className="flex items-center space-x-6">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="active"
                                    checked={infoUser.status === "active"}
                                    onChange={() => handleChange("status", "active")}
                                    className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                                />
                                <span className="text-base text-gray-700">Hoạt động</span>
                            </label>

                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input
                                    type="radio"
                                    name="status"
                                    value="inactive"
                                    checked={infoUser.status === "inactive"}
                                    onChange={() => handleChange("status", "inactive")}
                                    className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                                />
                                <span className="text-base text-gray-700">Ngừng hoạt động</span>
                            </label>
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex items-center justify-end space-x-2">
                        <Link href="/admin/customers">
                            <button
                                type="button"
                                className="text-sm bg-gray-400 text-white px-4 py-2 rounded-sm cursor-pointer hover:bg-gray-600"
                            >
                                Trở lại
                            </button>
                        </Link>
                        <button
                            type="submit"
                            className="text-sm bg-blue-400 text-white px-4 py-2 rounded-sm cursor-pointer hover:bg-blue-600"
                        >
                            Cập nhật
                        </button>
                    </div>
                </form>
            </div>

            {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                    <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                </div>
            )}
        </div>
    );
}
