import connectMongoDB from "@/libs/mongodb";
import { carts2 } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

export const GET =async (request:NextRequest) => {
    try {
        const gmail = request.nextUrl.searchParams.get("gmail");
        await connectMongoDB()
        const cartss = await carts2.findOne({gmail:gmail})
        return NextResponse.json({cartss}, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Something went wrong"}, {status:400})
    }
}