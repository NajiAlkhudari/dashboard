

"use client";
import { useRouter } from "next/navigation";
 import { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";
import { AiOutlineAlignCenter } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import NavMenu from "@/components/partials/sidebar/NavMenu";
import SubMenu from "@/components/partials/sidebar/Submenu";
import Sidebar from "@/components/partials/sidebar/Sidebar";
import { AiOutlineProduct } from "react-icons/ai";
import { detail } from "@/store/meSlice";
import { FaRegUser } from "react-icons/fa";

import { Permissions, useHasPermission } from "@/app/utils/Permissions";

const Header = ({ isSidebarOpen, onSidebarToggle }) => {
  const hasPermission = useHasPermission(Permissions.IsAdmin);
  const router = useRouter();
  const dispatch = useDispatch();

  const { name } = useSelector((state) => state.me);

  const handleSidebarItemClick = (path) => {
    if (path) {
      router.push(path);
      onSidebarToggle(false); 
    }
  };

  useEffect(() => {
    if (!name) {
      dispatch(detail());
    }
  }, [dispatch, name]);

  return (
    <header className="sticky top-0 z-50 bg-white px-4 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <button
          onClick={() => onSidebarToggle(true)}
          className="p-2 text-2xl text-gray-950 rounded-full hover:bg-gray-600"
        >
          <AiOutlineAlignCenter />
        </button>

        <div className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold text-gray-800">
          Dashboard
        </div>

        <div>
          <p className="hidden md:block text-gray-950 text-xl font-semibold font-sans">
            Welcome {name}
          </p>
        </div>
      </div>

      <Sidebar isOpen={isSidebarOpen} onClose={() => onSidebarToggle(false)}>
        <p className="text-center p-4 text-2xl font-bold">TU-VPN</p>
        <NavMenu title="Menu">
          {hasPermission && (
            <SubMenu
              label="Users"
              icon={FaRegUser}
              onClick={() => handleSidebarItemClick("/dashboard/manage-user")}
            />
          )}
          <SubMenu
            label="Agents"
            icon={AiOutlineProduct}
            subItems={[
              { label: "Add New agents", path: "/dashboard" },
            ]}
            onClick={handleSidebarItemClick}
          />
          <SubMenu
            label="Reports"
            icon={TbReportAnalytics}
            subItems={[
              { label: "Subscriptions", path: "/dashboard" },
              { label: "Agents", path: "/dashboard" },
            ]}
            onClick={handleSidebarItemClick}
          />
        </NavMenu>
      </Sidebar>
    </header>
  );
};

export default Header;