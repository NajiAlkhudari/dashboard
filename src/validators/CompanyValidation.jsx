import * as Yup from "yup";

const comapnySchema = Yup.object({
  name: Yup.string().required("Name is required"),
  phone : Yup.number().required("Phone is requried"),
  notes: Yup.string().required("Notes are required"),
  managerName: Yup.string().required("managerName is requried"),
  networkDomain : Yup.string().matches(/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/,
    "Network Domain must be a valid IP address (e.g. 10.10.10.10)") .required("Network Domain is required"),
  address: Yup.string().required("address is requried"),
});
export default comapnySchema;







