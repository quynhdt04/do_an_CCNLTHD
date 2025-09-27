import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";

export async function POST(req: Request) {
    try {
        const formData = await req.formData();
        const files = formData.getAll("files") as File[];

        if (!files || files.length === 0) {
            return NextResponse.json({ error: "Không có file nào" }, { status: 400 });
        }

        const uploadPromises = files.map(async (file) => {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            return new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({ folder: "nextjs_uploads" }, (err, result) => {
                        if (err) return reject(err);
                        resolve(result);
                    })
                    .end(buffer);
            });
        });

        const results = await Promise.all(uploadPromises);

        return NextResponse.json({ success: true, results });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
