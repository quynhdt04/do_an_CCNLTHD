
"use client";

import { useState } from "react";
import { handleContact } from "./actions";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState("");
    const [result, setResult] = useState("");

    async function onSubmit(e: React.FormEvent) {
        e.preventDefault();

        // Validation client-side
        if (!name || !message) {
            setResult("Vui lòng nhập đầy đủ thông tin!");
            return;
        }

        // Gọi server action
        const res = await handleContact(new FormData(e.currentTarget as HTMLFormElement));

        setResult(res.msg);
        setName("");
        setMessage("");
    }

    return (
        <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Liên hệ với chúng tôi</h2>
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    name="name"
                    placeholder="Tên của bạn"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="p-2 border rounded"
                />
                <textarea
                    name="message"
                    placeholder="Nội dung tin nhắn"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="p-2 border rounded"
                />
                <button
                    type="submit"
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
                >
                    Gửi
                </button>
            </form>
            {result && <p className="mt-4 text-green-600">{result}</p>}
        </div>
    );
}
