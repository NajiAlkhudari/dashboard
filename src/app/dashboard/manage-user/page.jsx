"use client";
import React, { useEffect, useState } from "react";

import Table from "@/components/partials/Table";
import DeleteUserModal from "@/components/user/DeleteUserModal";
import UpdateUserModal from "@/components/user/UpdateUserModal";
import AddUserModal from "@/components/user/PostUserModal";
import {
  deleteUser,
  fetchUsers,
  postUser,
  updateUser,
} from "@/store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import Card from "@/components/ui/Card";
import withPermission from "@/utils/withPermission";
import Loading from "./loading";
import { Permissions } from "@/utils/Permissions";
import {
  showErrorToast,
  showSuccessToast,
  ToastContainer,
} from "@/utils/ToastNotifications";
import { fetchUserById } from "@/Services/userServices";
import { userService } from "@/Services/userServices";
const Page = () => {
  const dispatch = useDispatch();
  const { users, loading } = useSelector((state) => state.users);
  const [activeModal, setActiveModal] = useState(null); // "add", "update", "delete"
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userIdToUpdate, setUserIdToUpdate] = useState(null);
  const [userDataToUpdate, setUserDataToUpdate] = useState(null);

  useEffect(() => {
    userService.getAll();
  }, []);

  useEffect(() => {
    if (!activeModal) {
      setUserIdToUpdate(null);
      setUserDataToUpdate(null);
    }
  }, [activeModal]);

  const handleAddUser = async (userData) => {
    try {
      await userService.create(userData);
      showSuccessToast("user added successfully!");
    } catch (error) {
      console.error("Error adding user:", error);
      showErrorToast(
        `Failed to add user. Error: ${error.message || "Unknown error"}`
      );
    } finally {
      setActiveModal(null);
    }
  };

  const handleUpdate = async (updatedData) => {
    try {
      if (!userIdToUpdate) {
        console.error("No userIdToUpdate provided");
        return;
      }

      await userService.update(userIdToUpdate, updatedData);
      showSuccessToast("User updated successfully!");
    } catch (error) {
      console.error("Error updating user:", error);
      showErrorToast(
        `Failed to update user. Error: ${error.message || "Unknown error"}`
      );
    } finally {
      setActiveModal(null);
    }
  };

  const openModalUpdate = async (id) => {
    try {
      const UserData = await fetchUserById(id);
      setUserDataToUpdate(UserData);
      setUserIdToUpdate(id);
      setActiveModal("update");
    } catch (error) {
      console.error("Error fetching user data for update:", error);
    }
  };

  const handleConfirmDelete = async () => {
    try {
      if (!userIdToDelete) return;

      await userService.delete(userIdToDelete);

      showSuccessToast("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
      showErrorToast(
        `Failed to delete user. Error: ${error.message || "Unknown error"}`
      );
    } finally {
      setActiveModal(null);
      setUserIdToDelete(null);
    }
  };


  const columns = [
    { header: "ID", key: "id" },
    { header: "Name", key: "name" },
    { header: "Notes", key: "notes" },
    { header: "Permissions", key: "userPermissions" },
    { header: "Action", key: "action" },
  ];

  if (loading) return <Loading />;

  return (
    <>
      <Card>
        <div className="p-6">
          <div className="flex flex-row justify-between">
            <h1 className="text-2xl font-bold mb-4">Users Table</h1>
            <button
              className="mb-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-900 text-base font-medium text-white hover:bg-sky-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => setActiveModal("add")}
            >
              Add User
            </button>
          </div>
          <Table
            data={users}
            columns={columns}
            onDelete={(id) => {
              setUserIdToDelete(id);
              setActiveModal("delete");
            }}
            onUpdate={openModalUpdate}
          />
          {activeModal === "delete" && (
            <DeleteUserModal
              isOpen={true}
              onClose={() => setActiveModal(null)}
              onDelete={handleConfirmDelete}
            />
          )}
          {activeModal === "update" && (
            <UpdateUserModal
              isOpen={true}
              onClose={() => setActiveModal(null)}
              onUpdate={handleUpdate}
              initialData={userDataToUpdate}
            />
          )}
          {activeModal === "add" && (
            <AddUserModal
              isOpen={true}
              onClose={() => setActiveModal(null)}
              onSumbitUser={handleAddUser}
            />
          )}
        </div>
      </Card>
      <ToastContainer />
    </>
  );
};

export default withPermission(Page, Permissions.IsAdmin);
