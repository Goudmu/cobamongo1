"use client";

import { OrderType, ProductOrder } from "@/types/type";
import { useParams, useRouter } from "next/navigation";
import React, {useEffect, useState} from "react";

type thisProduct = { 
  _id: number,
  name: string,
  price: number,
  qty: number
}

const Laporan = () => {
  const [data, setData] = useState<OrderType[]>();
  const [listProduct, setListProduct] = useState<ProductOrder[]>()
  const [thisProduct, setthisProduct] = useState<thisProduct[]>()
  const [Bulan, setBulan] = useState("1")
  const [Tahun, setTahun] = useState("2020")
  const [totalPrices, setTotalPrices] = useState(0);

  const params = useParams()

  useEffect(()=> {
    LPHandler()
  },[])

  useEffect(() => {
    setBulan(params.id.toString().split("-")[1])
    setTahun(params.id.toString().split("-")[0])
    LPHandler()
  },[Bulan, Tahun])

  const LPHandler = async () => {
    let totalPrice = 0;
    let nextlistProductId:ProductOrder[] = [];
    let datas:OrderType[] = [];
    let thisdatas:thisProduct[] = [];
    
    await fetch("https://cobamongo1-omega.vercel.app/api/order", {
      cache: "no-store"
    }).then(res => res.json())
    .then((dataLP) => {
        let newOrderType:OrderType[] = dataLP.orderss;
        let newOrderType2:OrderType[] = []  ;
        newOrderType.map(e => {
            e.productsSchema.map(f => {
            if(e.status == "Done"){
                if(e.createdAt.toString().slice(0,10).split("-")[1] == Bulan && e.createdAt.toString().slice(0,10).split("-")[0] == Tahun){
                    totalPrice += f.price * f.qty
                }
                newOrderType2.push(e)
            }
            })
        })
        newOrderType2.map(e => {
            e.productsSchema.map(f => {
                if(thisdatas.length == 0) {
                    thisdatas.push({
                        _id: f._id,
                        name: f.title,
                        price: f.price,
                        qty: f.qty
                    })
                }   else {
                    let exisst = false;
                    for (let index = 0; index < thisdatas.length; index++) {
                      if(thisdatas[index]._id == f._id){
                        thisdatas[index].qty += f.qty
                        exisst = true
                      }
                    }
                    if(!exisst){
                      thisdatas.push({
                        _id: f._id,
                        name: f.title,
                        price: f.price,
                        qty: f.qty
                      })
                    }
                }
            })
        })
        if(totalPrice != 0) {
            setTotalPrices(totalPrice)
        }
        setData(newOrderType2)
        datas = dataLP
        thisdatas.sort((a,b) => b.qty - a.qty)
        setthisProduct(thisdatas)
    })
  }

  return (
    <div className="p-4 flex flex-col lg:px-20 xl:px-40">
      <div className="border border-red-700 rounded-md" >
        <table className="w-full">
          <thead className="border border-red-700 border-t-0 border-x-0" >
            <tr>
              <th>Id</th>
              <th>Product</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total Revenue</th>
            </tr>
          </thead>
          <tbody >
            {thisProduct && thisProduct.map((item: thisProduct) => {
              return(
                <tr key={item._id}>
                  <td className="py-2 px-1">{item._id}</td>
                  <td className="py-2 px-1">
                      {item.name}
                  </td>
                  <td className="py-2 px-1">
                      ${item.price}
                  </td>
                  <td className="py-2 px-1">
                      {item.qty}
                  </td>
                  <td className="py-2 px-1 text-right">
                      ${item.price * item.qty}
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