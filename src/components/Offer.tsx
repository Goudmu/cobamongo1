import Image from 'next/image'
import React from 'react'
import CountDown from './CountDown'
import Link from 'next/link'

const Offer = () => {
  return (
    <div className='h-screen flex flex-col md:flex-row md:justify-between md:h-[70vh]' >
      {/* TEXT CONTAINER */}
      <div className='flex-1 flex flex-col justify-center items-center gap-8 p-6 text-[#04979e]'>
        <h1 className='text-5xl font-bold xl:text-6xl'>New Sweather</h1>
        <p className='xl:text-xl text-center'>
          Introducing our cozy and stylish Aftur Co Sweater, the perfect addition to your winter wardrobe! Crafted with the utmost care and attention to detail, 
          this sweater is designed to keep you warm while making a fashion statement.
        </p>
        <CountDown />
        <Link className='bg-[#04979e] text-white rounded-md py-3 px-6 hover:bg-white hover:text-[#04979e]' href="/product/655c2956b48402e180879152" >Order Now</Link>
        {/* <button className='bg-[#04979e] text-white rounded-md py-3 px-6 hover:bg-white hover:text-[#04979e]' >Order Now</button> */}
      </div>
      {/* IMAGE CONTAINER */}
      <div className='flex-1 w-full relative md:h-full bg-[#F1F1F1]' >
        <Image src="https://files.edgestore.dev/4rxoqm0mha5qllby/myPublicImages/_public/c8bc7e15-31de-4062-b2ed-03f12b6ceafc.jpg" alt='' fill className='object-contain' sizes='100%' />
      </div>
    </div>
  )
}

export default Offer