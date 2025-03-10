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
      router.push("/dashboard");
      showSuccessToast("Login Success");

    }
    if (error) {
      showErrorToast(`Login Failed: ${error}`);
    }
  }, [error, success, token, router]);
  return (
    <>
      <form className="space-y-6 " onSubmit={handleSubmit(onSubmit)}>
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
