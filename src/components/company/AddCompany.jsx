import React, { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import TextInputForm from "../ui/TextInput/TextInputForm";

const AddCompany = ({ isOpen, onClose, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    managerName: "",
    address: "",
    networkDomain: "",
    notes: "",
  });
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  

  const handleSubmit =()=>{
    const postData= {
        name : formData.name,
        phone : formData.phone,
        managerName : formData.managerName,
        address : formData.address,
        networkDomain : formData.networkDomain,
        notes : formData.notes,
    }
    onUpdate(postData);
  };

  return(
    <Modal isOpen={isOpen} onClose={onClose} title="New Company">
         <div className="sm:flex sm:items-center px-12 ">
        <div className="mt-3 text-center sm:mt-0 sm:text-left">
          <div className="mt-2 space-y-4 ">
            </div>
            <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <TextInputForm
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
             />
             </div>
             <div>
            <label className="block text-sm font-medium text-gray-700">phone</label>
            <TextInputForm 
            name="phone"
            type="number"
            value={formData.phone}
            onChange={handleChange}
             />
             </div>
                   <div>
            <label className="block text-sm font-medium text-gray-700">managerName</label>
            <TextInputForm 
            name="managerName"
            type="text"
            value={formData.managerName}
            onChange={handleChange}
             />
             </div>
             <div>
            <label className="block text-sm font-medium text-gray-700">Address</label>
            <TextInputForm 
            name="address"
            type="text"
            value={formData.address}
            onChange={handleChange}
             />
             </div>
             <div>
            <label className="block text-sm font-medium text-gray-700">networkDomain</label>
            <TextInputForm 
            name="networkDomain"
            type="text"
            value={formData.networkDomain}
            onChange={handleChange}
             />
             </div>

             <div>
            <label className="block text-sm font-medium text-gray-700">Notes</label>
            <TextInputForm 
            name="notes"
            type="text"
            value={formData.notes}
            onChange={handleChange}
             />
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

export default AddCompany;
