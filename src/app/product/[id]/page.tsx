"use client"
import Price from '@/components/Price'
import { singleProduct } from '@/data'
import { Product } from '@/types/type'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import {useEffect, useState} from 'react'

const SingeProductPage = () => {
  const [product, setProduct] = useState<Product>();
  const {id} = useParams()

  useEffect(() => {
    const getData = async () => {
      await fetch(`http://localhost:3000/api/singleProduct?id=${id}`, {
        cache : "no-store"
      }).then(res => res.json())
      .then(data => {
        setProduct(data.productss)
      })
    }
    getData()
  },[])

  if(product == undefined){
    return(
      <div>Product is Not Available</div>
    )
  }
  return (
    <div className='p-4 lg:px-20 xl:px-40 
    flex flex-col 
    justify-around text-red-500
    md:flex-row h-screen
    md:gap-8 md:items-center
    ' >
        {product.img &&
          (
          <div className='relative w-full h-1/2 md:h-[70%] ' >
            <Image src={product.img} alt='' 
            fill className='object-contain' />
          </div>
        )}
      <div className='h-1/2 flex flex-col gap-4 md:h-[70%] md:justify-center md:gap-6 xl:gap-8 ' >
          <h1 className='text-3xl xl:text-5xl font-bold uppercase' >{product.title}</h1>
          <p>{product.desc}</p>
          <Price product={product} />
      </div>
    </div>
  )
}

export default SingeProductPage