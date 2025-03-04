


"use client";
import { useEffect, useState } from "react";

import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    setTheme(storedTheme);
    document.documentElement.classList.toggle("dark", storedTheme === "dark");
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <button
      onClick={toggleTheme}
      className=" p-1 bg-gray-100 dark:bg-gray-900 text-black dark:text-white rounded-full"
    >
      {theme === "dark" ? <CiLight size={22} />  : <MdOutlineDarkMode size={22} />}
    </button>
  );
}
