import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Carticon = () => {
  return (
    <Link href='/cart' className='items-center gap-4 md:transform md:transition md:duration-500 hover:text-[#04979e]' >
        <span>
            Cart
        </span>
    </Link>
  )
}

export default Carticon