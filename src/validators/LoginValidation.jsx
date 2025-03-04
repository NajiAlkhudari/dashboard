import * as Yup from 'yup';

const loginSchema = Yup.object({
    userName : Yup.string().required("userName is Required"),
    password : Yup.string().required("Password is Required")
});


export default loginSchema ;