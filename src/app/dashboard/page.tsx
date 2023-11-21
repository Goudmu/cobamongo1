"use client"
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, {useState, useEffect} from 'react'




const Dashboard = () => {
  const [JenisLaporanA, setJenisLaporanA] = useState("laporanPenjualan")
  const [Bulan, setBulan] = useState("1")
  const [Tahun, setTahun] = useState("2020")
  const [JLisSelected, setJLisSelected] = useState([
  {
    name: "laporanPenjualan",
    desc: "Laporan Penjualan",
    selected: false
  }, {
    name: "laporanProdukTerlaris",
    desc: "Laporan Produk Terlaris",
    selected: false
  }, {
    name: "laporanCatTerlaris",
    desc: "Laporan Kategori Terlaris",
    selected: false
  },{
    name: "laporanPembeli",
    desc: "Laporan Pembeli",
    selected: false
  },{
    name: "laporanProduk",
    desc: "Laporan Produk",
    selected: false
  },
  ]);
  const [bulanisSelected, setBulanisSelected] = useState([
  {
    name: "Jan",
    nameId: "1",
    selected: false
  }, {
    name: "Feb",
    nameId: "2",
    selected: false
  },
  {
    name: "Mar",
    nameId: "3",
    selected: false
  }, {
    name: "Apr",
    nameId: "4",
    selected: false
  },
  {
    name: "May",
    nameId: "5",
    selected: false
  }, {
    name: "Jun",
    nameId: "6",
    selected: false
  },
  {
    name: "Jul",
    nameId: "7",
    selected: false
  }, {
    name: "Aug",
    nameId: "8",
    selected: false
  },
  {
    name: "Sep",
    nameId: "9",
    selected: false
  }, 
  {
    name: "Oct",
    nameId: "10",
    selected: false
  },
  {
    name: "Nov",
    nameId: "11",
    selected: false
  }, {
    name: "Des",
    nameId: "12",
    selected: false
  },
  ]);
  const [tahunisSelected, setTahunisSelected] = useState([
  {
    name: "2020",
    selected: false
  }, {
    name: "2021",
    selected: false
  },
  {
    name: "2022",
    selected: false
  }, {
    name: "2023",
    selected: false
  },
  ]);
  const [showBulanTahun, setShowBulanTahun] = useState(true);

  const session = useSession()
  const router = useRouter()

  useEffect(() => {
    if(session.status === "unauthenticated"){
      router.push('/')
    }
  },[])
  if(session.status === "authenticated"){
    const JLHandler = (nama:string) => {
        let nextJSisSelected = JLisSelected.map(e => {
            if(e.name == nama){
          e.selected = true
          return e
        } else {
          e.selected = false
          return e
        }
      })
      if(nama == "laporanProduk"){
        setShowBulanTahun(false)
      } else{
        setShowBulanTahun(true)
      }
      setJenisLaporanA(nama)
      setJLisSelected(nextJSisSelected)
    }
    const bulanHandler = (nama:string) => {
      const nextbulanIsSelected = bulanisSelected.map(e => {
        if(e.name == nama){
          e.selected = true
          setBulan(e.nameId)
          return e
        } else {
          e.selected = false
          return e
        }
      })
      setBulanisSelected(nextbulanIsSelected)
    }
    const tahunHandler = (nama:string) => {
      const nexttahunIsSelected = tahunisSelected.map(e => {
        if(e.name == nama){
          e.selected = true
          return e
        } else {
          e.selected = false
          return e
        }
      })
      setTahun(nama)
      setTahunisSelected(nexttahunIsSelected)
    }
  
    const buttonHandler = () => {
      if(JenisLaporanA == "laporanPenjualan"){
        router.push(`/dashboard/laporanPenjualan/${Tahun}-${Bulan}`)
      } else if(JenisLaporanA == "laporanProdukTerlaris"){
        router.push(`/dashboard/laporanProdukTerlaris/${Tahun}-${Bulan}`)
      } else if(JenisLaporanA == "laporanProduk"){
        router.push(`/dashboard/laporanProduk`)
      } else if(JenisLaporanA == "laporanPembeli"){
        router.push(`/dashboard/laporanPembeli/${Tahun}-${Bulan}`)
      }
    }
    return (
      <div className='px-2 py-2 md:px-40 md:py-4 bg-[#F1F1F1] md:min-h-[calc(100vh-15rem)]' >
        <h1 className='text-4xl text-center mb-5 font-sm' >Pilih Laporan</h1>
        <div className='flex flex-col md:flex-row rounded-md p-2 gap-14 ' >
          <div className='w-full'>
            <h2 className=' font-bold text-2xl' >Jenis Laporan</h2>
            <div className="flex flex-col gap-3 mt-4">
                {JLisSelected.map((e,index) => (
                    <label className="cursor-pointer" onClick={() => JLHandler(e.name)} key={e.name} >
                        <input type="radio" className="peer sr-only" name="pricing" />
                        <div className={`w-full rounded-md bg-[#F1F1F1] p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${JLisSelected[index].selected == true ? " text-cyan-500 ring-gray-600 ring-offset-2" : ""} `}>
                        <div className="flex flex-col gap-1">
                            <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase text-gray-500">{e.desc}</p>
                            <div>
                                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                            </div>
                            </div>
                        </div>
                        </div>
                    </label>
                ))}
            </div>
          </div>
          {showBulanTahun ? (
            <div className='w-full'>
              <h2 className=' font-bold text-2xl' >Pilih Bulan</h2>
              <div className="grid grid-cols-2 gap-3 mt-4">
                {bulanisSelected.map((e, index) => (
                    <label className="cursor-pointer" onClick={() => bulanHandler(e.name)} key={index} >
                    <input type="radio" className="peer sr-only" name="pricing" />
                    <div className={`w-full rounded-md bg-[#F1F1F1] p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${bulanisSelected[index].selected == true ? "text-cyan-500 ring-gray-600 ring-offset-2" : ""}`}>
                        <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase text-gray-500">{e.name}</p>
                            <div>
                            <svg width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                            </div>
                        </div>
                        </div>
                    </div>
                    </label>
                ))}
              </div>
            </div>
          ): <div className='w-full'></div> }
          {showBulanTahun ? (
            <div className='w-full'>
              <h2 className=' font-bold text-2xl'>Tahun</h2>
              <div className="flex flex-col gap-3 mt-4">
                {tahunisSelected.map((e,index) => (
                    <label className="cursor-pointer" onClick={() => tahunHandler(e.name)} key={index} >
                    <input type="radio" className="peer sr-only" name="pricing" />
                    <div className={`w-full rounded-md bg-[#F1F1F1] p-1 text-gray-600 ring-2 ring-transparent transition-all hover:shadow ${tahunisSelected[index].selected == true ? "text-cyan-500 ring-gray-600 ring-offset-2" : ""} `}>
                        <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                            <p className="text-xs font-semibold uppercase text-gray-500">{e.name}</p>
                            <div>
                            <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                            </div>
                        </div>
                        </div>
                    </div>
                    </label>
                ))}
              </div>
            </div>
          ): <div className='w-full'></div> }
        </div>
        <div className='w-full text-right pt-8'>
          <button className='bg-cyan-300 rounded-md py-2 px-4 ring-gray-600 ring-offset-2 hover:bg-cyan-500 transform translate duration-500' type='button' onClick={buttonHandler} >Terapkan</button>
        </div>
      </div>
    )
  } else{
    return(
      <div>You are not admin</div>
    )
  }
}

export default Dashboard