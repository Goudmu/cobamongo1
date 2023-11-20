"use client"
import React from 'react'
import Countdown from 'react-countdown'

const endingDate = new Date("2023-11-30")

const CountDown = () => {
  return (
    <Countdown className='font-bold text-5xl' date={endingDate}/>
  )
}

export default CountDown