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
import {  fetchAgentById } from "@/Services/agentService";
import DeleteAgentModal from "@/components/agent/DeleteAgentModal";
import { showErrorToast , showSuccessToast , ToastContainer } from "@/utils/ToastNotifications";
import Error from "../error";

const Page = () => {
  const dispatch = useDispatch();
  const { agents, error, loading } = useSelector((state) => state.agents);

  const [activeModal, setActiveModal] = useState(null); // "add", "update" , "delete"
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
        const resultAction = await dispatch(postAgent(newAgentData));
    
        if (postAgent.fulfilled.match(resultAction)) {
          showSuccessToast("Agent added successfully!");
        } else {
          showErrorToast(`Failed to add agent. Error: ${resultAction.payload || "Unknown error"}`);
        }
      } catch (e) {
        console.error("Error adding agent:", e);
        showErrorToast("An unexpected error occurred. Please try again.");
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
        const resultAction = await dispatch(updateAgent({ id: agentIdToUpdate, updateData: updatedData }));
    
        if (updateAgent.fulfilled.match(resultAction)) {
          showSuccessToast("Agent updated successfully!");  
        } else {
          showErrorToast(`Failed to update agent. Error: ${resultAction.payload || "Unknown error"}`);  
        }
      } catch (error) {
        console.error("Error updating agent:", error);
        showErrorToast("An unexpected error occurred. Please try again.");  
      } finally {
        setActiveModal(null);  
      }
    };
    
    const handleConfirmDelete = async () => {
      try {
        if (!agentIdToDelete) return;
    
        const resultAction = await dispatch(deleteAgent(agentIdToDelete));
    
        if (deleteAgent.fulfilled.match(resultAction)) {
          showSuccessToast("Agent deleted successfully!");  
        } else {
          showErrorToast(`Failed to delete agent. Error: ${resultAction.payload || "Unknown error"}`);  
        }
      } catch (error) {
        console.error("Error deleting agent:", error);
        showErrorToast("An unexpected error occurred. Please try again.");  
      } finally {
        setActiveModal(null);     
        setAgentIdToDelete(null); 
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

if (loading) return <Loading />
  
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
      <ToastContainer />
    </>
  );
};

export default withPermission(Page, Permissions.CanReadAgent);
