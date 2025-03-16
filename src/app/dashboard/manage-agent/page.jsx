"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Loading from "./loading";
import Table from "@/components/ui/Table";
import withPermission from "@/utils/withPermission";
import { Permissions } from "@/utils/Permissions";
import AddAgent from "@/components/agent/AddAgent";
import UpdateAgentModal from "@/components/agent/UpdateAgentModal";
import Card from "@/components/ui/Card";
import { fetchAgentById , agentService } from "@/Services/agentService";
import DeleteAgentModal from "@/components/agent/DeleteAgentModal";
import {
  showErrorToast,
  showSuccessToast,
  ToastContainer,
  showWarningToast
} from "@/utils/ToastNotifications";
const Page = () => {
  const { agents, error, isloading } = useSelector((state) => state.agents);

  const [activeModal, setActiveModal] = useState(null); // "add", "update" , "delete"
  const [agentDataToUpdate, setAgentDataToUpdate] = useState(null);
  const [agentIdToUpdate, setAgentIdToUpdate] = useState(null);
  const [agentIdToDelete, setAgentIdToDelete] = useState(null);

  useEffect(() => {
    agentService.getAll();
  }, []);

  useEffect(() => {
    if (!activeModal) {
      setAgentIdToUpdate(null);
      setAgentDataToUpdate(null);
    }
  }, [activeModal]);

  const handleAddAgent = async (newAgentData) => {
    try {
      await agentService.create(newAgentData);
      showSuccessToast("Agent added successfully!");
    } catch (error) {
      console.error("Error adding agent:", error);
      showErrorToast(
        `Failed to add agent. Error: ${error.message || "Unknown error"}`
      );
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

      await agentService.update(agentIdToUpdate, updatedData);

      showSuccessToast("Agent updated successfully!");
    } catch (error) {
      console.error("Error updating agent:", error);
      showErrorToast(
        `Failed to update agent. Error: ${error.message || "Unknown error"}`
      );
    } finally {
      setActiveModal(null);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!agentIdToDelete) return;

      await agentService.delete(agentIdToDelete);

      showWarningToast("Agent deleted successfully!");
    } catch (error) {
      console.error("Error deleting agent:", error);
      showErrorToast(
        `Failed to delete agent. Error: ${error.message || "Unknown error"}`
      );
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

  if (isloading) return <Loading />;

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
              className="mb-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-900 text-base font-medium text-white hover:bg-gray-950  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
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
