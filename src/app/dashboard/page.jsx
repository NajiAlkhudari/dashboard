"use client";
import { useRouter } from "next/navigation";  
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import { Permissions , useHasPermission } from '@/utils/Permissions';
import { FaUsers } from "react-icons/fa6";
import { BsFillBuildingsFill } from "react-icons/bs";
import { MdOutlineRealEstateAgent } from "react-icons/md";
import { MdSubscriptions } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa";


const Page = () => {
    const hasPermission = useHasPermission(Permissions.IsAdmin);
    const viewCompanies = useHasPermission(Permissions.CanReadCompany);
    const viewClient = useHasPermission(Permissions.CanReadClient);
    const viewAgent = useHasPermission(Permissions.CanReadAgent);


  const router = useRouter(); 

  const handleNavigate = (path) => {
    router.push(path);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-2">
 {hasPermission &&    (
            <Card
            title="Users Management"
            className=" space-y-2 border border-1 bg-green-100 border-dashed  border-black p-6"
          >
          <div className="flex text-center justify-center text-green-300">
          <FaUsers size={70}  />

          </div>
            <Button
              className=""
              onClick={() => handleNavigate("/dashboard/manage-user")} 
            >
              View
            </Button>
            <p className="text-gray-700 text-center">
              Manage users, assign roles, and modify permissions easily.
            </p>
          </Card>
 )
}

{viewAgent &&(
  <Card
  title="Agents Management"
  className="  border border-1 bg-purple-100 border-dashed  border-black p-6"
  > 
    <div className="flex text-center justify-center text-purple-300">
    <MdOutlineRealEstateAgent size={70} />

    </div>
  <Button onClick={() => handleNavigate("/dashboard/manage-agent")}>
    View
  </Button>
  <p className="text-gray-700 text-center">
    Manage agents, edit details, and control business account settings.
  </p>
</Card>
)}
    

      {viewCompanies && (
    <Card
    title="Companies Management"
    className="  border border-1 bg-red-100 border-dashed  border-black p-6"
    > 
    <div className="flex justify-center text-center text-red-300">
    <BsFillBuildingsFill size={70} />

    </div>
    <Button onClick={() => handleNavigate("/dashboard/manage-companies")}>
      View
    </Button>
    <p className="text-gray-700 text-center">
      Manage companies, edit details, and control business account settings.
    </p>
  </Card>
      )}
  
      <Card
        title="Supscriptions Management"
        className="  border border-1 bg-orange-100 border-dashed  border-black p-6"
        > 
                  <div className="flex text-center justify-center text-orange-300">
                    <MdSubscriptions size={70} />
</div>
<Button onClick={() => handleNavigate("/dashboard")}>
View
        </Button>

        <p className="text-gray-700 text-center">
          Manage supscriptions, edit details, and control business account settings.
        </p>
      </Card>

      {viewClient &&(
 <Card
 title="Clients Management"
 className="  border border-1 bg-yellow-100 border-dashed  border-black p-6"
 > 
           <div className="flex text-center justify-center text-yellow-300">
             <FaUserSecret size={70} />
</div>
<Button onClick={() => handleNavigate("/dashboard/manage-client")}>
View
 </Button>

 <p className="text-gray-700 text-center">
   Manage clients, edit details, and control business account settings.
 </p>
</Card>
      )}
     
    </div>
  );
};

export default Page;