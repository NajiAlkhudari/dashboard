"use client";
import React from "react";
import Modal from "@/components/ui/Modal";
import ComboBox from "../ui/ComboBox";
import { permissionOptions } from "@/utils/permissionOptions";
import TextInputForm from "../ui/TextInput/TextInputForm";
import { Formik, Form, Field } from "formik";
import userUpdateSchema from "@/validators/UpdateUserSchema";
const UpdateUserModal = ({ isOpen, onClose, onUpdate, initialData }) => {

  
  const handleSubmit = (values) => {
    const totalPermissions = values.userPermissions.reduce(
      (sum, perm) => sum + parseInt(perm, 10),  0
    );
    const updatedData = {
      name: values.name,
      notes: values.notes,
      password:values.password || '', 
      userPermissions: totalPermissions,
    };
    onUpdate(updatedData);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Update User">
      <Formik
        initialValues={{
          name: initialData?.name || "",
          notes: initialData?.notes || "",
          password: "", 
          userPermissions: Array.isArray(initialData?.userPermissions)
            ? initialData.userPermissions.map((perm) => perm.toString())
            : initialData?.userPermissions
            ? [initialData.userPermissions.toString()]
            : [],
        }}
        validationSchema={userUpdateSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, errors, touched }) => (
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

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Field
                    name="password"
                    type="password"
                    component={TextInputForm}
                    placeholder="Leave blank to keep current password"
                  />
                  {touched.password && errors.password && (
                    <div className="text-red-600 text-sm">{errors.password}</div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Permissions
                  </label>
                  <ComboBox
                    options={permissionOptions}
                    placeholder="Select Permissions"
                    onSelect={(selectedPermission) => {
                      if (!values.userPermissions.includes(selectedPermission)) {
                        setFieldValue("userPermissions", [
                          ...values.userPermissions,
                          selectedPermission,
                        ]);
                      }
                    }}
                    clearOnSelect={true}
                  />
                  <div className="flex flex-wrap gap-2 mt-2">
                    {values.userPermissions.map((perm) => {
                      const label =
                        permissionOptions.find((p) => p.value === perm)?.label ||
                        perm;
                      return (
                        <span
                          key={perm}
                          className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md flex items-center"
                        >
                          {label}
                          <button
                            type="button"
                            onClick={() =>
                              setFieldValue(
                                "userPermissions",
                                values.userPermissions.filter((p) => p !== perm)
                              )
                            }
                            className="ml-2 text-red-500"
                          >
                            ×
                          </button>
                        </span>
                      );
                    })}
                  </div>
                  {touched.userPermissions && errors.userPermissions && (
                    <div className="text-red-600 text-sm">
                      {errors.userPermissions}
                    </div>
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

export default UpdateUserModal;