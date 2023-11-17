import connectMongoDB from "@/libs/mongodb"
import products from "@/models/products"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request : NextRequest) => {
    const {title, desc, img, price, isFeatured, cat} = await request.json()
    await connectMongoDB()
    await products.create({title, desc, img, price, isFeatured, cat})
    return NextResponse.json({message: "Products Created"}, {status:201})
}
export const GET = async () => {
    await connectMongoDB()
    const productss = await products.find()
    return NextResponse.json({productss})
}

export const DELETE = async(request:NextRequest) => {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB()
    await products.findByIdAndDelete(id)
    return NextResponse.json({message:"Products has deleted"}, {status:200})
}