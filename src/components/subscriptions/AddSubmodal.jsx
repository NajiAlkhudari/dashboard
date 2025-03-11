"use client";
import React from "react";
import Modal from "../ui/Modal";
import TextInputForm from "../ui/TextInput/TextInputForm";
import { Formik, Form, Field } from "formik";
import React from 'react'
import subSchema from "@/validators/AddSubValidation";

const AddSubmodal = ({isOpen , onClose , onSubmitSub}) => {
  const handleSubmit =(values)=>{
    onSubmitSub(values);
  }
  return (
   <Modal isOpen={isOpen} onClose={onClose} title="new Subscription">
<Formik 
initialValues={{

}}
validationSchema={subSchema}
onSubmit={handleSubmit}
>
  {({errors , toutched})=>(
    <Form className="px-12">
      <div className="space-y-4">
        <div className="flex flex-col gap-1">
        <div className="md:flex items-center gap-1">
          
</div>
          </div>

      </div>
      
    </Form>
  )}

</Formik>
   </Modal>
  )
}

export default AddSubmodal
