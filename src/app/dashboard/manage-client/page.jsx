"use client";
import React , {useState , useEffect} from 'react'
import { useDispatch , useSelector } from 'react-redux';
import Table from '@/components/partials/Table';
import { fetchClient , postClient } from '@/store/clientSlice';
import Loading from './loading';
import PostClientModal from '@/components/client/PostClientModal';
import Card from '@/components/ui/Card';
import withPermission from '@/utils/withPermission';
import { Permissions } from '@/utils/Permissions';

  const Page =() => {
    const dispatch = useDispatch();
    const {clients , error , loading} = useSelector((state)=>state.clients);
    
    const [isModalOpen, setIsModalOpen] = useState(false);


    const handleAddClient = async (clientData) => {
      try {
        await dispatch(postClient(clientData)).unwrap();
        setIsModalOpen(false); 
      } catch (error) {
        console.error("Failed to add client:", error);
      }
    };


    useEffect(()=>{
        dispatch(fetchClient())
    },[dispatch])

    if (loading) {
      return (
      <Loading />
      );
    }
  


    const columns = [
        { header: "ID", key: "id" },
        { header: "Name", key: "name" },
        { header: "phone", key: "phone" },
        { header: "isActive", key: "isActive" },
        { header: "keyPath", key: "keyPath" },
        { header: "prefex", key: "prefex" },
        { header: "Action", key: "action" },
      ];

      if (loading) {
        return (
        <Loading />
        );
      }
   
    
  return (
    <>
     <Card>
        <div className="p-6">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4">Clients</h1>
            <button
              className="mb-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-900 text-base font-medium text-white hover:bg-sky-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => setIsModalOpen(true)}
            >
              New Client
            </button>
          </div>
        </div>
    <div>
   
      <Table columns={columns} data={clients} />
      <PostClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmitClient={handleAddClient} 
      />
 
    </div>
    </Card>
    </>
  )
}


export default withPermission(Page , Permissions.CanReadClient) ; 
