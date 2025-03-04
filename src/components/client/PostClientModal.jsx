

import React, { useState, useEffect } from 'react';

import { fetchCompanies } from '@/Services/companyServices';
import Modal from '../ui/Modal';
import TextInputForm from '../ui/TextInput/TextInputForm';
import ComboBox from '../ui/ComboBox';

const PostClientModal = ({ isOpen, onClose, onUpdate }) => {
    const [clientData, setClientData] = useState({
        name: "",
        phone: "",
        prefex: "",
        companyId: "", 
    });

    const [companies, setCompanies] = useState([]); 
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const loadCompanies = async () => {
            try {
                const companiesData = await fetchCompanies(); 
                if (companiesData) {
                    setCompanies(
                        companiesData.map((company) => ({
                            label: company.name, 
                            value: company.id,  
                        }))
                    );
                }
            } catch (error) {
                console.error("Error fetching companies:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (isOpen) {
            loadCompanies();
        }
    }, [isOpen]);

    const handleChange = (e) => {
        setClientData({
            ...clientData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCompanySelect = (companyId) => {
        setClientData({
            ...clientData,
            companyId: companyId,
        });
    };

    const handleSubmit = () => {
        const updateData = {
            name: clientData.name,
            phone: clientData.phone,
            prefex: clientData.prefex,
            companyId: clientData.companyId,
        };
        onUpdate(updateData);
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add Client">
            <div className="sm:flex sm:items-center px-12">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                    <div className="mt-2 space-y-4">
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <TextInputForm
                            type="text"
                            name="name"
                            value={clientData.name}
                            onChange={handleChange}
                        />

                        <label className="block text-sm font-medium text-gray-700">Phone</label>
                        <TextInputForm
                            type="text"
                            name="phone"
                            value={clientData.phone}
                            onChange={handleChange}
                        />

                        <label className="block text-sm font-medium text-gray-700">Prefix</label>
                        <TextInputForm
                            type="text"
                            name="prefex"
                            value={clientData.prefex}
                            onChange={handleChange}
                        />

                        <label className="block text-sm font-medium text-gray-700">Company</label>
                        {isLoading ? (
                            <p>Loading companies...</p>
                        ) : (
                            <ComboBox
                                options={companies}
                                onSelect={handleCompanySelect}
                                placeholder="Select a company"
                                clearOnSelect={false}
                            />
                        )}
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

export default PostClientModal;