import * as Yup from 'yup';

const clientSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  phone: Yup.string().required('Phone is required'),
  prefex: Yup.string().required('Prefix is required'),
  companyId: Yup.string().required('Company is required'),
});

export default clientSchema;