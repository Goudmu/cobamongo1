"use client"
import React, {useState, useEffect} from 'react'

type Props = {
    price: number;
    id: number;
    options?: {
        title: string;
        additionalPrice: number;
    }[];
}


const Price = ({price, id, options} : Props) => {
    const [total, setTotal] = useState(price);
    const [qty, setqty] = useState(1);
    const [selected, setselected] = useState(0);

    useEffect(() => {
        setTotal(qty * (options ? price + options[selected].additionalPrice : price ))
    }, [qty, selected, options, price])

  return (
    <div className='flex flex-col gap-4' >
        <h2 className='text-2xl font-semibold' >${total.toFixed(2)}</h2>
        {/* OPTION CONTAINER */}
        <div className='flex gap-4' >
            {options?.map((option, index) => (
                <button className=' min-w-[6rem] p-2 ring-1 ring-red-400 rounded-md' 
                style={{
                    background: selected === index ? 
                    "rgb(248 113 113)" : 
                    "white",
                    color: selected === index ? "white" : "red"
                }}
                onClick={() => setselected(index)}
                >{option.title}</button>
            ))}
        </div>
        {/* QTY AND ADD BUTTON CONTAINER */}
        <div className='flex justify-between items-center' >
            {/* QTY */}
            <div className='flex justify-between w-full p-3 ring-1 ring-red-400' >
                <span>Qty</span>
                <div className='flex flex-row gap-5 items-center' >
                    <button onClick={() => setqty(prev => prev > 1 ? prev - 1: prev )}>{'<'}</button>
                    <span>{qty}</span>
                    <button onClick={() => setqty(prev => prev + 1)}>{'>'}</button>
                </div>
            </div>
            {/* CART BUTTON */}
            <button className='uppercase w-56 bg-red-500 text-white p-3 ring-1 ring-red-400' >Add To Cart</button>
        </div>
    </div>
  )
}

export default Price