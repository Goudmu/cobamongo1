"use client";

import Image from 'next/image'
import Link from 'next/link';
import React, {useEffect, useState} from 'react'
import Carticon from './Carticon';
import {useSession, signOut} from "next-auth/react"

const links = [
  {id: 1, title: "Home Page", url: "/"},
  {id: 2, title: "Menu", url: "/menu"},
]

const Menu = () => {
  const [open, setOpen] = useState(false);
  const [user, setuser] = useState(false);
  const session = useSession()

  useEffect(() => {
    if(session.status !== "unauthenticated"){
      setuser(true)
    }
  },[session])
  //TEMPORARY
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
        
        {open && <div className='bg-[#04979e] text-white absolute left-0 top-24
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
          : 
          <div className='flex flex-col gap-8 items-center text-center justify-center' >
            <Link href="/orders" onClick={() => setOpen(false)}> Orders
            </Link>
            <button type='button' onClick={() => signOut()} >LOG OUT</button>
          </div> 
          }
          <Link href="/aboutUs" onClick={() => setOpen(false)} >
            About Us
          </Link>
        </div>}
    </div>
  )
}

export default Menu