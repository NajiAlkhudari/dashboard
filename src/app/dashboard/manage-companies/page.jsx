"use client";
import Table from "@/components/ui/Table";
import Card from "@/components/ui/Card";
import { fetchCompanyById, compnayService } from "@/Services/companyServices";
import AddCompany from "@/components/company/AddCompany";
import React, { useState, useEffect } from "react";
import DeleteCompnayModal from "@/components/company/DeleteCompnayModal";
import UpdateCompanyModal from "@/components/company/UpdateCompanyModal";
import { useSelector } from "react-redux";
import { Permissions } from "@/utils/Permissions";
import withPermission from "@/utils/withPermission";
import {
  showErrorToast,
  showSuccessToast,
  ToastContainer,
  showWarningToast
} from "@/utils/ToastNotifications";
import Loading from "./loading";

  const Page = () => {
  const { companies, loading, error } = useSelector((state) => state.companies);

  const [activeModal, setActiveModal] = useState(null); // "add", "update", "delete"
  const [companyIdToDelete, setCompanyIdToDelete] = useState(null);
  const [companyDataToUpdate, setCompanyDataToUpdate] = useState(null);
  const [companyIdToUpdate, setCompanyIdToUpdate] = useState(null);

  useEffect(() => {
    compnayService.getAll();
  }, []);

  const handleAddCompany = async (newcompanyData) => {
    try {
      await compnayService.create(newcompanyData);
      showSuccessToast("company added successfully!");
    } catch (error) {
      console.error("Error adding company:", error);
      showErrorToast(
        `Failed to add company. Error: ${error.message || "Unknown error"}`
      );
    } finally {
      setActiveModal(null);
    }
  };

  const handleUpdateCompany = async (updatedData) => {
    try {
      if (!companyIdToUpdate) {
        console.error("No companyIdToUpdate provided");
        return;
      }
      await compnayService.update(companyIdToUpdate, updatedData);
      showSuccessToast("Company updated successfully!");
    } catch (error) {
      console.error("Error updating company:", error);
      showErrorToast(
        `Failed to update company. Error: ${error.message || "Unknown error"}`
      );
    } finally {
      setActiveModal(null);
    }
  };

 

    const confirmhandleDelete = async () => {
      try {
        if (!companyIdToDelete) return;
    
        await compnayService.delete(companyIdToDelete);
        showWarningToast("success delete company");
      } catch (error) {
    
        const errorMessage = error || "Unknown error";
    
        showErrorToast(`${errorMessage}`);
      } finally {
        setActiveModal(null);
        setCompanyIdToDelete(null);
      }
    };
    
  

  const openModalUpdate = async (id) => {
    try {
      const companyData = await fetchCompanyById(id);
      setCompanyDataToUpdate(companyData);
      setCompanyIdToUpdate(id);
      setActiveModal("update");
    } catch (error) {
      console.error("Error fetching company data for update:", error);
    }
  };

  const columns = [
    { header: "ID", key: "id" },
    { header: "Name", key: "name" },
    { header: "Phone", key: "phone" },
    { header: "Manager Name", key: "managerName" },
    { header: "Address", key: "address" },
    { header: "Network Domain", key: "networkDomain" },
    { header: "Notes", key: "notes" },
    { header: "Action", key: "action" },
  ];

  if (loading) return <Loading />;

  return (
    <>
      <Card>
        <div className="p-6">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4">Companies</h1>
            <button
              className="mb-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-900 text-base font-medium text-white hover:bg-gray-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => setActiveModal("add")}
            >
              New Company
            </button>
          </div>
        </div>

        <div>
          <Table
            data={companies}
            columns={columns}
            onDelete={(id) => {
              setCompanyIdToDelete(id);
              setActiveModal("delete");
            }}
            onUpdate={openModalUpdate}
          />
        </div>

        {activeModal === "add" && (
          <AddCompany
            isOpen={true}
            onClose={() => setActiveModal(null)}
            onSubmitCompany={handleAddCompany}
          />
        )}

        {activeModal === "update" && (
          <UpdateCompanyModal
            isOpen={true}
            onClose={() => {
              setActiveModal(null);
              setCompanyDataToUpdate(null);
            }}
            onUpdate={handleUpdateCompany}
            initialData={companyDataToUpdate}
          />
        )}

        {activeModal === "delete" && (
          <DeleteCompnayModal
            isOpen={true}
            onClose={() => setActiveModal(null)}
            onDelete={confirmhandleDelete}
          />
        )}
      </Card>
      <ToastContainer />
    </>
  );
};

export default withPermission(Page, Permissions.CanReadCompany);
