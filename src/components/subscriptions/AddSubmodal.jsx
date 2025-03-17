"use client";
import Modal from "../ui/Modal";
import TextInputForm from "../ui/TextInput/TextInputForm";
import { Formik, Form, Field, FieldArray } from "formik";
import React, { useEffect } from "react";
import subSchema from "@/validators/AddSubValidation";
import { useDispatch, useSelector } from "react-redux";
import { fetchClient } from "@/store/clientSlice";
import { fetchAgents } from "@/store/agentSlice";
import ComboBox from "../ui/ComboBox";

const AddSubModal = ({ isOpen, onClose, onSubmitSub }) => {
  const dispatch = useDispatch();
  const { clients, loading } = useSelector((state) => state.clients);
  const { agents, isLoading } = useSelector((state) => state.agents);

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchClient());
      dispatch(fetchAgents());
    }
  }, [isOpen, dispatch]);

  const handleSubmit = (values) => {
    onSubmitSub(values);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Subscription">
  <div className="max-h-[calc(100vh-100px)] overflow-y-auto p-6">
        <Formik
          initialValues={{
            startDate: "",
            endDate: "",
            costPermonth: 0,
            clientId: null,
            agentsDtos: [{ agentId: null, agentPercentage: 0, notes: "" }],
            notes: "",
          }}
          validationSchema={subSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, setFieldValue }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Start Date</label>
                  <Field name="startDate" type="date" component={TextInputForm} />
                  {touched.startDate && errors.startDate && (
                    <div className="text-red-600 text-sm">{errors.startDate}</div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">End Date</label>
                  <Field name="endDate" type="date" component={TextInputForm} />
                  {touched.endDate && errors.endDate && (
                    <div className="text-red-600 text-sm">{errors.endDate}</div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Cost Per Month</label>
                  <Field name="costPermonth" type="number" component={TextInputForm} />
                  {touched.costPermonth && errors.costPermonth && (
                    <div className="text-red-600 text-sm">{errors.costPermonth}</div>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Client</label>
                  {loading ? (
                    <p>Loading clients...</p>
                  ) : (
                    <ComboBox
                      options={clients.map((client) => ({
                        label: client.name,
                        value: client.id,
                      }))}
                      value={values.clientId}
                      onSelect={(clientId) => setFieldValue("clientId", clientId)}
                      placeholder="Select a client"
                    />
                  )}
                  {touched.clientId && errors.clientId && (
                    <div className="text-red-600 text-sm">{errors.clientId}</div>
                  )}
                </div>
              </div>

              <FieldArray name="agentsDtos">
                {({ push, remove }) => (
                  <div className="space-y-3">
                    {values.agentsDtos.map((agent, index) => (
                      <div key={index} className="border p-3 rounded-lg bg-background">
                        <div className="grid grid-cols-2 gap-4">

                          <div>
                            <label className="text-sm font-medium">Agent</label>
                            {isLoading ? (
                              <p>Loading agents...</p>
                            ) : (
                              <ComboBox
                                options={agents.map((agent) => ({
                                  label: agent.name,
                                  value: agent.id,
                                }))}
                                value={values.agentsDtos[index].agentId}
                                onSelect={(agentId) =>
                                  setFieldValue(`agentsDtos.${index}.agentId`, agentId)
                                }
                                placeholder="Select an agent"
                              />
                            )}
                            {touched.agentsDtos?.[index]?.agentId &&
                              errors.agentsDtos?.[index]?.agentId && (
                                <div className="text-red-600 text-sm">
                                  {errors.agentsDtos[index].agentId}
                                </div>
                              )}
                          </div>

                          <div>
                            <label className="text-sm font-medium">Agent Percentage</label>
                            <Field
                              name={`agentsDtos.${index}.agentPercentage`}
                              type="number"
                              component={TextInputForm}
                            />
                            {touched.agentsDtos?.[index]?.agentPercentage &&
                              errors.agentsDtos?.[index]?.agentPercentage && (
                                <div className="text-red-600 text-sm">
                                  {errors.agentsDtos[index].agentPercentage}
                                </div>
                              )}
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-600 text-sm mt-2"
                        >
                          Remove Agent
                        </button>
                      </div>
                    ))}

                    <button
                      type="button"
                      onClick={() => push({ agentId: null, agentPercentage: 0, notes: "" })}
                      className="text-blue-600 text-sm"
                    >
                      + Add Another Agent
                    </button>
                  </div>
                )}
              </FieldArray>

              <div>
                <label className="text-sm font-medium">Notes</label>
                <Field name="notes" type="text" component={TextInputForm} />
              </div>

              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
        <button
          type="submit"
          className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-12 py-2 bg-gray-950 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
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
      </div>
    </Modal>
  );
};

export default AddSubModal;
