"use client"
import { Menu } from '@/types/type'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const MenuPage = () => {
  const [menu, setMenu] = useState<Menu>([]);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      await fetch("https://cobamongo1-omega.vercel.app/api/categories", {
        cache : "no-store"
      }).then(res => res.json())
      .then(data => {
        setMenu(data.catGet)
        setisLoading(false)
      })
    }
    getData()
  },[])

  if(isLoading){
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
  } else {
    return (
      <div className='md:min-h-[calc(100vh-15rem)]' >
        <div className='p-4 lg:px-20 xl:px-40
        md-[calc(100vh-9rem)] gap-4 grid grid-row-1 md:grid-cols-2'>
          {menu.map(category => (
            <Link key={category._id} href={`/menu/${category.cat}`} 
            className='w-full bg-cover p-8 rounded-md md:transform md:transition md:duration-500 md:hover:scale-105' 
            style={{backgroundImage:`url(${category.img})`}}
            >
              <div className={`text-${category.color} w-1/2`} >
                <h1 className='uppercase font-bold text-3xl' >{category.title}</h1>
                <p className='text-sm my-6' >{category.desc}</p>
                <button className={`hidden 2xl:block bg-[#04979e] text-${category.color === "white" ? "white" : "black"} py-2 px-4 rounded-md `}>Explore</button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    )
  }

}

export default MenuPage