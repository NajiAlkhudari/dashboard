"use client";
import { IoHomeOutline } from "react-icons/io5";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const paths = pathname.split("/").filter((path) => path); // تقسيم المسار وإزالة القيم الفارغة

  return (
    <nav className="text-gray-600 text-sm">
      <ul className="flex items-center space-x-2 p-4">
        <li>
          <Link href="/" className="text-blue-600 hover:underline">
          <IoHomeOutline />

          </Link>
        </li>

        {paths.map((path, index) => {
          const fullPath = `/${paths.slice(0, index + 1).join("/")}`;
          const isLast = index === paths.length - 1;

          return (
            <li key={fullPath} className="flex items-center">
              <span className="mx-2">/</span>
              {isLast ? (
                <span className="text-gray-400">{decodeURIComponent(path)}</span>
              ) : (
                <Link href={fullPath} className="text-blue-600 hover:underline">
                  {decodeURIComponent(path)}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Breadcrumbs;
