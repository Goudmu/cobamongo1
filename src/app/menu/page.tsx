import { Menu } from '@/types/type'
import Link from 'next/link'
import React, { cache } from 'react'

const getData =async () => {
  const res = await fetch("http://localhost:3000/api/categories", {
    cache : "no-store"
  })

  if(!res.ok){
    throw new Error("Failed")
  }

  return res.json()
}

const MenuPage = async () => {
  const menu:Menu = await getData()

  return (
    <div className='p-4 lg:px-20 xl:px-40 h-[calc(100vh-6rem)] 
    md-[calc(100vh-9rem)] flex flex-col md:flex-row'>
      {menu.map(category => (
        <Link key={category.id} href={`/menu/${category.slug}`} 
        className='w-full h-1/3 bg-cover p-8 md:h-1/2' 
        style={{backgroundImage:`url(${category.img})`}}
        >
          {/* TEXT CONTAINER */}
          <div className={`text-${category.color} w-1/2`} >
            <h1 className='uppercase font-bold text-3xl' >{category.title}</h1>
            <p className='text-sm my-6' >{category.desc}</p>
            <button className={`hidden 2xl:block bg-black text-${category.color === "black" ? "white" : "red-500"} py-2 px-4 rounded-md `}>Explore</button>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default MenuPage