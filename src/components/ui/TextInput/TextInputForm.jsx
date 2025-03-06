"use client";
import React, { useState } from "react";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";

const TextInputForm = ({ field, form, ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div>
      <div className="relative">
        <input
          {...field}
          {...props}
          type={props.type === "password" && showPassword ? "text" : props.type}
          className={`bg-slate-100 text-gray-950 mt-1 block py-2 px-3 w-full sm:w-80 md:w-96 lg:w-128 rounded-md border-b-4 border-gray-200 focus:outline-none focus:border-sky-700 ${
            form.touched[field.name] && form.errors[field.name]
              ? "border-red-600"
              : ""
          }`}
        />
        {props.type === "password" && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3 text-sm font-medium text-gray-600 bg-transparent border-none focus:outline-none"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <MdOutlineVisibility /> : <MdOutlineVisibilityOff />}
          </button>
        )}
      </div>

 
    </div>
  );
};

export default TextInputForm;