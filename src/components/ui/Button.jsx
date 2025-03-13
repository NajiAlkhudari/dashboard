"use Client";
 import React from 'react'
 
const Button = ({className , disabled, value, type , onClick , children}) => {
   return (
<button
className={`${className} bg-darkContent dark:bg-background w-full text-white h-10 rounded-md `}
disabled={disabled}
value={value}
type={type}
onClick={onClick}
>
    {children}

</button>
   )
 }
 
 export default Button
 