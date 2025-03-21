"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { BsFillBuildingsFill } from "react-icons/bs";
import { FaRegUserCircle, FaRegUser } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineAlignCenter, AiOutlineProduct } from "react-icons/ai";
import NavMenu from "@/components/partials/sidebar/NavMenu";
import SubMenu from "@/components/partials/sidebar/Submenu";
import Sidebar from "@/components/partials/sidebar/Sidebar";
import { detail } from "@/store/meSlice";
import { Permissions, useHasPermission } from "@/utils/Permissions";
import { FaUserSecret } from "react-icons/fa";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import ThemeSwitcher from "../ThemeSwitcher";
import Avatar from "../ui/Avatar";
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie";
import { SiOpenvpn } from "react-icons/si";
import { MdSubscriptions } from "react-icons/md";




const Header = ({ isSidebarOpen, onSidebarToggle }) => {
  const hasPermission = useHasPermission(Permissions.IsAdmin);
  const viewCompanies = useHasPermission(Permissions.CanReadCompany);
  const viewClient = useHasPermission(Permissions.CanReadClient);
const viewAgent= useHasPermission(Permissions.CanReadAgent)
const viewSubsciption= useHasPermission(Permissions.CanReadSupscription)


  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();

  const { name, success } = useSelector((state) => state.me);

  const handleSidebarItemClick = (path) => {
    if (path) {
      router.push(path);
    
      onSidebarToggle(false);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const navigateToLogin = () => {
    Cookies.remove('token');
    router.push("/");  
  };

  useEffect(() => {
    if (!name) {
      dispatch(detail());
    }
  }, [dispatch, name]);

  return (
    <header className="sticky top-0 z-50 bg-gray-50 px-4 py-4 dark:bg-darkContent">
      <div className="container mx-auto flex justify-between items-center px-2">
        <button
          onClick={() => onSidebarToggle(true)}
          className="p-2 text-2xl text-gray-800 dark:text-gray-50 rounded-full hover:bg-gray-600"
        >
          <AiOutlineAlignCenter />
        </button>

        <div className="flex space-x-14 left-1/2 transform -translate-x-1/2 text-3xl font-bold text-gray-800 dark:text-gray-50">
        <SiOpenvpn />
         Dashboard
        </div>
      
      
        <nav className="hidden sm:flex items-center space-x-4 text-sm sm:text-base lg:text-lg ">
        <div>
            <ThemeSwitcher />
          </div>
          <div className="border-l border-gray-600 h-6"></div>
        
          <div className="flex space-x-2">
          
            {success ? (
              <div className="relative">
           

                <button
                  className="text-gray-800 dark:text-gray-50 flex items-center"
                  onClick={toggleDropdown}
                >
                <div className="flex items-center">
                <div>
                <Avatar size="medium" color="blue" icon={<FaUserCircle size={25} />} />
                </div>
                <div>
                {name} 
                </div>
                  </div>
                </button>
                {isDropdownOpen && (
                  <div className="absolute bg-white shadow-lg rounded-md mt-5 w-32 z-10">
                    <button
                      className="block w-full text-center dark:bg-darkContent dark:text-white text-gray-950 px-4 py-2 text-sm"
                      onClick={navigateToLogin}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <button className="text-gray-800 flex items-center" onClick={toggleDropdown}>
                  Account
                </button>
                {isDropdownOpen && (
                  <div className="absolute bg-white shadow-lg rounded-md mt-2 w-32 z-10">
                    <button
                      className="block w-full text-center text-gray-950 px-4 py-2 text-sm"
                      onClick={navigateToLogin}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="border-l border-gray-600 h-6"></div>
        </nav>
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
          {viewCompanies && (
   <SubMenu
   label="Companies"
   icon={BsFillBuildingsFill}
   onClick={() => handleSidebarItemClick("/dashboard/manage-companies")} 
 />
          )}
          {viewClient &&(
          <SubMenu
          label="Clients"
          icon={FaUserSecret}
          onClick={() => handleSidebarItemClick("/dashboard/manage-client")} 
        />
          )}

{viewAgent && (
    <SubMenu
    label="Agents"
    icon={MdOutlineRealEstateAgent}
    onClick={() => handleSidebarItemClick("/dashboard/manage-agent")} 
  />
)}

      {viewSubsciption && (
    <SubMenu
    label="Subsciption"
    icon={MdSubscriptions}
    onClick={() => handleSidebarItemClick("/dashboard/manage-subsciption")} 
  />
)}  
        </NavMenu>
      </Sidebar>
    </header>
  );
};

export default Header;
