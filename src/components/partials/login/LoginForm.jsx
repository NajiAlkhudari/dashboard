"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { login } from "@/store/authSlice";
import Button from "@/components/ui/Button";
import { Formik, Field, Form, ErrorMessage } from "formik";
import loginSchema from "@/validators/LoginValidation";
import { showErrorToast, showSuccessToast, ToastContainer } from "@/utils/ToastNotifications";
import TextInput from "@/components/ui/TextInput/TextInput";

const LoginForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { loading, success, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success) {
      router.push("/dashboard");
      showSuccessToast("Login Success");
    }
    if (error) {
      showErrorToast(`Login Failed: ${error}`);
    }
  }, [error, success, router]);

  return (
    <>
      <Formik
        initialValues={{ userName: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values) => {
          dispatch(login (values));
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label className="text-sm">UserName</label>
              <Field
                type="text"
                name="userName"
                placeholder="userName"
                className="input"
                component={TextInput}
              />
              <ErrorMessage name="userName" component="div" className="text-red-500 text-xs" />
            </div>
            <div>
              <label className="text-sm">Password</label>
              <Field
                type="password"
                name="password"
                placeholder="........"
                className="input"
                component={TextInput}

              />
              <ErrorMessage name="password" component="div" className="text-red-500 text-xs" />
            </div>
            <Button type="submit" disabled={isSubmitting}>
              {loading ? "loading..." : "Sign In"}
            </Button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </>
  );
};

export default LoginForm;
