"use client"
import { User } from '@/types/type';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

type typeThisOrder = {
  createdAt: Date;
  _id: number;
  cat: String;
  gmail: string;
  status: string;
  totalPrice: number;
  totalQty: number;
  productsSchema:[{
    _id: number;
    title: string;
    desc?: string;
    img?: string;
    price: number;
    qty: number;
  }]
}

const Orders = () => {
  const[orders, setOrders] = useState<typeThisOrder[]>([])
  const [isAdmin, setisAdmin] = useState(false);
  const [statusOrder, setstatusOrder] = useState(false);
  const session = useSession()

  useEffect(() => {
    const getData = async () => {
      await fetch("https://cobamongo1-omega.vercel.app/api/order", {
        cache:"no-store"
      }).then(res => res.json())
      .then(data => {
        setOrders(data.orderss)
      })
    }
    const getUser =async () => {
      await fetch("https://cobamongo1-omega.vercel.app/api/user", {
        cache:"no-store"
      }).then(res => res.json())
      .then(data => {
        data.userss.map((e:User) => {
          if(e.gmail == session.data?.user?.email){
            setisAdmin(e.isAdmin)
          }
        })
      })
    }
    getUser()
    getData()
  },[session, statusOrder])

  const handleUpdate = async (e : React.FormEvent<HTMLSelectElement>, id:number ) => {
    e.preventDefault();
    const form = e.target as HTMLSelectElement;
    const status = form.value
    await fetch("https://cobamongo1-omega.vercel.app/api/order", {
        method: "PUT",
        body: JSON.stringify({
          id:id,
          status:status
        })
      }).then(() => setstatusOrder(!statusOrder))
  }
  
  
  if(isAdmin){
    return(
      <div className="p-5 h-screen bg-gray-100" >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {
              orders && orders.map((item: typeThisOrder) => (
                <div className="bg-white space-y-3 p-4 rounded-md shadow" key={item._id}>
                  <div className="flex items-center space-x-2 text-sm" >
                    <div className="text-blue-500 font-bold">{item._id}</div>
                    <div className="text-gray-500" >{item.createdAt.toString().slice(0,10)}</div>
                    <div className={`p-2 text-xs font-medium uppercase 
                    ${item.status == "Done" ? "tracking-widertext-green-800 bg bg-green-200":
                    item.status == "On Going..." ? "tracking-widertext-yellow-800 bg bg-yellow-200"
                    : "tracking-widertext-red-800 bg bg-red-200"
                    } rounded-lg bg-opacity-30`}>{item.status}</div>
                    <div className="flex flex-row">
                      <select name="changeStatus" id="changeStatus" onChange={e => 
                      {
                        handleUpdate(e, item._id)
                        }} >
                        <option value="" hidden>Select New Status</option>
                        <option value="Done">Done</option>
                        <option value="On Going...">On Going...</option>
                        <option value="Cancel">Cancel</option>
                      </select>
                    </div>
                  </div>
                  <span>{item.gmail}</span>
                  {
                    item.productsSchema.map((e, index) => {
                      if(item.productsSchema.length == 1){
                        return(
                          <div className="text-sm text-gray-700" key={e._id} >{e.title}</div>
                        )
                      } else {
                        let name = "";
                        for (let indexs = 0; indexs < item.productsSchema.length; indexs++) {
                          if(indexs == item.productsSchema.length - 1){
                            name += item.productsSchema[indexs].title
                          } else{
                            name += item.productsSchema[indexs].title + ", "
                          }
                        }
                        if (index == item.productsSchema.length - 1) {
                          return(
                            <div className="text-sm text-gray-700" key={e._id} >{name}</div>
                          )
                        }
                      }
                    })
                  }
                  <div className="text-sm font-medium text-black" >Total Price : ${item.totalPrice}</div>
                </div>
              ))
            }
          </div>
        </div>
    )
  } else{
    return (
      <div className="p-5 h-screen bg-gray-100" >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        {
            orders.map((item: typeThisOrder) => {
              if(item.gmail == session.data?.user?.email){
                return(
                  <div className="bg-white space-y-3 p-4 rounded-md shadow" key={item._id}>
                    <div className="flex items-center space-x-2 text-sm" >
                      <div className="text-blue-500 font-bold">{item._id}</div>
                      <div className="text-gray-500" >{item.createdAt.toString().slice(0,10)}</div>
                      <div className={`p-2 text-xs font-medium uppercase 
                      ${item.status == "Done" ? "tracking-widertext-green-800 bg bg-green-200":
                      item.status == "On Going..." ? "tracking-widertext-yellow-800 bg bg-yellow-200"
                      : "tracking-widertext-red-800 bg bg-red-200"
                      } rounded-lg bg-opacity-30`}>{item.status}</div>
                    </div>
                    <span>{item.gmail}</span>
                    {
                      item.productsSchema.map((e, index) => {
                        if(item.productsSchema.length == 1){
                          return(
                            <div className="text-sm text-gray-700" key={e._id} >{e.title}</div>
                          )
                        } else {
                          let name = "";
                          for (let indexs = 0; indexs < item.productsSchema.length; indexs++) {
                            if(indexs == item.productsSchema.length - 1){
                              name += item.productsSchema[indexs].title
                            } else{
                              name += item.productsSchema[indexs].title + ", "
                            }
                          }
                          if (index == item.productsSchema.length - 1) {
                            return(
                              <div className="text-sm text-gray-700" key={e._id} >{name}</div>
                            )
                          }
                        }
                      })
                    }
                    <div className="text-sm font-medium text-black" >Total Price : ${item.totalPrice}</div>
                  </div>
                )
              }}
            )
          }
        </div>
      </div>
  )}
}
export default Orders

