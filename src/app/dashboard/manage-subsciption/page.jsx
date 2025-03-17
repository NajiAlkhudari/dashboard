"use client";
import Table from "@/components/ui/Table";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "./loading";
import {
  fetchSupscriptionById,
  subscriptionService,
} from "@/Services/subscriptionService";
import {
  showSuccessToast,
  showErrorToast,
  showWarningToast,
  ToastContainer,
} from "@/utils/ToastNotifications";
import Card from "@/components/ui/Card";
import AddSubModal from "@/components/subscriptions/AddSubmodal";
import { fetchSubscription } from "@/store/subscriptionSlice";
import DeleteSubModal from "@/components/subscriptions/DeleteSubModal";
import UpdateSubModal from "@/components/subscriptions/UpdateSubModal";

const Page = () => {
  const [activeModal, setActiveModal] = useState(null); // "add", "update", "delete"
  const [subIdDelete, setSubIdDelete] = useState(null);
  const [subIdToUpdate, setSubIdToUpdate] = useState(null);
  const [subDataToUpdate, setSubDataToUpdate] = useState(null);

  const dispatch = useDispatch();

  const { subscriptions, error, loading } = useSelector(
    (state) => state.subscriptions
  );

  useEffect(() => {
    dispatch(fetchSubscription());
  }, [dispatch]);

  const handleAddSub = async (newsubData) => {
    try {
      await subscriptionService.create(newsubData);
      showSuccessToast("subscription added successfully!");
    } catch (error) {
      console.error("Error adding subscription:", error);
      showErrorToast(
        `Failed to add subscription. Error: ${error.message || "Unknown error"}`
      );
    } finally {
      setActiveModal(null);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!subIdDelete) return;

      await subscriptionService.delete(subIdDelete);

      showWarningToast("subscription deleted successfully!");
    } catch (error) {
      console.error("Error deleting subscription:", error);
      showErrorToast(
        `Failed to delete subscription. Error: ${
          error.message || "Unknown error"
        }`
      );
    } finally {
      setActiveModal(null);
      setSubIdDelete(null);
    }
  };



    const handleUpdateSub = async (updatedData) => {
      try {
        if (!subIdToUpdate) {
          console.error("No Subscription IdToUpdate provided");
          return;
        }
  
        await subscriptionService.update(subIdToUpdate, updatedData);
  
        showSuccessToast("Subscription updated successfully!");
      } catch (error) {
        console.error("Error updating Subscription:", error);
        showErrorToast(
          `Failed to update Subscription. Error: ${error.message || "Unknown error"}`
        );
      } finally {
        setActiveModal(null);
      }
    };



  const openModalUpdate = async (id) => {
    try {
      const subData = await fetchSupscriptionById(id);
      if (!subData) {
        console.error("Agent data not found.");
        return;
      }
      setSubDataToUpdate(subData);
      setSubIdToUpdate(id);
      setActiveModal("update");
    } catch (error) {
      console.error("Error fetching agent data for update:", error);
    }
  };

  if (loading) return <Loading />;

  const columns = [
    { header: "ID", key: "id" },
    { header: "Start Date", key: "startDate" },
    { header: "End Date", key: "endDate" },
    { header: "Cost Per Month", key: "costPermonth" },
    { header: "Client Name", key: "clientName" },
    { header: "Notes", key: "notes" },
    { header: "Action", key: "action" },
  ];

  return (
    <>
      <Card>
        <div className="p-6">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4">Subscription</h1>
            <button
              className="mb-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-900 text-base font-medium text-white hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => setActiveModal("add")}
            >
              New Subscription
            </button>
          </div>
        </div>
        <div>
          <Table
            data={subscriptions}
            columns={columns}
            showDetails={true}
            onUpdate={(id) => openModalUpdate(id)}
            onDelete={(id) => {
              setSubIdDelete(id);
              setActiveModal("delete");
            }}
          />

          {activeModal === "add" && (
            <AddSubModal
              isOpen={true}
              onClose={() => setActiveModal(null)}
              onSubmitSub={handleAddSub}
            />
          )}
    {activeModal === "update" && (
          <UpdateSubModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            onUpdateSub={handleUpdateSub}
            initialData={subDataToUpdate}
          />
        )}
          {activeModal === "delete" && (
            <DeleteSubModal
              isOpen={true}
              onClose={() => setActiveModal(null)}
              onDelete={handleConfirmDelete}
            />
          )}
        </div>
      </Card>
      <ToastContainer />
    </>
  );
};

export default Page;
