import connectMongoDB from "@/libs/mongodb";
import { orders2 } from "@/models/models";
import { NextRequest, NextResponse } from "next/server";

export const POST = async(request: NextRequest) => {
    try {
        const{gmail, productsSchema, totalPrice, totalQty} = await request.json()
        await connectMongoDB()
        const orderss = await orders2.create({gmail, productsSchema,totalPrice , totalQty});
        return NextResponse.json({orderss}, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Something went wrong"}, {status:400})
    }
}

export const GET =async () => {
    try {
        await connectMongoDB()
        const orderss = await orders2.find();
        return NextResponse.json({orderss}, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Something went wrong"}, {status:400})
    }
}

export const PUT =async (request:NextRequest) => {
    try {
        const{status,gmail} = await request.json()
        await connectMongoDB()
        const orderss = await orders2.findOneAndUpdate({gmail:gmail},{
            status:status
        },{new:true})
        return NextResponse.json({orderss}, {status:200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({message:"Something went wrong"}, {status:400})
    }
}