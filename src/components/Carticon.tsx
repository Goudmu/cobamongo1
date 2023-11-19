import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Carticon = () => {
  return (
    <Link href='/cart' className='flex items-center gap-4' >
        <div className='relative w-8 h-8 md:w-5 md:h-5' >
            <Image src="/cart.png" alt='' fill sizes='100%'  />
        </div>
        <span>
            Cart
        </span>
    </Link>
  )
}

export default Carticon