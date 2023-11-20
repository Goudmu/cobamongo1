import Image from "next/image"

const PaymentTypes = () => {
  return (
    <div className="flex flex-col gap-4 items-center py-8">
        <h2 className=" text-2xl font-semibold " >Payment Methods</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 items-center text-center justify-center content-center object-center gap-6 md:gap-2 pt-4 w-full px-8" >
            <div className="flex justify-center items-center" >
                <Image src='/ovo.png' alt="" width={40} height={40} />
            </div>
            <div className="flex justify-center items-center" >
                <Image src='/dana.png' alt="" width={100} height={40} />
            </div>
            <div className="flex justify-center items-center" >
                <Image src='/spay.png' alt="" width={100} height={40} />
            </div>
            <div className="flex justify-center items-center" >
                <Image src='/visa.png' alt="" width={100} height={40} />
            </div>
        </div>
    </div>
  )
}

export default PaymentTypes