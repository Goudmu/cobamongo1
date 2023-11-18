"use client"
import { useSession } from 'next-auth/react';
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

type typeThisProduct = {
  _id: number;
  cat: String;
  title: string;
  desc?: string;
  img?: string;
  price: number;
  qty: number
}

const CartPage = () => {
  const [cartProducts, setCartProducts] = useState<typeThisProduct[]>([]);
  const [totalPrice, setTotalPrice] = useState(0)
  const [totalQty, setTotalQty] = useState(0)
  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    const getData = async () => {
      await fetch(`https://cobamongo1-omega.vercel.app/singleCart?gmail=${session.data?.user?.email}`, {
            cache: "no-store"
      }).then(res => {
          return res.json()
      }).then(data => {
        if(data.cartss != null){
          let newTotalPrice = 0
          let newTotalQty = 0
          data.cartss.productsSchema.map((e:typeThisProduct) => {
            newTotalPrice += e.price + e.qty;
            newTotalQty += e.qty
          })
          setTotalPrice(newTotalPrice)
          setTotalQty(newTotalQty)
          setCartProducts(data.cartss.productsSchema)
        }
      })
    }
    getData()
  },[session])

  const removeHandler = async (id:number) => {
    let newCartsProduct:typeThisProduct[] = [];
    cartProducts.map(e => {
      if(e._id != id){
        newCartsProduct.push(e)
      }
    })
    await fetch("https://cobamongo1-omega.vercel.app/cart", {
        method: "PUT",
        body: JSON.stringify({
            gmail: session.data?.user?.email,
            productsSchema: newCartsProduct
        })
    })
    setCartProducts(newCartsProduct)
  }

  const checkOutHandler =async () => {
    await fetch("https://cobamongo1-omega.vercel.app/order", {
        method: "POST",
        body: JSON.stringify({
            gmail: session.data?.user?.email,
            productsSchema: cartProducts,
            totalPrice: totalPrice,
            totalQty: totalQty
        })
    }).then(() => router.push('/orders'))
  }


  return (
    <div className='h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex flex-col text-red-500 lg:flex-row ' >
      {/* PRODUCT CONTAINER */}
      <div className='flex-1 p-4 flex flex-col justify-center lg:h-full lg:w-2/3 2xl:w-1/2 lg:px-20 xl:px-40 overflow-scroll ' >
        {/* ITEM */}
        {
          cartProducts.map(e => (
            <div className='flex items-center justify-between mb-4 ' key={e._id} >
              {e.img && (
                <Image src={e.img} alt=''
                width={100} height={100} className='object-contain'
                />
              )}
              <div>
                <h1 className='uppercase text-xl font-bold' >{e.title} ({e.qty} Pcs)</h1>
              </div>
              <h2 className='font-bold' >${e.price}</h2>
              <span className='cursor-pointer ml-2' onClick={()=> removeHandler(e._id)} >X</span>
            </div>
          ))
        }
      </div >
      {/* PAYMENTCONTAINER */}
      <div className='flex-1 p-4 bg-fuchsia-50 flex flex-col gap-4 justify-center lg:h-full lg:w-1/3 2xl:w-1/2 lg:px-20 xl:px-40 2xl:text-xl 2xl:gap-6'>
        <div className='flex justify-between' >
          <span>Subtotal ({totalQty} items)</span>
          <span>${totalPrice}</span>
        </div>
        <div className='flex justify-between' >
          <span>Service Cost</span>
          <span className='text-green-500' >FREE!</span>
        </div>
        <div className='flex justify-between' >
          <span>Delivery Cost</span>
          <span className='text-green-500' >FREE!</span>
        </div>
        <hr className='my-2' />
        <div className='flex justify-between' >
          <span>Total (Include Tax)</span>
          <span className='font-bold'>${totalPrice}</span>
        </div>
        <button className='bg-red-500 w-1/2 
        text-white p-3 rounded-md
        self-end' type='button' onClick={checkOutHandler} >
          Check Out
        </button>
      </div>
    </div>
  )
}

export default CartPage