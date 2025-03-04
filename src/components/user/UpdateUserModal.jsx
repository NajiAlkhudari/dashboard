"use client"

import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import ComboBox from '../ui/ComboBox';
import { permissionOptions } from '@/utils/permissionOptions';
import TextInputForm from '../ui/TextInput/TextInputForm';

const UpdateUserModal = ({ isOpen, onClose, onUpdate, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    notes: '',
    password: '',
    userPermissions: [],
  });

  useEffect(() => {
    if (initialData) {
      try {
        setFormData({
          name: initialData.name || '',
          notes: initialData.notes || '',
          password: '', 
          userPermissions: Array.isArray(initialData.userPermissions) 
          ? initialData.userPermissions.map(perm => perm.toString()) 
          : initialData.userPermissions ? [initialData.userPermissions.toString()] : [],
          });
      } catch (error) {
        console.error("Error initializing form data:", error);
      }
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelect = (selectedPermission) => {
    if (!formData.userPermissions.includes(selectedPermission)) {
      setFormData((prevData) => ({
        ...prevData,
        userPermissions: [...prevData.userPermissions, selectedPermission],
      }));
    }
  };

  const handleRemovePermission = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      userPermissions: prevData.userPermissions.filter((perm) => perm !== value),
    }));
  };

  const handleSubmit = () => {
    try {
      const totalPermissions = formData.userPermissions.reduce((sum, perm) => sum + parseInt(perm, 10), 0);
      const updatedData = {
        name: formData.name,
        notes: formData.notes,
        password: formData.password,
        userPermissions: totalPermissions,
      };
      onUpdate(updatedData);
    } catch (error) {
      console.error("Error submitting form data:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update User">
      <div className="sm:flex sm:items-center px-12">
        <div className="mt-3 text-center sm:mt-0 sm:text-left">
          <div className="mt-2 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <TextInputForm
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <TextInputForm
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <TextInputForm
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Leave blank to keep current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Permissions</label>
              <ComboBox
                options={permissionOptions}
                placeholder="Select Permissions"
                onSelect={handleSelect}
                clearOnSelect={true}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.userPermissions.map((perm) => {
                  const label = permissionOptions.find((p) => p.value === perm)?.label || perm;
                  return (
                    <span key={perm} className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md flex items-center">
                      {label}
                      <button onClick={() => handleRemovePermission(perm)} className="ml-2 text-red-500">×</button>
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="button"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-900 text-base font-medium text-white hover:bg-sky-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
          onClick={handleSubmit}
        >
          Update
        </button>
        <button
          type="button"
          className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default UpdateUserModal;
