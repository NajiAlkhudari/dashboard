"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "@/components/partials/Table";
import {
  deleteClient,
  fetchClient,
  postClient,
  updateClient,
} from "@/store/clientSlice";
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
} from "@/utils/ToastNotifications";
const Page = () => {


  const dispatch = useDispatch();
  const { clients, error, loading } = useSelector((state) => state.clients);

  const [activeModal, setActiveModal] = useState(null); // "add", "update" , "delete"
  const [clientDataToUpdate, setClientDataToUpdate] = useState(null);
  const [clientIdToUpdate, setClientIdToUpdate] = useState(null);
  const [clientIdDelete, setClientDelete] = useState(null);



  const handleAddClient = async (clientData) => {
    try {
      const resultAction =  await dispatch(postClient(clientData));
     if (postClient.fulfilled.match(resultAction)) {
             showSuccessToast("Client added successfully!");
           } else {
             showErrorToast(`Failed to add client. Error: ${resultAction.payload || "Unknown error"}`);
           }
         } catch (e) {
           console.error("Error adding client:", e);
           showErrorToast("An unexpected error occurred. Please try again.");
         } finally {
           setActiveModal(null);
         }
       };
       
  
  const handleUpdateClient = async (updatedData) => {
    try {
      if (!clientIdToUpdate) {
        console.error("No clientIdToUpdate provided");
        return;
      }
   const resultAction=   await dispatch(
        updateClient({ id: clientIdToUpdate, updateData: updatedData })
      );
     if (updateClient.fulfilled.match(resultAction)) {
             showSuccessToast("Client update successfully!");
           } else {
             showErrorToast(`Failed to update client. Error: ${resultAction.payload || "Unknown error"}`);
           }
         } catch (e) {
           console.error("Error update client:", e);
           showErrorToast("An unexpected error occurred. Please try again.");
         } finally {
           setActiveModal(null);
         }
       };
       
  
  const confirmhandleDelete = async () => {
    try {
      if (!clientIdDelete) return;
   const resultAction =   await dispatch(deleteClient(clientIdDelete));
    if (deleteClient.fulfilled.match(resultAction)) {
             showSuccessToast("Client deleted successfully!");  
           } else {
             showErrorToast(`Failed to delete client. Error: ${resultAction.payload || "Unknown error"}`);  
           }
    } catch (error) {
      console.error("Error deleting client:", error);
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
    dispatch(fetchClient());
  }, [dispatch]);

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

  if (loading)   return <Loading />;
  

  return (
    <>
      <Card>
        <div className="p-6">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4">Clients</h1>
            <button
              className="mb-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-900 text-base font-medium text-white hover:bg-sky-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
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
