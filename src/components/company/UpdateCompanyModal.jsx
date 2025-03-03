"use client"
import React, { useState, useEffect } from 'react';
import Modal from '@/components/ui/Modal';
import TextInputForm from '../ui/TextInput/TextInputForm';


const UpdateCompanyModal = ({ isOpen, onClose, onUpdate, initialData }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    managerName: "",
    address: "",
    networkDomain: "",
    notes: "",
  });

  useEffect(() => {
    if (initialData) {
      console.log("initialData:", initialData);

      setFormData({
        name : initialData.name || '',
        phone : initialData.phone || '',
        managerName : initialData.managerName || '',
        address : initialData.address || '',
        networkDomain : initialData.networkDomain || '',
        notes : initialData.notes || '',
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
      name : formData.name ,
        phone : formData.phone ,
        managerName : formData.managerName,
        address : formData.address,
        networkDomain : formData.networkDomain,
        notes : formData.notes ,
    };
    onUpdate(updatedData);
  };




  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="sm:flex sm:items-center px-12">
        <div className="mt-3 text-center sm:mt-0 sm:text-left">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Update Company</h3>
          <div className="mt-2 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <TextInputForm 
            name="name"
            type="text"
            value={formData.name || ""}
            onChange={handleChange}
             />
             </div>
             <div>
            <label className="block text-sm font-medium text-gray-700">phone</label>
            <TextInputForm 
            name="phone"
            type="number"
            value={formData.phone || ""}
            onChange={handleChange}
             />
             </div>
                   <div>
            <label className="block text-sm font-medium text-gray-700">managerName</label>
            <TextInputForm 
            name="managerName"
            type="text"
            value={formData.managerName || ""}
            onChange={handleChange}
             />
             </div>
             <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <TextInputForm 
            name="address"
            type="text"
            value={formData.address || ""}
            onChange={handleChange}
             />
             </div>
             <div>
            <label className="block text-sm font-medium text-gray-700">networkDomain</label>
            <TextInputForm 
            name="networkDomain"
            type="text"
            value={formData.networkDomain || ""}
            onChange={handleChange}
             />
             </div>

             <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <TextInputForm 
            name="notes"
            type="text"
            value={formData.notes || ""}
            onChange={handleChange}
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

export default UpdateCompanyModal;
