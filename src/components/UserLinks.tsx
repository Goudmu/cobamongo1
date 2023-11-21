"use client"

import Link from 'next/link'
import {useState, useEffect} from 'react'
import {useSession, signOut} from "next-auth/react";
import { User } from '@/types/type';

const UserLinks = () => {
    const session = useSession();
    const [isAdmin, setisAdmin] = useState(false);

    useEffect(() => {
      const getUser =async () => {
        await fetch("https://cobamongo1-omega.vercel.app/api/user", {
          cache:"no-store"
        }).then(res => res.json())
        .then(data => {
          data.userss.map((e:User) => {
            if(e.gmail == session.data?.user?.email){
              setisAdmin(e.isAdmin)
            }
          })
        })
      }
      getUser()
    },[])

  return (
    <div className='flex flex-row gap-4 '>
        {session.status === "authenticated"
        ? 
        <div >
          <Link href='/cart' className='items-center gap-4 md:transform md:transition md:duration-500 hover:text-[#04979e]'  >Cart</Link>
          <Link className='items-center gap-4 mx-4 md:transform md:transition md:duration-500 hover:text-[#04979e]' href="/orders" >Orders</Link> 
          <span className='cursor-pointer md:transform md:transition md:duration-500 hover:text-[#04979e]' onClick={()=>signOut()}>Log out</span>
          {isAdmin && (
            <Link className='items-center gap-4 mx-4 md:transform md:transition md:duration-500 hover:text-[#04979e]' href="/dashboard" >Dashboard</Link> 
          )}
        </div>
        :
        <Link href="/login" >Login</Link>}
    </div>
  )
}

export default UserLinks