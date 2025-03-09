import { NextRequest, NextResponse } from "next/server";

export const runtime = 'edge'
export const POST = async (request: NextRequest) => {


    const body = await request.formData();
    const formData = new FormData();
   formData.append("file", body.get("file") as Blob);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!
    );

    try {
        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/auto/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );
        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }

        const data = await response.json(); 

    const dataObj = {
            url: data.secure_url,
            duration: data.duration || null,
        }
        return NextResponse.json({ message: 'File uploaded successfully', data: dataObj, status: 200 })
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        return NextResponse.json({
            message: 'Error uploading to Cloudinary',
            data: error, status: 500
        })
    }
}