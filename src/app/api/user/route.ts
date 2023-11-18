import connectMongoDB from "@/libs/mongodb";
import { usersAdmin } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(request: NextRequest) => {
    try {
        const{username, gmail} = await request.json()
        await connectMongoDB()
        const userss = await usersAdmin.create({gmail, username});
        return NextResponse.json({userss}, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Something went wrong"}, {status:400})
    }
}
export const GET = async(request: NextRequest) => {
    try {
        await connectMongoDB()
        const userss = await usersAdmin.find()
        return NextResponse.json({userss}, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Something went wrong"}, {status:400})
    }
}