"use client"

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import {useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from "next/navigation";
import { User } from "@/types/type";

let alreadyFetch = false;

const LoginPage = () => {
  const session = useSession();
  const router = useRouter();
  
  useEffect(() => {
    if(session.status === "authenticated"){
      router.push("/")
    }
  },[])
  
  useEffect(() => {
    const getData = async () => {
      await fetch("https://cobamongo1-omega.vercel.app/api/user", {
        cache: "no-store"
      }).then(res => res.json())
      .then(async (data) => {
        console.log(data)
        if(session.data != undefined){
          if(data.userss.length == 0){
            if(alreadyFetch == false){
              alreadyFetch = true;
              await fetch("https://cobamongo1-omega.vercel.app/api/user", {
                method: "POST",
                body: JSON.stringify({
                  username: session.data?.user?.name,
                  gmail: session.data?.user?.email,
                })
              })
            }
          } else {
            let exist = false
            data.userss.map((e:User) => {
              if(e.gmail == session.data.user?.email){
                exist = true
              }
            })
            if(exist == false){
              if(alreadyFetch == false){
                alreadyFetch = true;
                await fetch("https://cobamongo1-omega.vercel.app/api/user", {
                method: "POST",
                body: JSON.stringify({
                  username: session.data?.user?.name,
                  gmail: session.data?.user?.email,
                })
                })
              }
            }
          }
        }
      })
    }
    getData()
  },[session])

  return (
    <div className="p-4 h-[calc(100vh-6rem)] md:h-[calc(100vh-9rem)] flex items-center justify-center">
      {/* BOX */}
      <div className=" h-full shadow-2xl rounded-md flex flex-col md:flex-row md:h-[70%] md:w-full lg:w-[60%] 2xl:w-1/2">
        {/* IMAGE CONTAINER */}
        <div className="relative h-1/3 w-full md:h-full md:w-1/2">
          <Image src="/loginBg.png" alt="" fill className="object-cover" sizes='100%' priority={true}/>
        </div>
        {/* FORM CONTAINER */}
        <div className="p-10 flex flex-col gap-8 md:w-1/2">
          <h1 className="font-bold text-xl xl:text-3xl">Welcome</h1>
          <p>Log into your account or create a new one using social buttons</p>
          <button className="
          flex gap-4 p-4 ring-1 ring-orange-100 rounded-md"
          onClick={()=>signIn("google")}
          >
            <Image
              src="/google.png"
              alt=""
              width={20}
              height={20}
              className="object-contain"
            />
            <span>Sign in with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;