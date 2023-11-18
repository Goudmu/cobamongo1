import connectMongoDB from "@/libs/mongodb";
import { carts2 } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(request: NextRequest) => {
    try {
        const{gmail, productsSchema} = await request.json()
        await connectMongoDB()
        const cartss = await carts2.create({gmail, productsSchema});
        return NextResponse.json({cartss}, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Something went wrong"}, {status:400})
    }
}

export const GET =async () => {
    try {
        await connectMongoDB()
        const cartss = await carts2.find();
        return NextResponse.json({cartss}, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Something went wrong"}, {status:400})
    }
}

export const PUT =async (request:NextRequest) => {
    try {
        const{productsSchema,id,gmail} = await request.json()
        await connectMongoDB()
        const cartss = await carts2.findOneAndUpdate({gmail:gmail},{
            productsSchema:productsSchema
        },{new:true})
        return NextResponse.json({cartss}, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Something went wrong"}, {status:400})
    }
}

export const DELETE =async (request:NextRequest) => {
    try {
        const{gmail} = await request.json()
        await connectMongoDB()
        const cartss = await carts2.findOneAndDelete({gmail:gmail})
        return NextResponse.json({cartss}, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Something went wrong"}, {status:400})
    }
}