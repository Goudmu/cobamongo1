import React from 'react'
import Menu from './Menu'
import Link from 'next/link'
import Carticon from './Carticon';
import Image from 'next/image';
import UserLinks from './UserLinks';

const Navbar = () => {
  const user = false;
  return (
    <div className=' h-12 md:h-20 text-black p-4
    flex justify-between items-center
     uppercase 
    lg:px-10 xl:px-20' >
      <div className='w-12 h-12 md:w-20 md:h-20 flex justify-start items-center flex-1  ' >
        <Image src="/logo.jpg" alt='' width={80} height={80} objectFit='cover' /> 
      </div>
      {/*LOGO*/}
      {/* <div className='text-xl md:font-bold flex-1 md:text-center' >
      <Link href="/" >
      SUTET COFFEE
      </Link>
    </div> */}
      {/* MOBILE MENU*/}
      <div className='md:hidden' >
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className='hidden md:flex gap-4 items-center text-right flex-1
      justify-end
      ' >
        <Link href="/" >HomePage</Link>
        <Link href="/menu" >Menu</Link>
        <UserLinks />
        <Link href="/aboutus" >About Us</Link>
        {/* <Carticon /> */}
      </div>
    </div>
  )
}

export default Navbar