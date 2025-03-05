"use client"
import React , {useState , useEffect} from "react";
import Modal from "../ui/Modal";
import TextInputForm from "../ui/TextInput/TextInputForm";



const  UpdateAgentModal = ({ isOpen, onClose, onUpdateAgent , initialData })=>{
const [agentData , setAgentData]= useState({
    name: "",
    phone : "",
    percentage : "",
    notes : ""
});



  useEffect(() => {
    if (initialData) {

        setAgentData({
        name : initialData.name || '',
        phone : initialData.phone || '',
        percentage : initialData.percentage || '',
        notes : initialData.notes || '',
      });
    }
  }, [initialData]);

const handleChange = (e)=>{
    setAgentData({
        ...agentData,
        [e.target.name] : e.target.value,
    });
};

const handleSubmit = () => {
    onUpdateAgent(agentData); 
};

return(
   <Modal isOpen={isOpen} onClose={onClose} title="Update Agent">
      <div className="sm:flex sm:items-center px-12">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <div className="mt-2 space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <TextInputForm
                        type="text"
                        name="name"
                        value={agentData.name || ""}
                        onChange={handleChange}  
                         />
                            <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <TextInputForm
                            type="text"
                            name="phone"
                            value={agentData.phone || ""}
                            onChange={handleChange}
                        />
                             <label className="block text-sm font-medium text-gray-700">Percentage</label>
                        <TextInputForm
                            type="number"
                            name="percentage"
                            value={agentData.percentage || ""}
                            onChange={handleChange}
                        />
                                <label className="block text-sm font-medium text-gray-700">Notes</label>
                        <TextInputForm
                            type="text"
                            name="notes"
                            value={agentData.notes || ""}
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
)
}


export default UpdateAgentModal;