import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import TextInput from '../ui/TextInput/TextInput';
import ComboBox from '../ui/ComboBox';
import { permissionOptions } from '../../app/utils/permissionOptions';
const AddUserModal = ({ isOpen, onClose, onUpdate, initialData }) => {
  const [formData, setFormData] = useState({
    name: '',
    notes: '',
    password: '',
    userPermissions: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        notes: initialData.notes || '',
        password: initialData.password || '', 
        userPermissions: initialData.userPermissions?.toString() || '',
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const updatedData = {
      name: formData.name,
      notes: formData.notes,
      password: formData.password,
      userPermissions: parseInt(formData.userPermissions, 10),
    };
    onUpdate(updatedData);
  };



  const handleSelect = (selectedPermission) => {
    setFormData((prevData) => ({
      ...prevData,
      userPermissions: selectedPermission.toString(),
    }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-center px-12 ">
        <div className="mt-3 text-center sm:mt-0 sm:text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Add User</h3>
          <div className="mt-2 space-y-4 ">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <TextInput
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="bg-gray-300 text-gray-600 mt-1 block py-2 px-3 border-b-4 border-gray-700 rounded-md focus:outline-none focus:border-sky-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Notes</label>
              <TextInput
                type="text"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="bg-gray-300 text-gray-600 mt-1 block py-2 px-3 border-b-4 border-gray-700 rounded-md focus:outline-none focus:border-sky-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="........."
                className="bg-gray-300 text-gray-600 mt-1 block py-2 px-3 w-full sm:w-80 md:w-96 lg:w-128 border-b-4 border-gray-700 rounded-md focus:outline-none focus:border-sky-700"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Permissions</label>
              <ComboBox
                options={permissionOptions}
                placeholder="Select Permissions"
                onSelect={handleSelect}
              />
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
          Add
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

export default AddUserModal;
