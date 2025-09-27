"use client";

import { Eye, EyeClosed, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

interface LoginModalProps {
    setOpenLogin: React.Dispatch<React.SetStateAction<boolean>>;
    setOpenRegister: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginModal({ setOpenLogin, setOpenRegister }: LoginModalProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <>
            <div className="fixed inset-0 bg-black/40 z-999 flex items-center justify-center">
                <div className="bg-white shadow-lg w-full max-w-md p-6 relative">
                    <div className="relative flex flex-col items-center justify-center mb-4">
                        <div className="text-xl font-semibold uppercase space-y-1">Đăng nhập</div>
                        <span className="absolute top-0 right-0 cursor-pointer">
                            <X size={20} onClick={() => setOpenLogin(false)} />
                        </span>
                        <div className="flex items-center justify-center text-xs mt-2 text-center">
                            <span>
                                Bạn chưa có tài khoản? Đăng ký để trở thành thành viên{" "}
                                <span className="font-semibold underline cursor-pointer text-blue-600"
                                    onClick={() => { setOpenLogin(false); setOpenRegister(true); }}>
                                    tại đây
                                </span>
                            </span>
                        </div>
                    </div>

                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="text-base uppercase mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                placeholder="Email *"
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

                        <div className="flex items-center justify-start text-xs">
                            <span>
                                Quên mật khẩu? Khôi phục{" "}
                                <Link
                                    href="/user/forgot-password"
                                    className="font-semibold underline text-blue-600"
                                >
                                    tại đây
                                </Link>
                            </span>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-2 bg-black text-white uppercase font-semibold rounded cursor-pointer"
                        >
                            Đăng nhập
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}
