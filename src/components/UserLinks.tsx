"use client"

import Link from 'next/link'
import React from 'react'
import {useSession, signOut} from "next-auth/react";

const UserLinks = () => {
    const {data, status} = useSession();

  return (
    <div className='flex flex-row gap-4 '>
        {status === "authenticated"
        ? 
        <div >
          <Link href='/cart' className='items-center gap-4' >Cart</Link>
          <Link className='items-center gap-4 mx-4' href="/orders" >Orders</Link> 
          <span className='cursor-pointer' onClick={()=>signOut()}>Log out</span>
        </div>
        :
        <Link href="/login" >Login</Link>}
    </div>
  )
}

export default UserLinks