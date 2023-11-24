import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='p-4 lg:px-12 xl:px-20 text-[#04979e]
    flex md:items-center justify-between' >
      <Link href="/" className='font-bold text-xl' >Aftur Co</Link>
      <div className='text-left md:text-right' >
        {/* <p>Jl. Perdata 2 Blok B6 No.12 Komplek Pengayoman, Tangerang</p> */}
        <div>
          <a href="https://www.google.com/maps/place/Jl.+Perdata+2+Blok+B6+No.12,+RT.002%2FRW.008,+Sukasari,+Kec.+Tangerang,+Kota+Tangerang,+Banten+15118/@-6.184602,106.6377236,18z/data=!3m1!4b1!4m10!1m2!2m1!1sJl.+Perdata+2+Blok+B6+No.12+Komplek+Pengayoman,+Tangerang!3m6!1s0x2e69f9285debdcad:0x9919defd43c973cc!8m2!3d-6.1846039!4d106.6394457!15sCjlKbC4gUGVyZGF0YSAyIEJsb2sgQjYgTm8uMTIgS29tcGxlayBQZW5nYXlvbWFuLCBUYW5nZXJhbmeSARBnZW9jb2RlZF9hZGRyZXNz4AEA!16s%2Fg%2F11c2fhlh2p?entry=ttu" target='_blank'>
            Jl. Perdata 2 Blok B6 No.12 Komplek Pengayoman, Tangerang
          </a>
        </div>
        <a href="https://wa.me/6285155253452" target='_blank'>085155253452</a>
        <p>aftur.company@gmail.com</p>
      </div>
    </div>
  )
}

export default Footer