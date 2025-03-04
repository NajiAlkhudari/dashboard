"use client";
import React , {useState , useEffect} from 'react'
import { useDispatch , useSelector } from 'react-redux';
import Table from '@/components/partials/Table';
import { fetchClient , postClient } from '@/store/clientSlice';
import Loading from './loading';
import PostClientModal from '@/components/client/PostClientModal';
// import Error from './error';

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
    // if (error) {
    //   return (
    //   <Error />
    //   );
    // }


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
    <div>
      <button
        onClick={() => setIsModalOpen(true)}
        className="btn btn-primary"
      >
        Add Client
      </button>
      <Table columns={columns} data={clients} />
      <PostClientModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpdate={handleAddClient} 
      />
    </div>
  )
}


export default Page
