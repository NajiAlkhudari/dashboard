"use client";

import React, { useState, useEffect } from "react";
import Modal from "../../components/ui/Modal";
import TextInputForm from "../../components/ui/TextInput/TextInputForm";
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
    console.log("Sending new company data:", updatedData); 
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
        {({ errors, touched }) => (
          <Form className="px-12">
            <div className="space-y-4">
              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                <label className="min-w-[100px] text-sm font-medium ">
                Name
                  </label>
                  <div className="flex-grow">
                    <Field
                      name="name"
                      type="text"
                      component={TextInputForm}
                      className="w-full"
                    />
                  </div>
                </div>
                {touched.name && errors.name && (
                  <div className="text-red-600 text-sm pl-[110px]">
                    {errors.name}</div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                <label className="min-w-[100px] text-sm font-medium ">
                Phone
                  </label>
                  <div className="flex-grow">
                    <Field
                      name="phone"
                      type="text"
                      component={TextInputForm}
                      className="w-full"
                    />
                  </div>
                </div>
                {touched.phone && errors.phone && (
                  <div className="text-red-600 text-sm pl-[110px]">
                    {errors.phone}</div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                <label className="min-w-[100px] text-sm font-medium">
                Manager Name
                  </label>
                  <div className="flex-grow">
                    <Field
                      name="managerName"
                      type="text"
                      component={TextInputForm}
                      className="w-full"
                    />
                  </div>
                </div>
                {touched.managerName && errors.managerName && (
                  <div className="text-red-600 text-sm pl-[110px]">
                    {errors.managerName}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                <label className="min-w-[100px] text-sm font-medium ">
                Address
                  </label>
                  <div className="flex-grow">
                    <Field
                      name="address"
                      type="text"
                      component={TextInputForm}
                      className="w-full"
                    />
                  </div>
                </div>
                {touched.address && errors.address && (
                  <div className="text-red-600 text-sm pl-[110px]">{errors.address}</div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                <label className="min-w-[100px] text-sm font-medium ">
                Network Domain
                  </label>
                  <div className="flex-grow">
                    <Field
                      name="networkDomain"
                      type="text"
                      component={TextInputForm}
                      className="w-full"
                    />
                  </div>
                </div>
                {touched.networkDomain && errors.networkDomain && (
                  <div className="text-red-600 text-sm pl-[110px]">
                    {errors.networkDomain}
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                <label className="min-w-[100px] text-sm font-medium ">
                Notes
                  </label>
                  <div className="flex-grow">
                    <Field
                      name="notes"
                      type="text"
                      component={TextInputForm}
                      className="w-full"
                    />
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
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-8 py-2 bg-gray-950 text-base font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
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
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default AddCompany;
