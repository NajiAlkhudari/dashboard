"use client";
import React from 'react'




const Button = ({className , disabled  ,type  , onClick  , children ,value }) => {
  return (
    <button className={`${className} bg-darkContent dark:bg-background text-white  rounded-md    w-full h-10 `}
    disabled={disabled}
    type={type}
    onClick={onClick}
    value={value}
   
    >
{children}

      </button>
     
  )
}

export default Button




