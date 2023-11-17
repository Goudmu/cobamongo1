import React from 'react'
import Menu from './Menu'
import Link from 'next/link'
import Carticon from './Carticon';
import Image from 'next/image';
import UserLinks from './UserLinks';

const Navbar = () => {
  const user = false;
  return (
    <div className='h-12 md:h-24 text-red-500 p-4
    flex justify-between items-center
    border-b-2 border-b-red-500 uppercase 
    lg:px-20 xl:px-40' >
      {/* RIGHT LINKS */}
      <div className='hidden md:flex gap-4 flex-1' >
        <Link href="/" >HomePage</Link>
        <Link href="/menu" >Menu</Link>
        <Link href="/" >Contact</Link>
      </div>
      {/*LOGO*/}
      <div className='text-xl md:font-bold flex-1 md:text-center' >
      <Link href="/" >
          SUTET COFFEE
        </Link>
      </div>
      {/* MOBILE MENU*/}
      <div className='md:hidden' >
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className='hidden md:flex gap-4 items-center flex-1
      justify-end
      ' >
        <div className='md:absolute top-3 right-2 lg:static flex item-center gap-2 cursor-pointer bg-orange-300 px-1 rounded-md' >
          <Image src="/phone.png" alt='' width={20} height={20} />
          <span>123 456 789</span>
        </div>
        <UserLinks />
        <Carticon />
      </div>
    </div>
  )
}

export default Navbar