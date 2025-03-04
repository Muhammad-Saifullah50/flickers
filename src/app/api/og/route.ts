import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export const GET = async (request: NextRequest) => {
    console.log(request)

    return NextResponse.json(({
        message: "Hello World",
    }))
}