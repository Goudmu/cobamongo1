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
      await fetch(`https://cobamongo1-omega.vercel.app/api/singleProduct?id=${id}`, {
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
      <div className='w-screen h-screen grid place-items-center' >
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
          role="status">
          <span
            className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
            >Loading...</span>
        </div>
      </div>
    )
  }
  return (
    <div className='p-4 lg:px-20 xl:px-40 
    flex flex-col 
    justify-around text-[#04979e]
    md:flex-row h-screen
    md:gap-8 md:items-center
    bg-[#F1F1F1]
    ' >
        {product.img &&
          (
          <div className='relative w-full h-1/2 md:h-[70%] ' >
            <Image src={product.img} alt='' 
            fill className='object-contain' sizes='100%' priority={true} />
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