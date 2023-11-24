import Image from "next/image"
import Link from "next/link"

const CartIconFloat = () => {

    return (
        <Link href='/cart' >
            <Image src="/cart2.png" alt='' width={60} height={60} 
                className='rounded-full fixed bottom-6 right-4 z-10 transform transition hover:cursor-pointer hover:scale-125 duration-500' 
            />
            {/* <span className="text-[#04979e] font-semibold fixed bottom-6 right-7 z-20" >{totalItems}</span> */}
        </Link>
    )
}

export default CartIconFloat