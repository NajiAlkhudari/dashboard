


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
    <Modal isOpen={isOpen} onClose={onClose} title="Add Agent">
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
          <Form className="sm:flex sm:items-center px-12">
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <div className="mt-2 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <Field
                    name="name"
                    type="text"
                    component={TextInputForm}
                  />
                  {touched.name && errors.name && (
                    <div className="text-red-600 text-sm">{errors.name}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Phone
                  </label>
                  <Field
                    name="phone"
                    type="text"
                    component={TextInputForm}
                  />
                  {touched.phone && errors.phone && (
                    <div className="text-red-600 text-sm">{errors.phone}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Percentage
                  </label>
                  <Field
                    name="percentage"
                    type="number"
                    component={TextInputForm}
                  />
                  {touched.percentage && errors.percentage && (
                    <div className="text-red-600 text-sm">
                      {errors.percentage}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Notes
                  </label>
                  <Field
                    name="notes"
                    type="text"
                    component={TextInputForm}
                  />
                  {touched.notes && errors.notes && (
                    <div className="text-red-600 text-sm">{errors.notes}</div>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-900 text-base font-medium text-white hover:bg-sky-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
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
