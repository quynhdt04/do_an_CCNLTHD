import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse } from "next/server";

// [GET] /api/users/:id
export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await context.params;
        const user = await User.findById(id).select("-password");

        if (!user) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy user" },
                { status: 404 }
            );
        }

        return NextResponse.json({ success: true, user }, { status: 200 });
    } catch (error) {
        console.error("GET /api/customers/[id] error:", error);
        return NextResponse.json({ error: "Lỗi server" }, { status: 500 });
    }
}


// [PATCH] /api/users/:id
export async function PATCH(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();
        const { id } = await context.params;
        const body = await req.json();

        const updateUser = await User.findByIdAndUpdate(
            id,
            { $set: body },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updateUser) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy user" },
                { status: 404 }
            )
        }

        return NextResponse.json({
            success: true, user: updateUser
        }, {
            status: 200
        });
    } catch (error) {

        console.error("PATCH /api/users/[id] error:", error);
        return NextResponse.json(
            { success: false, message: "Lỗi server" },
            { status: 500 }
        );
    }
}


// [DELETE] /api/users/:id
// export async function DELETE(
//     req: Request,
//     context: { params: Promise<{ id: string }> }
// ) {
//     try {
//         await connectDB();

//         const { id } = await context.params;

//         const deletedUser = await User.findByIdAndDelete(id).select("-password");

//         if (!deletedUser) {
//             return NextResponse.json(
//                 { success: false, message: "Không tìm thấy user" },
//                 { status: 404 }
//             );
//         }

//         return NextResponse.json(
//             { success: true, message: "Xóa user thành công", user: deletedUser },
//             { status: 200 }
//         );
//     } catch (error) {
//         console.error("DELETE /api/users/[id] error:", error);
//         return NextResponse.json(
//             { success: false, message: "Lỗi server" },
//             { status: 500 }
//         );
//     }
// }

export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await context.params;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { deleted: true },
            { new: true }
        ).select("-password");

        if (!updatedUser) {
            return NextResponse.json(
                { success: false, message: "Không tìm thấy user" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Xóa mềm user thành công", user: updatedUser },
            { status: 200 }
        );
    } catch (error) {
        console.error("DELETE /api/users/[id] error:", error);
        return NextResponse.json(
            { success: false, message: "Lỗi server" },
            { status: 500 }
        );
    }
}