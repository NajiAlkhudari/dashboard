"use client";
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from './loading';
import Table from '@/components/partials/Table';
import { fetchAgents, postAgent } from '@/store/agentSlice';
import withPermission from '@/utils/withPermission';
import { Permissions } from '@/utils/Permissions';
import AddAgent from '@/components/agent/AddAgent';
import Card from '@/components/ui/Card';
const Page = () => {
  const dispatch = useDispatch();
  const { agents, error, loading } = useSelector((state) => state.agents);
    const [isModalOpen, setIsModalOpen] = useState(false);


  const handleAddAgent = async (agentData) => {
    try {
      await dispatch(postAgent(agentData)).unwrap();
      setIsModalOpen(false); 
    } catch (error) {
      console.error("Failed to add client:", error);
    }
  };


  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  
     

  if (loading) {
    return <Loading />;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }


  const columns = [
    { header: "ID", key: "id" },
    { header: "Name", key: "name" },
    { header: "Phone", key: "phone" },
    { header: "Percentage", key: "percentage" },
    { header: "Notes", key: "notes" },
    { header: "Action", key: "action" },
  ];

  return (
    <>
    <Card>
        <div className="p-6">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4">Agents</h1>
            <button
              className="mb-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-900 text-base font-medium text-white hover:bg-sky-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => setIsModalOpen(true)}
            >
              New Agent
            </button>
          </div>
        </div>
  
      <div>
      <Table columns={columns} data={agents} />

      <AddAgent
      isOpen={isModalOpen}
      onClose={()=>setIsModalOpen(false)}
      onUpdate={handleAddAgent} />
     
    </div>
    
    </Card>
    </>
  );
};


export default withPermission(Page , Permissions.CanReadAgent);
