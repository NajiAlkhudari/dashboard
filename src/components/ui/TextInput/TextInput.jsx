"use client";
import React, { useState } from 'react';
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";


const TextInput = ({
  className,
  label,
  name,
  value,
  onChange,
  placeholder,
  type,
  error,
  msgTooltip
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div>
      <div className="relative">
        <input
          className={`border border-gray-500 focus:border-sky-900 ${
            error ? "has-error border border-red-600" : ""
          } px-2 py-2 w-full sm:w-96 md:w-96 lg:w-128 rounded-md ${className}`}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          type={inputType} 
          name={name}
        />
        {type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-medium text-gray-600 bg-transparent border-none focus:outline-none"
            onClick={() => setShowPassword((prev) => !prev)}          >
            {showPassword ?<MdOutlineVisibility />
 : <MdOutlineVisibilityOff />
            } 
          </button>
        )}
      </div>

      {error && (
        <div
          className={`mt-2 ${
            msgTooltip
              ? "inline-block bg-danger-500 text-white text-[10px] px-2 py-1 rounded"
              : "text-red-700 block text-sm"
          }`}
        >
          {error.message}
        </div>
      )}
    </div>
  );
};

export default TextInput;