"use client"
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

type Props = {
    children: React.ReactNode;
  };

const AuthLoading = ({children} : Props) => {
    const [isLoad, setIsLoad] = useState(false);
  const session = useSession();

  useEffect(() => {
    if(session.status === "loading"){
        setIsLoad(false)
    } else {
        setIsLoad(true)
    } 
  },[session])

  if(isLoad == false){
    return (
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
      <div>{children}</div>
    )
  }
}

export default AuthLoading