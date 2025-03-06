"use client";

import React, { useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import Modal from '../ui/Modal';
import TextInputForm from '../ui/TextInput/TextInputForm';
import ComboBox from '../ui/ComboBox';
import * as Yup from 'yup';
import { useDispatch, useSelector  } from 'react-redux';
import { getCompanies } from '@/store/companySlice';

const clientSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone is required'),
  prefex: Yup.string().required('Prefix is required'),
  companyId: Yup.string().required('Company is required'),
});

const UpdateClientModal = ({ isOpen, onClose, onUpdateClient, initialData }) => {

    const dispatch = useDispatch();
  const { companies, loading } = useSelector((state) => state.companies);


  useEffect(() => {
    if (isOpen) {
      dispatch(getCompanies());
    }
  }, [isOpen, dispatch]);

  const handleSubmit = (values) => {
    onUpdateClient(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update Client">
      <Formik
        initialValues={{
          name: initialData.name || '',
          phone: initialData.phone || '',
          prefex: initialData.prefex || '',
          companyId: initialData.companyId || '',
        }}
        validationSchema={clientSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, setFieldValue }) => (
          <Form className="sm:flex sm:items-center px-12">
            <div className="mt-3 text-center sm:mt-0 sm:text-left">
              <div className="mt-2 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
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
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
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
                  <label className="block text-sm font-medium text-gray-700">Prefix</label>
                  <Field
                    name="prefex"
                    type="text"
                    component={TextInputForm}
                  />
                  {touched.prefex && errors.prefex && (
                    <div className="text-red-600 text-sm">{errors.prefex}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Company</label>
                  {loading ? (
                    <p>Loading companies...</p>
                  ) : (
                    <ComboBox
                      options={companies.map((company) => ({
                        label: company.name,
                        value: company.id,
                      }))}
                      onSelect={(companyId) => setFieldValue('companyId', companyId)}
                      placeholder="Select a company"
                      clearOnSelect={false}
                    />
                  )}
                  {touched.companyId && errors.companyId && (
                    <div className="text-red-600 text-sm">{errors.companyId}</div>
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

export default UpdateClientModal;