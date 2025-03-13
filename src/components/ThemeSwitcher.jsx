"use client";
import { useEffect, useState } from "react";
import { MdOutlineDarkMode } from "react-icons/md";
import { CiLight } from "react-icons/ci";

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState(null);


  const toggleTheme = () => {
    if (!theme) return;
    
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "dark";
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme = storedTheme || (prefersDark ? "dark" : "light");
    setTheme(initialTheme);
    document.documentElement.classList.toggle("dark", initialTheme === "dark");
  }, []);
  if (theme === null) return null;

  return (
    <button
      onClick={toggleTheme}
      className="p-1 bg-background dark:bg-background  text-black dark:text-white rounded-full"
    >
      {theme === "dark" ? <CiLight size={22} /> : <MdOutlineDarkMode size={22} />}
    </button>
  );
}
