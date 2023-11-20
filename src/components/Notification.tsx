"use client"
import React from 'react'
import {useSession} from "next-auth/react"

const Notification = () => {
  const session = useSession()
  if(session.status === "authenticated"){
    return(
      <div>
        <div className='h-12 bg-[#04979e] text-white px-4 py-1 flex 
        items-center text-center text-sm 
        md:text-base cursor-pointer justify-between'
        >
          <span>Hello, {session.data.user?.name}</span>
          <span>
            The more you order, The more discount you will get
          </span>
        </div>
      </div>
    )
  }
  return (
    <div className='h-12 bg-[#04979e] text-white px-4 py-1 flex 
    items-center justify-center text-center text-sm 
    md:text-base cursor-pointer'
    >The more you order, the more discount you will get</div>
  )
}

export default Notification