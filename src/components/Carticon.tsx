import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Carticon = () => {
  return (
    <Link href='/cart' className='flex items-center gap-4' >
        <span>
            Cart
        </span>
    </Link>
  )
}

export default Carticon