"use client";
import React from 'react'

const Button = ({className , disable ,type  , onClick  , children ,value }) => {
  return (
    <button className={`${className} bg-gray-950 rounded-md text-white w-full h-10 `}
    disabled={disable}
    type={type}
    onClick={onClick}
    value={value}
   
    >
{children}

      </button>
     
  )
}

export default Button




