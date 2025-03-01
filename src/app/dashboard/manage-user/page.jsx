
"use client";
import React, { useEffect, useState } from 'react';
import { deleteUser, updateUser, fetchUserById, postUser } from '@/Services/userServices';
import Table from '@/components/partials/Table';
import DeleteUserModal from '@/components/user/DeleteUserModal';
import UpdateUserModal from '@/components/user/UpdateUserModal';
import AddUserModal from '@/components/user/PostUserModal';
import { fetchUsers } from '@/store/userSlice';
import { Permissions , useHasPermission } from '@/app/utils/Permissions';
import { useDispatch, useSelector } from 'react-redux';
import Card from '@/components/ui/Card';
import withPermission from '@/app/utils/withPermission';

const Page = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setIsModalOpenUpdate] = useState(false);
  const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);
  const [userIdToUpdate, setUserIdToUpdate] = useState(null);
  const [userDataToUpdate, setUserDataToUpdate] = useState(null);
  const hasPermission = useHasPermission(Permissions.IsAdmin);

  
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleConfirmDelete = async () => {
    try {
      if (!userIdToDelete) return;
      const isDeleted = await deleteUser(userIdToDelete);
      if (isDeleted) {
        // تحديث قائمة المستخدمين
        await dispatch(fetchUsers());
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    } finally {
      setIsModalOpen(false);
      setUserIdToDelete(null);
    }
  };
  

  const handleUpdate = async (updatedData) => {
    try {
      if (!userIdToUpdate) return;
      const isUpdated = await updateUser(userIdToUpdate, updatedData);
      if (isUpdated) {
        dispatch(fetchUsers());
      }
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setIsModalOpenUpdate(false);
      setUserIdToUpdate(null);
      setUserDataToUpdate(null);
    }
  };

  const handleAddUser = async (newUserData) => {
    try {
      const isAdded = await postUser(newUserData);
      if (isAdded) {
        dispatch(fetchUsers());
      }
    } catch (error) {
      console.error('Error adding user:', error);
    } finally {
      setIsModalOpenAdd(false);
    }
  };

  const openModalUpdate = async (id) => {
    try {
      const userData = await fetchUserById(id);
      setUserDataToUpdate(userData);
      setUserIdToUpdate(id);
      setIsModalOpenUpdate(true);
    } catch (error) {
      console.error('Error fetching user data for update:', error);
    }
  };

  const columns = [
    { header: 'ID', key: 'id' },
    { header: 'Name', key: 'name' },
    { header: 'Notes', key: 'notes' },
    { header: 'Permissions', key: 'userPermissions' },
    { header: 'Action', key: 'action' },
  ];

  return (

      <div className="p-6">
        <div className="flex flex-row justify-between">
          <h1 className="text-2xl font-bold mb-4">Users Table</h1>
          {hasPermission && (
            <button
              className="mb-4 inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-900 text-base font-medium text-white hover:bg-sky-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              onClick={() => setIsModalOpenAdd(true)}
            >
              Add User
            </button>
          )}
        </div>

          {/* <Table
            data={users}
            columns={columns}
            onDelete={hasPermission ? (id) => {
              setUserIdToDelete(id);
              setIsModalOpen(true);
            } : null}
            onUpdate={hasPermission ? openModalUpdate : null}
          /> */}
     <Table
  data={users} 
  columns={columns}
  onDelete={(id) => {
    setUserIdToDelete(id);
    setIsModalOpen(true);
  }}
  onUpdate={openModalUpdate}
/>

        <DeleteUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onDelete={handleConfirmDelete}
        />
        <UpdateUserModal
          isOpen={isModalOpenUpdate}
          onClose={() => {
            setIsModalOpenUpdate(false);
            setUserDataToUpdate(null);
          }}
          onUpdate={handleUpdate}
          initialData={userDataToUpdate}
        />
        <AddUserModal
          isOpen={isModalOpenAdd}
          onClose={() => setIsModalOpenAdd(false)}
          onUpdate={handleAddUser}
        />
      </div>
  );
};

export default withPermission(Page, Permissions.IsAdmin);
