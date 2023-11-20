"use client"
import { Product } from '@/types/type'
import Image from 'next/image'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {useEffect, useState} from 'react'

const CategoryPage = () => {
  const [catPage, setcatPage] = useState<Product[]>([])
  const params = useParams()
  useEffect(() => {
    const getData =async (category: string) => {
      let newProduct:Product[] = [];
      await fetch(`https://cobamongo1-omega.vercel.app/api/products2`, {
        cache : "no-store"
      }).then(res => res.json())
      .then(data => {
        data.productss.map((e:Product) => {
          if(e.cat == params.category.toString()){
            newProduct.push(e)
          }
        })
        setcatPage(newProduct)
      })
    }
    getData(params.category.toString())
  },[])

  return (
    <div className='flex flex-wrap text-[#04979e]' >
      {catPage.map(item => (
        <Link 
        className=' 
        w-full h-[60vh] border-r-2 border-b-2 
        border-cyan-500 sm:w-1/2 lg:w-1/3 p-4
        flex flex-col justify-between group
        even:bg-[#F1F1F1]' 
        key={item._id} href={`/product/${item._id}`}>
            {
              item.img && (
                <div className='relative h-[80%]' >
                  <Image src={item.img} alt='' fill
                  className='object-contain' sizes='100%' priority={true} />
                </div>
              )
            }
          <div className='flex items-center 
          justify-between font-bold
          ' >
            <h1 className='text-xl uppercase p-2' >{item.title}</h1>
            <h2 className='text-xl group-hover:hidden' >${item.price}</h2>
            <button className='hidden group-hover:block uppercase bg-[#04979e]
            text-white p-2 rounded-lg text-sm'>
              Add to Cart
              </button>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default CategoryPage