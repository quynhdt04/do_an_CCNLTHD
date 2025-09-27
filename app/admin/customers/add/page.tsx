"use client";

import { useState } from "react";
import Image from "next/image";
import { Eye, EyeClosed, Loader2, X } from "lucide-react";
import Link from "next/link";
import { apiPost, apiUpload } from "@/lib/api";
import { useRouter } from "next/navigation";

export default function AddCustomerPage() {
    const router = useRouter();
    const [preview, setPreview] = useState<string | null>(null);
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

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
        setLoading(true);

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);

        let avatarUrl = "";

        try {
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

            const data = {
                email: formData.get("email"),
                fullName: formData.get("fullName"),
                password,
                role: formData.get("role"),
                status: formData.get("status"),
                avatar: avatarUrl,
            };

            const result = await apiPost("/users", data);
            console.log("Tạo user thành công:", result);
            router.push("/admin/customers");
        } catch (err) {
            console.error("Lỗi tạo user:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="relative w-full p-2 bg-[#F8F8F8]">
                <div className="bg-white p-5">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="email" className="text-base font-medium">Email: </label>
                            <input
                                type="email"
                                name="email"
                                required
                                placeholder="Nhập email"
                                className="flex-1 w-full text-base border border-gray-600 rounded-sm p-1 text-gray-700
                                focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="fullName" className="text-base font-medium">Họ tên: </label>
                            <input
                                type="text"
                                name="fullName"
                                required
                                placeholder="Nhập họ tên"
                                className="flex-1 w-full text-base border border-gray-600 rounded-sm p-1 text-gray-700
                                focus:outline-none focus:border-blue-500" />
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="password" className="text-base font-medium">Mật khẩu: </label>
                            <div className="flex items-center border border-gray-300 rounded">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    value={password}
                                    placeholder="Mật khẩu *"
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="text-base p-2 flex-1 focus:outline-none"
                                    required
                                />
                                <span
                                    className="px-2 cursor-pointer"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <Eye size={18} /> : <EyeClosed size={18} />}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="avatar" className="text-base font-medium">
                                Avatar:
                            </label>
                            <input
                                type="file"
                                id="avatar"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="text-sm cursor-pointer"
                            />

                            {preview && (
                                <div className="relative mt-3 w-[100px] h-[100px]">
                                    <div className="w-full h-full rounded-full overflow-hidden border border-gray-200">
                                        <Image
                                            src={preview}
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
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="role" className="text-base font-medium">Vai trò: </label>
                            <select
                                name="role"
                                id="role"
                                className="text-base border border-gray-600 rounded-sm p-1 text-gray-700
                                focus:outline-none focus:border-blue-500">
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <label htmlFor="status" className="text-base font-medium">Trạng thái:</label>
                            <div className="flex items-center space-x-6">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="active"
                                        defaultChecked
                                        className="h-4 w-4 text-green-600 border-gray-300 focus:ring-green-500"
                                    />
                                    <span className="text-base text-gray-700">Hoạt động</span>
                                </label>

                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="radio"
                                        name="status"
                                        value="inactive"
                                        className="h-4 w-4 text-red-600 border-gray-300 focus:ring-red-500"
                                    />
                                    <span className="text-base text-gray-700">Ngừng hoạt động</span>
                                </label>
                            </div>
                        </div>
                        <div className="flex items-center justify-end space-x-2">
                            <button className="text-sm bg-gray-400 text-white px-4 py-2 rounded-sm cursor-pointer
                                    hover:bg-gray-600">
                                <Link href="/admin/customers">
                                    Trở lại
                                </Link>
                            </button>
                            <button type="submit"
                                className="text-sm bg-blue-400 text-white px-4 py-2 rounded-sm cursor-pointer
                                hover:bg-blue-600">Thêm mới</button>
                        </div>
                    </form>
                </div>
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/60">
                        <Loader2 className="w-10 h-10 text-blue-500 animate-spin" />
                    </div>
                )}
            </div>
        </>
    );
}
