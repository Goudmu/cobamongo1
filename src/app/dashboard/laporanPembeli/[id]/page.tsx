"use client";

import { OrderType, User } from "@/types/type";
import { useParams } from "next/navigation";
import React, {useEffect, useState} from "react";

type thisUser = { 
    _id: number,
    gmail: string,
    username: string,
    total: number,
    qty: number
  }

const Laporan = () => {
  const [thisUser, setthisUser] = useState<thisUser[]>()
  const [Bulan, setBulan] = useState("1")
  const [Tahun, setTahun] = useState("2020")
  const [totalPrices, setTotalPrices] = useState(0);

  const params = useParams()

  useEffect(() => {
    setBulan(params.id.toString().split("-")[1])
    setTahun(params.id.toString().split("-")[0])
    LPHandler()
  },[Bulan, Tahun])

  const LPHandler = async () => {
    let totalPrice = 0;
    let thisUsers:thisUser[] = []

    await fetch("https://cobamongo1-omega.vercel.app/api/user", {
      cache: "no-store"
    }).then(res => res.json())
    .then(data => {
        data.userss.map((e:User) => {
            thisUsers.push({
                _id: e._id,
                gmail: e.gmail,
                username: e.username,
                total: 0,
                qty: 0
            })
        })
    })
    
    await fetch("https://cobamongo1-omega.vercel.app/api/order", {
      cache: "no-store"
    }).then(res => res.json())
    .then((dataLP) => {
        let newOrderType:OrderType[] = dataLP.orderss;
        newOrderType.map(e => {
            e.productsSchema.map(f => {
            if(e.status == "Done"){
                if(e.createdAt.toString().slice(0,10).split("-")[1] == Bulan && e.createdAt.toString().slice(0,10).split("-")[0] == Tahun){
                    totalPrice += f.price * f.qty
                    for (let index = 0; index < thisUsers.length; index++) {
                        if(thisUsers[index].gmail == e.gmail){
                            console.log(f.qty)
                            thisUsers[index].qty += f.qty
                            thisUsers[index].total += f.qty * f.price
                        }
                    }
                }
            }
            })
        })
        console.log(thisUsers)
        if(totalPrice != 0) {
            setTotalPrices(totalPrice)
            thisUsers.sort((a,b) => b.qty - a.qty)
            setthisUser(thisUsers)
        }
    })
  }

  return (
    <div className="p-4 flex flex-col lg:px-20 xl:px-40">
      <div className="border border-red-700 rounded-md" >
        <table className="w-full">
          <thead className="border border-red-700 border-t-0 border-x-0" >
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Name</th>
              <th>Qty</th>
              <th>Total Revenue</th>
            </tr>
          </thead>
          <tbody >
            {thisUser && thisUser.map((item: thisUser) => {
              return(
                <tr key={item._id}>
                    <td className="py-2 px-1">{item._id}</td>
                    <td className="py-2 px-1">
                        {item.gmail}
                    </td>
                    <td className="py-2 px-1">
                        {item.username}
                    </td>
                    <td className="py-2 px-1">
                        {item.qty}
                    </td>
                    <td className="py-2 px-1 text-right">
                        ${item.total}
                    </td>
              </tr>
              )
            })}
          </tbody>
        </table>
        <div className="w-full flex border border-red-700 border-b-0 border-x-0 p-1 " >
          <div className="flex-1" >Total Revenue</div>
          <div className="flex-3">${totalPrices}</div>
        </div>
      </div>
    </div>
  );
};

export default Laporan;