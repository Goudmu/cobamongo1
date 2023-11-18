import connectMongoDB from "@/libs/mongodb"
import {cats} from "@/models/models"
import { NextRequest, NextResponse } from "next/server"

export const POST = async (request : NextRequest) => {
    const {title, desc, img, color, cat, productsSchema} = await request.json()
    await connectMongoDB()
    await cats.create({title, desc, img, color, productsSchema, cat})
    return NextResponse.json({message: "Cat Created"}, {status:201})
}
export const GET = async () => {
    await connectMongoDB()
    const catGet = await cats.find()
    return NextResponse.json({catGet})
}

export const DELETE = async(request:NextRequest) => {
    const id = request.nextUrl.searchParams.get("id");
    await connectMongoDB()
    await cats.findByIdAndDelete(id)
    return NextResponse.json({message:"Cat has deleted"}, {status:200})
}