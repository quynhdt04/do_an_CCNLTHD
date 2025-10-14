"use client";

import { Eye, EyeClosed, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface RegisterModalProps {
    setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RegisterModal({ setOpenRegister }: RegisterModalProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isChecked, setIsChecked] = useState(true);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("fullName:", fullName);
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div className="fixed inset-0 bg-black/40 z-999 flex items-center justify-center">
            <div className="bg-white shadow-lg w-full max-w-md p-6 relative">
                <div className="relative flex flex-col items-center justify-center mb-4">
                    <div className="text-xl font-semibold uppercase space-y-1">Đăng ký</div>
                    <span className="absolute top-0 right-0 cursor-pointer">
                        <X size={20} onClick={() => setOpenRegister(false)} />
                    </span>
                    <div className="flex items-center justify-center text-xs mt-2 text-center">
                        <span>
                            Bạn chưa có tài khoản? Đăng ký ngay
                        </span>
                    </div>
                </div>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label htmlFor="fullName" className="text-base uppercase mb-1">
                            tên bạn
                        </label>
                        <input
                            type="text"
                            id="fullName"
                            placeholder="Họ tên của bạn *"
                            value={email}
                            onChange={(e) => setFullName(e.target.value)}
                            className="text-base border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="email" className="text-base uppercase mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="text-base border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label htmlFor="password" className="text-base uppercase mb-1">
                            Password
                        </label>
                        <div className="flex items-center border border-gray-300 rounded">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                placeholder="Mật khẩu"
                                value={password}
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
                    <div className="flex flex-col items-start">
                        <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                        />

                        <span className="text-xs flex items-center flex-wrap break-words">
                            Tôi đồng ý mọi giao dịch mua bán theo
                            <Link href="/" className="font-semibold underline mx-1">
                                Điều kiện sử dụng
                            </Link>
                            và
                            <Link href="/" className="font-semibold underline mx-1">
                                Chính sách của
                            </Link>
                            Lothing shop
                        </span>
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2 bg-black text-white uppercase font-semibold rounded cursor-pointer"
                    >
                        Đăng ký
                    </button>
                </form>
            </div>
        </div>
    );
}
