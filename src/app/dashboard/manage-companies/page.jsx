"use client";
import Table from "@/components/partials/Table";
import Card from "@/components/ui/Card";
import {
  deleteCompany,
  fetchCompanyById,
  postCompany,
  UpdateCompany,
} from "@/Services/companyServices";
import AddCompany from "@/components/company/AddCompany";
import React, { useState, useEffect } from "react";
import DeleteCompnayModal from "@/components/company/DeleteCompnayModal";
import UpdateCompanyModal from "@/components/company/UpdateCompanyModal";
import { useDispatch, useSelector } from "react-redux";
import { getCompanies } from "@/store/companySlice";
import { Permissions } from "@/utils/Permissions";
import withPermission from "@/utils/withPermission";

const Page = () => {
    const dispatch = useDispatch();
    const { companies, loading, error } = useSelector((state) => state.companies);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);

  const [companyDataToUpdate, setCompanyDataToUpdate] = useState(null);
  const [companyIdToDelete, setCompanyIdToDelete] = useState(null);
  const [companyIdToUpdate, setCompanyIdToUpdate] = useState(null);



   useEffect(() => {
      dispatch(getCompanies());
    }, [dispatch]);

  const handleAddCompany = async (newCompanyData) => {
    try {
      const isAdded = await postCompany(newCompanyData);
      if (isAdded) {
                 await dispatch(getCompanies());

      }
    } catch (error) {
      console.error("Error adding company:", error);
    } finally {
      setIsModalOpenAdd(false);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      if (!companyIdToUpdate) return;
      const isUpdated = await UpdateCompany(companyIdToUpdate, updatedData);
      if (isUpdated) {
        await dispatch(getCompanies());

      }
    } catch (error) {
      console.error("Error updating company:", error);
    } finally {
      setIsModalOpenUpdate(false);
      setCompanyIdToUpdate(null);
      setCompanyDataToUpdate(null);
    }
  };

  const openModalUpdate = async (id) => {
    try {
      const companyData = await fetchCompanyById(id);
      setCompanyDataToUpdate(companyData);
      setCompanyIdToUpdate(id);
      setIsModalOpenUpdate(true);
    } catch (error) {
      console.error("Error fetching company data for update:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!companyIdToDelete) return;
      
      console.log("Deleting company with ID:", companyIdToDelete);

      const isDeleted = await deleteCompany(companyIdToDelete);

      console.log("Delete response:", isDeleted);

      if (isDeleted) {
        await dispatch(getCompanies());
      }
    } catch (error) {
      console.error("Error deleting company:", error);
    } finally {
      setIsModalOpen(false);
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
              onClick={() => setIsModalOpenAdd(true)}
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
              setIsModalOpen(true);
            }}
            onUpdate={openModalUpdate}
          />
        </div>
        <UpdateCompanyModal
          isOpen={isModalOpenUpdate}
          onClose={() => {
            setIsModalOpenUpdate(false);
            setCompanyDataToUpdate(null);
          }}
          onUpdate={handleUpdate}
          initialData={companyDataToUpdate}
        />
        <AddCompany
          isOpen={isModalOpenAdd}
          onClose={() => setIsModalOpenAdd(false)}
          onUpdate={handleAddCompany}
        />
        <DeleteCompnayModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDelete={handleConfirmDelete}
        />
      </Card>
    </>
  );
};

export default withPermission(Page , Permissions.CanReadCompany) ; 
