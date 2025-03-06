import * as Yup from "yup";

const agentSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone : Yup.number().required("Phone is requried"),
  notes: Yup.string().required("Notes are required"),
  percentage : Yup.string().required("percentage is required"),
});
export default agentSchema;







