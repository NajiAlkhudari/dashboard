"use client";

import React, { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import Modal from '../../components/ui/Modal';
import TextInputForm from '../../components/ui/TextInput/TextInputForm';
import ComboBox from '../../components/ui/ComboBox';
import clientSchema from '@/validators/ClientValidation';
import { getCompanies } from '@/store/companySlice';
import { useDispatch, useSelector } from 'react-redux';

const PostClientModal = ({ isOpen, onClose, onSubmitClient }) => {
  const dispatch = useDispatch();
  const { companies, loading } = useSelector((state) => state.companies);

  useEffect(() => {
    if (isOpen) {
      dispatch(getCompanies());
    }
  }, [isOpen, dispatch]);

  const handleSubmit = (values) => {
    onSubmitClient(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Client">
      <Formik
        initialValues={{
          name: '',
          phone: '',
          prefex: '',
          companyId: null,
        }}
        validationSchema={clientSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue , values }) => (
         <Form className="px-12">
                  <div className="space-y-4">
                    <div className="flex flex-col gap-1">
                      <div className="md:flex items-center gap-1">
                        <label className="min-w-[100px] text-sm font-medium">Name</label>
                  <Field
                    name="name"
                    type="text"
                    component={TextInputForm}
                    className="w-full"
                  />
                </div>
                {touched.name && errors.name && (
                  <div className="text-red-600 text-sm pl-[110px]">{errors.name}</div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                  <label className="min-w-[100px] text-sm font-medium ">Phone</label>
                  <Field
                    name="phone"
                    type="text"
                    component={TextInputForm}
                    className="w-full"
                  />
                </div>
                {touched.phone && errors.phone && (
                  <div className="text-red-600 text-sm pl-[110px]">{errors.phone}</div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                  <label className="min-w-[100px] text-sm font-medium">Prefix</label>
                  <Field
                    name="prefex"
                    type="text"
                    component={TextInputForm}
                    className="w-full"
                  />
                </div>
                {touched.prefex && errors.prefex && (
                  <div className="text-red-600 text-sm pl-[110px]">{errors.prefex}</div>
                )}
              </div>

              <div className="flex flex-col gap-1">
                <div className="md:flex items-center gap-1">
                  <label className="min-w-[100px] text-sm font-medium">Company</label>
                  {loading ? (
                    <p>Loading companies...</p>
                  ) : (
                    <ComboBox
                      options={companies.map((company) => ({
                        label: company.name,
                        value: company.id,
                      }))}
                      value={values.companyId} 
                      onSelect={(companyId) => setFieldValue('companyId', companyId)}
                      placeholder="Select a company"
                      clearOnSelect={false}
                    />
                  )}
                </div>
                {touched.companyId && errors.companyId && (
                  <div className="text-red-600 text-sm pl-[110px]">{errors.companyId}</div>
                )}
              </div>
            </div>

            <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-12 py-2 bg-gray-950 text-base font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
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

export default PostClientModal;
