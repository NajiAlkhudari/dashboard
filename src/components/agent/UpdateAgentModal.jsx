


"use client";

import React from "react";
import Modal from "../ui/Modal";
import TextInputForm from "../ui/TextInput/TextInputForm";
import { Formik, Form, Field } from "formik";
import agentSchema from "@/validators/AgentValidation";
const UpdateAgentModal = ({ isOpen, onClose,  onUpdateAgent , initialData}) => {

  const handleSubmit = (values) => {
    onUpdateAgent(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Agent">
      <Formik
        initialValues={{
            name : initialData.name || '',
                    phone : initialData.phone || '',
                 percentage : initialData.percentage || '',
                     notes : initialData.notes || '',
        }}
        validationSchema={agentSchema} 
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
           <Form className="px-12">
           <div className="space-y-4">
             <div className="flex flex-col gap-1">
               <div className="flex items-center gap-1">
                 <label className="min-w-[100px] text-sm font-medium text-gray-900">Name</label>
                 <div className="flex-grow">
                   <Field name="name" type="text" component={TextInputForm} className="w-full" />
                 </div>
               </div>
               {touched.name && errors.name && (
                 <div className="text-red-600 text-sm pl-[110px]">{errors.name}</div>
               )}
             </div>
         
             <div className="flex flex-col gap-1">
               <div className="flex items-center gap-1">
                 <label className="min-w-[100px] text-sm font-medium text-gray-950">Phone</label>
                 <div className="flex-grow">
                   <Field name="phone" type="text" component={TextInputForm} className="w-full" />
                 </div>
               </div>
               {touched.phone && errors.phone && (
                 <div className="text-red-600 text-sm pl-[110px]">{errors.phone}</div>
               )}
             </div>
         
             <div className="flex flex-col gap-1">
               <div className="flex items-center gap-1">
                 <label className="min-w-[100px] text-sm font-medium text-gray-950">Percentage</label>
                 <div className="flex-grow">
                   <Field name="percentage" type="number" component={TextInputForm} className="w-full" />
                 </div>
               </div>
               {touched.percentage && errors.percentage && (
                 <div className="text-red-600 text-sm pl-[110px]">{errors.percentage}</div>
               )}
             </div>
         
             <div className="flex flex-col gap-1">
               <div className="flex items-center gap-1">
                 <label className="min-w-[100px] text-sm font-medium text-gray-950">Notes</label>
                 <div className="flex-grow">
                   <Field name="notes" type="text" component={TextInputForm} className="w-full" />
                 </div>
               </div>
               {touched.notes && errors.notes && (
                 <div className="text-red-600 text-sm pl-[110px]">{errors.notes}</div>
               )}
             </div>
           </div>
         
           <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
             <button
               type="submit"
               className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-12 py-2 bg-gray-950 text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
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
         </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default UpdateAgentModal;
