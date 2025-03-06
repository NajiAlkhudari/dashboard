import * as Yup from "yup";

const userUpdateSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  notes: Yup.string().required("Notes are required"),
  password: Yup.string(),
  userPermissions: Yup.array()
    .min(1, "At least one permission is required")
    .required("Permissions are required"),
});
export default userUpdateSchema;







