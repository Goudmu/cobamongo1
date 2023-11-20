"use client"
import { Menu } from '@/types/type'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'


const MenuPage = () => {
  const [menu, setMenu] = useState<Menu>([]);

  useEffect(() => {
    const getData = async () => {
      await fetch("https://cobamongo1-omega.vercel.app/api/categories", {
        cache : "no-store"
      }).then(res => res.json())
      .then(data => {
        setMenu(data.catGet)
      })
    }
    getData()
  },[])

  return (
    <div className='p-4 lg:px-20 xl:px-40
    md-[calc(100vh-9rem)] gap-4 grid grid-row-1 md:grid-cols-2'>
      {menu.map(category => (
        <Link key={category._id} href={`/menu/${category.cat}`} 
        className='w-full md:h-1/2 bg-cover p-8 rounded-md' 
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
  )
}

export default MenuPage