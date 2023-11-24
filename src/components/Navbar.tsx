import React from 'react'
import Menu from './Menu'
import Link from 'next/link'
import Image from 'next/image';
import UserLinks from './UserLinks';

const Navbar = () => {
  const user = false;
  return (
    <div className=' h-12 md:h-20 text-black p-4
    flex justify-between items-center
     uppercase 
    lg:px-10 xl:px-20' >
      <div className=' h-12 md:w-20 md:h-20 flex justify-start items-center w-1/3  ' >
        <Link href="/" >
          <Image src="/logo.jpg" alt='' width={80} height={80}
            style={{
              width: 70,
              height: 45
            }} 
            /> 
        </Link>
      </div>
      {/* MOBILE MENU*/}
      <div className='md:hidden' >
        <Menu />
      </div>
      {/* RIGHT LINKS */}
      <div className='hidden md:flex gap-4 items-center text-right w-2/3
      justify-end
      ' >
        <Link href="/" className='md:transform md:transition md:duration-500 hover:text-[#04979e]' >HomePage</Link>
        <Link href="/menu" className='md:transform md:transition md:duration-500 hover:text-[#04979e]' >Menu</Link>
        <UserLinks />
        <Link href="/aboutus" className='md:transform md:transition md:duration-500 hover:text-[#04979e]' >About Us</Link>
        {/* <Carticon /> */}
      </div>
    </div>
  )
}

export default Navbar