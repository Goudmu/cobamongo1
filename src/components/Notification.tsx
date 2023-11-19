"use client"
import React from 'react'
import {useSession} from "next-auth/react"

const Notification = () => {
  const session = useSession()
  if(session.status === "authenticated"){
    return(
      <div>
        <div className='h-12 bg-red-500 text-white px-4 py-1 flex 
        items-center text-center text-sm 
        md:text-base cursor-pointer justify-between'
        >
          <span>Hello, {session.data.user?.name}</span>
          <span>
            50% ON SUNDAY
          </span>
        </div>
      </div>
    )
  }
  return (
    <div className='h-12 bg-red-500 text-white px-4 py-1 flex 
    items-center justify-center text-center text-sm 
    md:text-base cursor-pointer'
    >50% ON SUNDAY</div>
  )
}

export default Notification