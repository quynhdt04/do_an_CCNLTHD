import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";
import argon2 from 'argon2';

// [POST] /api/users/add
export async function POST(req: Request) {
    try {
        await connectDB();

        const body = await req.json();
        const { fullName, email, password, avatar, role, status } = body;

        if (!fullName || !email || !password) {
            return NextResponse.json({ error: "Thiếu dữ liệu bắt buộc" }, { status: 400 });
        }

        const hashedPassword = await argon2.hash(password);

        const data: any = {
            fullName: fullName,
            email: email,
            password: hashedPassword,
            role: role,
            status: status
        }
        if (avatar) {
            data.avatar = avatar;
        }

        const newUser = new User(data);

        await newUser.save();

        const userToReturn = newUser.toObject();
        delete userToReturn.password;


        return NextResponse.json({ message: "Tạo user thành công", user: userToReturn }, { status: 201 });
    } catch (error) {
        console.error("POST /api/users error:", error);
        return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
    }
}

// [GET] /api/users
export async function GET(req: Request) {
    try {
        await connectDB();
        const users = await User.find({ deleted: false }).select("-password");

        return NextResponse.json({ success: true, users }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
    }
}