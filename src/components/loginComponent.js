import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";


const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

export default function Login() {
  const router = useRouter();
  const [loginError, setLoginError] = useState("");

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axios.post("/api/login", values);
        if (response.status === 200) {
          // Redirect to dashboard page after successful login

          router.push("/dashboard");
        } else {
          setLoginError("Invalid username or password");
        }
      } catch (error) {
        setLoginError("An error occurred during login");
      }
    },
  });

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="username" {...formik.getFieldProps("username")} />
          {formik.touched.username && formik.errors.username && (
            <div>{formik.errors.username}</div>
          )}
        </div>
        <div>
          <label>Password:</label>
          <input type="password" {...formik.getFieldProps("password")} />
          {formik.touched.password && formik.errors.password && (
            <div>{formik.errors.password}</div>
          )}
        </div>
        {loginError && <div>{loginError}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
