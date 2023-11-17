"use client";

import Image from 'next/image'
import Link from 'next/link';
import React, {useState} from 'react'
import Carticon from './Carticon';

const links = [
  {id: 1, title: "Home Page", url: "/"},
  {id: 2, title: "Menu", url: "/"},
  {id: 3, title: "Working Hours", url: "/"},
  {id: 4, title: "Contact", url: "/"},
]

const Menu = () => {
  const [open, setOpen] = useState(false);

  //TEMPORARY
  const user = false
  return (
    <div>
        {
          !open 
          ?
            <Image src="/open.png" alt='' width={20} height={20} 
            onClick={() => setOpen(true)} />
          :
            <Image src="/open.png" alt='' width={20} height={20} 
            onClick={() => setOpen(false)} />
        }
        
        {open && <div className='bg-red-500 text-white absolute left-0 top-24
        w-full h-[calc(100vh-6rem)] flex flex-col items-center justify-center 
        text-xl gap-8 z-10 ' >
          {links.map(item => (
            <Link key={item.id} href={item.url} onClick={() => setOpen(false)} >
              {item.title}
            </Link>
          ))}
          {!user
          ? <Link href="/login" onClick={() => setOpen(false)}> Login
          </Link>
          : <Link href="/orders" onClick={() => setOpen(false)}> Orders
          </Link>
          }
          <Link href="/cart" onClick={() => setOpen(false)} >
            <Carticon />
          </Link>
        </div>}
    </div>
  )
}

export default Menu