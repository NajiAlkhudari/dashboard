"use client";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Table from "@/components/ui/Table";
import Loading from "./loading";
import PostClientModal from "@/components/client/PostClientModal";
import Card from "@/components/ui/Card";
import withPermission from "@/utils/withPermission";
import { Permissions } from "@/utils/Permissions";
import UpdateClientModal from "@/components/client/UpdateClientModal";
import { fetchClientById } from "@/Services/clientService";
import DeleteClientModal from "@/components/client/DeleteClientModal";
import {
  showErrorToast,
  showSuccessToast,
  ToastContainer,
  showWarningToast
} from "@/utils/ToastNotifications";

import { clientService } from "@/Services/clientService";
const Page = () => {
  const { clients, error, loading } = useSelector((state) => state.clients);

  const [activeModal, setActiveModal] = useState(null); // "add", "update" , "delete"
  const [clientDataToUpdate, setClientDataToUpdate] = useState(null);
  const [clientIdToUpdate, setClientIdToUpdate] = useState(null);
  const [clientIdDelete, setClientDelete] = useState(null);

  const handleAddClient = async (newclientData) => {
    try {
      await clientService.create(newclientData);
      showSuccessToast("client added successfully!");
    } catch (error) {
      console.error("Error adding client:", error);
      showErrorToast(
        `Failed to add client. Error: ${error.message || "Unknown error"}`
      );
    } finally {
      setActiveModal(null);
    }
  };

  const handleUpdateClient = async (updatedData) => {
    try {
      if (!clientIdToUpdate) {
        console.error("No agentIdToUpdate provided");
        return;
      }

      await clientService.update(clientIdToUpdate, updatedData);

      showSuccessToast("Client updated successfully!");
    } catch (error) {
      console.error("Error updating client:", error);
      showErrorToast(
        `Failed to update client. Error: ${error.message || "Unknown error"}`
      );
    } finally {
      setActiveModal(null);
    }
  };

  const confirmhandleDelete = async () => {
    try {
      if (!clientIdDelete) return;

      await clientService.delete(clientIdDelete);

      showWarningToast("Client deleted successfully!");
    } catch (error) {
      console.error("Error deleting client:", error);
      showErrorToast(
        `Failed to delete client. Error: ${error.message || "Unknown error"}`
      );
    } finally {
      setActiveModal(null);
      setClientDelete(null);
    }
  };

  const openModalUpdate = async (id) => {
    try {
      const clientData = await fetchClientById(id);
      if (!clientData) {
        console.error("Client data not found.");
        return;
      }
      setClientDataToUpdate(clientData);
      setClientIdToUpdate(id);
      setActiveModal("update");
    } catch (error) {
      console.error("Error fetching Client data for update:", error);
    }
  };

  useEffect(() => {
    clientService.getAll();
  }, []);

  useEffect(() => {
    if (!activeModal) {
      setClientIdToUpdate(null);
      setClientDataToUpdate(null);
    }
  }, [activeModal]);

  const columns = [
    { header: "ID", key: "id" },
    { header: "Name", key: "name" },
    { header: "phone", key: "phone" },
    { header: "isActive", key: "isActive" },
    { header: "keyPath", key: "keyPath" },
    { header: "prefex", key: "prefex" },
    { header: "Action", key: "action" },
  ];

  if (loading) return <Loading />;

  return (
    <>
      <Card>
        <div className="p-6">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4">Clients</h1>
            <button
              className="mb-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-900 text-base font-medium text-white hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => setActiveModal("add")}
            >
              New Client
            </button>
          </div>
        </div>
        <div>
          <Table
            data={clients}
            columns={columns}
            onUpdate={(id) => openModalUpdate(id)}
            onDelete={(id) => {
              setClientDelete(id);
              setActiveModal("delete");
            }}
          />

          {activeModal === "add" && (
            <PostClientModal
              isOpen={true}
              onClose={() => setActiveModal(null)}
              onSubmitClient={handleAddClient}
            />
          )}

          {activeModal === "update" && (
            <UpdateClientModal
              isOpen={true}
              onClose={() => setActiveModal(null)}
              onUpdateClient={handleUpdateClient}
              initialData={clientDataToUpdate}
            />
          )}
          {activeModal === "delete" && (
            <DeleteClientModal
              isOpen={true}
              onClose={() => setActiveModal(null)}
              onDelete={confirmhandleDelete}
            />
          )}
        </div>
      </Card>
      <ToastContainer />
    </>
  );
};

export default withPermission(Page, Permissions.CanReadClient);
