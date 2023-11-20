"use client"
import { Product } from '@/types/type';
import { useSession } from 'next-auth/react';
import React, {useState, useEffect} from 'react'
import { toast } from 'react-toastify';

type typeThisProduct = {
    _id: number;
    cat: String;
    title: string;
    desc?: string;
    img?: string;
    price: number;
    qty: number
}


const Price = ({ product }: { product: Product }) => {
    const [total, setTotal] = useState(product.price);
    const [qty, setqty] = useState(1);
    const [thisProduct, setThisProduct] = useState<typeThisProduct>()
    const session = useSession()

    useEffect(() => {
        // console.log(session)
        setThisProduct({
            _id:product._id,
            cat: product.cat,
            title: product.title,
            desc: product.desc,
            img: product.img,
            price: product.price,
            qty
        })
    },[])

    useEffect(() => {
        setTotal(qty * product.price)
        setThisProduct({
            _id:product._id,
            cat: product.cat,
            title: product.title,
            desc: product.desc,
            img: product.img,
            price: product.price,
            qty
        })
    }, [qty, product.price])

    const addHandler = async () => {
        await fetch(`https://cobamongo1-omega.vercel.app/api/singleCart?gmail=${session.data?.user?.email}`, {
            cache: "no-store"
        }).then(res => {
            return res.json()
        })
        .then(async (data) => {
            if(data.cartss != null){
                let newCarts:typeThisProduct[] = data.cartss.productsSchema
                let exist = false
                for (let index = 0; index < data.cartss.productsSchema.length; index++) {
                    if(data.cartss.productsSchema[index]._id == product._id){
                        newCarts[index].qty += qty
                        exist= true
                    }
                }
                if(exist == false && thisProduct != undefined){
                    newCarts.push(thisProduct)
                }
                
                await fetch("https://cobamongo1-omega.vercel.app/api/cart", {
                    method: "PUT",
                    body: JSON.stringify({
                        gmail: session.data?.user?.email,
                        productsSchema: newCarts
                    })
                }).then(() => toast.success("The Product has been added"))
            } else {
                fetch("https://cobamongo1-omega.vercel.app/api/cart", {
                    method: "POST",
                    body: JSON.stringify({
                        gmail: session.data?.user?.email,
                        productsSchema: thisProduct
                    })
                }).then(() => toast.success("The Product has been added"))
            }
        })
    }

  return (
    <div className='flex flex-col gap-4' >
        <h2 className='text-2xl font-semibold' >${total.toFixed(2)}</h2>
        <div className='flex justify-between items-center' >
            <div className='flex justify-between w-full p-3 ring-1 ring-[#04979e]' >
                <span>Qty</span>
                <div className='flex flex-row gap-5 items-center' >
                    <button onClick={() => setqty(prev => prev > 1 ? prev - 1: prev )}>{'<'}</button>
                    <span>{qty}</span>
                    <button onClick={() => setqty(prev => prev + 1)}>{'>'}</button>
                </div>
            </div>
            <button onClick={addHandler} type='button' className='uppercase w-56 bg-[#04979e] text-white p-3 ring-1 ring-[#04979e]' >Add To Cart</button>
        </div>
    </div>
  )
}

export default Price