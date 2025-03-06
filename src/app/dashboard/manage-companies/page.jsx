"use client";
import Table from "@/components/partials/Table";
import Card from "@/components/ui/Card";
import {
  fetchCompanyById,
} from "@/Services/companyServices";
import AddCompany from "@/components/company/AddCompany";
import React, { useState, useEffect } from "react";
import DeleteCompnayModal from "@/components/company/DeleteCompnayModal";
import UpdateCompanyModal from "@/components/company/UpdateCompanyModal";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies , postCompany, updateCompany , deleteCompnay } from "@/store/companySlice";
import { Permissions } from "@/utils/Permissions";
import withPermission from "@/utils/withPermission";
import { showErrorToast , showSuccessToast , ToastContainer } from "@/utils/ToastNotifications";

const Page = () => {
  const dispatch = useDispatch();
  const { companies, loading, error } = useSelector((state) => state.companies);

  const [activeModal, setActiveModal] = useState(null); // "add", "update", "delete"
  const [companyIdToDelete, setCompanyIdToDelete] = useState(null);
  const [companyDataToUpdate, setCompanyDataToUpdate] = useState(null);
  const [companyIdToUpdate, setCompanyIdToUpdate] = useState(null);

  useEffect(() => {
    dispatch(getCompanies());
  }, [dispatch]);



    const handleAddCompany = async (companyData) => {
      try {
        await dispatch(postCompany(companyData));
        showSuccessToast("success to add company")
        setActiveModal(null); 
      } catch (error) {
        console.error("Failed to add company:", error);
        showErrorToast("failed to add company")
      }
    };
    

  const handleUpdateCompany = async (updatedData) => {
    try {
      if (!companyIdToUpdate) {
        console.error("No companyIdToUpdate provided");
        return;
      }
      await dispatch(
        updateCompany({ id: companyIdToUpdate, updateData: updatedData })
      );
      showSuccessToast("company has updated");
    } catch (error) {
      console.error("Error updating company:", error);
      showErrorToast("failed to update company")
    } finally {
      setActiveModal(null);  
    }
  }
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

  const confirmhandleDelete = async () => {
     try {
       if (!companyIdToDelete) return;
       await dispatch(deleteCompnay(companyIdToDelete));
       showSuccessToast("success to delete company");
     } catch (error) {
       console.error("Error deleting company:", error);
       showErrorToast("failed to delete company");
     } finally {
       setActiveModal(null);  
       setCompanyIdToDelete(null);
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

  return (
    <>
      <Card>
        <div className="p-6">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4">Companies</h1>
            <button
              className="mb-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-900 text-base font-medium text-white hover:bg-sky-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
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