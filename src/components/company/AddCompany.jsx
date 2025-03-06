"use client";

import React, { useState, useEffect } from "react";
import Modal from "../ui/Modal";
import TextInputForm from "../ui/TextInput/TextInputForm";
import comapnySchema from "@/validators/CompanyValidation";
import { Formik, Form, Field } from "formik";

const AddCompany = ({ isOpen, onClose, onSubmitCompany }) => {
  const handleSubmit = (values) => {
    const updatedData = {
      name: values.name,
      address: values.address,
      managerName: values.managerName,
      phone: values.phone,
      notes: values.notes,
      networkDomain: values.networkDomain,
    };
    console.log("Sending new company data:", updatedData); // Add this line
    onSubmitCompany(updatedData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Company">
      <Formik
        initialValues={{
          name: "",
          address: "",
          managerName: "",
          notes: "",
          networkDomain: "",
          phone: "",
        }}
        validationSchema={comapnySchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => {
          return (
            <Form className="sm:flex sm:items-center px-12">
              <div className="mt-3 text-center sm:mt-0 sm:text-left">
                <div className="mt-2 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <Field name="name" type="text" component={TextInputForm} />
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
                      Manager Name
                    </label>
                    <Field
                      name="managerName"
                      type="text"
                      component={TextInputForm}
                    />
                    {touched.managerName && errors.managerName && (
                      <div className="text-red-600 text-sm">
                        {errors.managerName}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <Field
                      name="address"
                      type="text"
                      component={TextInputForm}
                    />
                    {touched.address && errors.address && (
                      <div className="text-red-600 text-sm">
                        {errors.address}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Network Domain
                    </label>
                    <Field
                      name="networkDomain"
                      type="text"
                      component={TextInputForm}
                    />
                    {touched.networkDomain && errors.networkDomain && (
                      <div className="text-red-600 text-sm">
                        {errors.networkDomain}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Notes
                    </label>
                    <Field name="notes" type="text" component={TextInputForm} />
                    {touched.notes && errors.notes && (
                      <div className="text-red-600 text-sm">{errors.notes}</div>
                    )}
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-900 text-base font-medium text-white hover:bg-sky-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
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
              </div>
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

export default AddCompany;
