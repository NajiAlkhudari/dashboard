"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./loading";
import Table from "@/components/partials/Table";
import { deleteAgent, fetchAgents, postAgent, updateAgent } from "@/store/agentSlice";
import withPermission from "@/utils/withPermission";
import { Permissions } from "@/utils/Permissions";
import AddAgent from "@/components/agent/AddAgent";
import UpdateAgentModal from "@/components/agent/UpdateAgentModal";
import Card from "@/components/ui/Card";
import { deleteAgentTest, fetchAgentById, UpdateAgent, UpdateAgentTest } from "@/Services/agentService";
import DeleteAgentModal from "@/components/agent/DeleteAgentModal";

const Page = () => {
  const dispatch = useDispatch();
  const { agents, error, loading } = useSelector((state) => state.agents);

  const [activeModal, setActiveModal] = useState(null); // "add", "update"
  const [agentDataToUpdate, setAgentDataToUpdate] = useState(null);
  const [agentIdToUpdate, setAgentIdToUpdate] = useState(null);
    const [agentIdToDelete, setAgentIdToDelete] = useState(null);
  

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);

  useEffect(() => {
    if (!activeModal) {
      setAgentIdToUpdate(null);
      setAgentDataToUpdate(null);
    }
  }, [activeModal]);

  const handleAddAgent = async (newAgentData) => {
    try {
      await dispatch(postAgent(newAgentData)).unwrap();
      await dispatch(fetchAgents());
    } catch (error) {
      console.error("Error adding agent:", error);
    } finally {
      setActiveModal(null);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      if (!agentIdToUpdate) {
        console.error("No agentIdToUpdate provided");
        return;
      }
  
      await dispatch(updateAgent({ id: agentIdToUpdate, updateData: updatedData })).unwrap(); // استخدم .unwrap() للحصول على النتيجة
  
    } catch (error) {
      console.error("Error updating agent:", error);
    } finally {
      setActiveModal(null);
    }
  };
  

  const openModalUpdate = async (id) => {
    try {
      const agentData = await fetchAgentById(id);
      if (!agentData) {
        console.error("Agent data not found.");
        return;
      }
      setAgentDataToUpdate(agentData);
      setAgentIdToUpdate(id);
      setActiveModal("update");
    } catch (error) {
      console.error("Error fetching agent data for update:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!agentIdToDelete) return;
  
      await dispatch(deleteAgent(agentIdToDelete)).unwrap(); // استخدام .unwrap() للحصول على النتيجة
      await dispatch(fetchAgents());

  
    } catch (error) {
      console.error("Error deleting agent:", error);
    } finally {
      setActiveModal(null); 
      setAgentIdToDelete(null);
    }
  };
  
  const columns = [
    { header: "ID", key: "id" },
    { header: "Name", key: "name" },
    { header: "Phone", key: "phone" },
    { header: "Percentage", key: "percentage" },
    { header: "Notes", key: "notes" },
    { header: "Action", key: "action" },
  ];

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Card>
        <div className="p-6">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4">Agents</h1>
            <button
              className="mb-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-900 text-base font-medium text-white hover:bg-sky-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => setActiveModal("add")}
            >
              New Agent
            </button>
          </div>
        </div>

        <div>
          <Table
            data={agents}
            columns={columns}
            onUpdate={(id) => openModalUpdate(id)} 
            onDelete={(id) => {
              setAgentIdToDelete(id);
              setActiveModal("delete"); 
            }}
          />
        </div>

        {activeModal === "add" && (
          <AddAgent
            isOpen={true}
            onClose={() => setActiveModal(null)}
            onSubmitAgent={handleAddAgent}
          />
        )}

        {activeModal === "update" && (
          <UpdateAgentModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            onUpdateAgent={handleUpdate}
            initialData={agentDataToUpdate}
          />
        )}

{activeModal === "delete" && (
          <DeleteAgentModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            onDelete={handleConfirmDelete}
          />
        )}
      </Card>
    </>
  );
};

export default withPermission(Page, Permissions.CanReadAgent);
