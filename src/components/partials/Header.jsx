'use client';
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { useSelector , useDispatch } from 'react-redux';
import { AiOutlineAlignCenter } from "react-icons/ai";
import { TbReportAnalytics } from "react-icons/tb";
import NavMenu from "@/components/partials/sidebar/NavMenu ";
import SubMenu from "@/components/partials/sidebar/Submenu";
import Sidebar from "@/components/partials/sidebar/Sidebar";
import { AiOutlineProduct } from "react-icons/ai";
import { detail } from "@/store/meSlice";




const Header = () => {

  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoginOpen, setLoginOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);

  const { name } = useSelector((state) => state.me);



  const handleSidebarItemClick = (path) => {
    if (path) {
      router.push(path);   
      setSidebarOpen(false); 
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
        onClick={() => setSidebarOpen(true)}
        className="p-2 text-2xl text-gray-950 rounded-full hover:bg-gray-600"
      >
        <AiOutlineAlignCenter />
      </button>
  
      <div className="absolute left-1/2 transform -translate-x-1/2 text-3xl font-bold text-gray-800">
      Dashboard
      </div>

      <div>
      <p className="hidden md:block text-gray-950 text-xl font-semibold font-sans">Welcome {name}</p>
      </div>
    </div>
  
    <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)}>
      <p className="text-center p-4 text-2xl font-bold">TU-VPN</p>
      <NavMenu title="Menu">
        <SubMenu
          label="Products"
          icon={AiOutlineProduct}
          subItems={[
            { label: "All Product", path: "/" },
            { label: "Add New Product", path: "/" },
            { label: "Product Appear", path: "/" }
          ]}
          onClick={handleSidebarItemClick}
        />
        <SubMenu
          label="Reports"
          icon={TbReportAnalytics}
          subItems={[
            { label: "Sales", path: "/dashboard" },
            { label: "Purchases", path: "/dashboard" }
          ]}
          onClick={handleSidebarItemClick}
        />
      </NavMenu>
    </Sidebar>
  </header>
  
  );
};

export default Header;
