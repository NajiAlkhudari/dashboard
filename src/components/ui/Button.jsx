"use client";
import React from 'react'

const Button = ({className , disable ,type  , onClick  , children ,value }) => {
  return (
    <button className={`${className} bg-gray-950 text-white  rounded-md  dark:bg-gray-50 dark:text-gray-800  w-full h-10 `}
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




