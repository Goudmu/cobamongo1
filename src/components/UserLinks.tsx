"use client"

import Link from 'next/link'
import React from 'react'
import {useSession, signOut} from "next-auth/react";

const UserLinks = () => {
    const {data, status} = useSession();

  return (
    <div>
        {status === "authenticated"
        ? 
        <div>
            <Link className='cursor-pointer' href="/orders" >Orders</Link> 
            <span className='ml-1 cursor-pointer' onClick={()=>signOut()}>Log out</span>
        </div>
        :
        <Link href="/login" >Login</Link>}
    </div>
  )
}

export default UserLinks