// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from "react-redux";
// import { useRouter } from 'next/navigation';
// import { login } from '@/store/authSlice';
// import Button from '@/components/ui/Button';
// import TextInput from '@/components/ui/TextInput/TextInput';
// import { ToastContainer, toast } from 'react-toastify';
// const LoginForm = () => {
//   const [userName, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const dispatch = useDispatch();
//   const router = useRouter();
//   const { loading, token, success, error } = useSelector((state) => state.auth);
//   const onSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login({ userName, password }));
//   };

//   useEffect(() => {
//     if (success) {
//       toast.success('Login Succsess', {
//         position: "top-center",
//         autoClose: 1000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//         });
//       router.push("/dashboard");
//     }
//     if (error) {
//       toast.error(`Login Failed : ${error}`, {
//         position: "top-center",
//         autoClose: 5000,
//         hideProgressBar: false,
//         closeOnClick: false,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: "colored",
//         });
//     }
//   }, [ error,success,token, router]);
//   return (
//     <>
//     <form className='space-y-2' onSubmit={onSubmit}>
//       <div>
//         <label className='text-sm'>UserName</label>
//         <TextInput
//           name="userName"
//           placeholder="userName"
//           error={error}
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//         />
//       </div>
//       <div>
//         <label className='text-sm'>Password</label>
//         <TextInput
//           type="password"
//           name="password"
//           placeholder="........"
//           error={error}
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//       </div>
//       <Button type="submit">
//         {loading ? 'Signing in...' : 'Sign In'}
//       </Button>
//     </form>
//           <ToastContainer />
//           </>
//   );
// };
// export default LoginForm;

"use client";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/store/authSlice";
import Button from "@/components/ui/Button";
import TextInput from "@/components/ui/TextInput/TextInput";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "@/validators/LoginValidation";
import { showErrorToast,showSuccessToast, ToastContainer,} from "@/utils/ToastNotifications";
const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, token, success, error } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = (data) => {
    dispatch(login({ userName: data.userName, password: data.password }));
  };
  useEffect(() => {
    if (success) {
      showSuccessToast("Login Success");
      router.push("/dashboard");
    }
    if (error) {
      showErrorToast(`Login Failed: ${error}`);
    }
  }, [error, success, token, router]);
  return (
    <>
      <form className="space-y-2" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="text-sm">UserName</label>
          <TextInput
            name="userName"
            placeholder="userName"
            register={register}
            error={errors.userName?.message}
          />
          {errors.userName && (
            <div className="text-red-500 text-xs">
              {errors.userName.message}
            </div>
          )}
        </div>
        <div>
          <label className="text-sm">Password</label>
          <TextInput
            type="password"
            name="password"
            placeholder="........"
            register={register}
            error={errors.password?.message}
          />
          {errors.password && (
            <div className="text-red-500 text-xs">
              {errors.password.message}
            </div>
          )}
        </div>
        <Button type="submit">{loading ? "loading..." : "Sign In"}</Button>
      </form>
      <ToastContainer />
    </>
  );
};
export default LoginForm;
