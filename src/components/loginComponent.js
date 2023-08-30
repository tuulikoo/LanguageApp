import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/login.module.scss";



export default function Login() {
    const router = useRouter();
    const [loginError, setLoginError] = useState("");
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (values) => {
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
    };

    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        {...register("username", { required: "Username is required" })}
                        className={styles.formControl}
                    />
                    {errors.username && (
                        <div className={styles.formError}>{errors.username.message}</div>
                    )}
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        {...register("password", { required: "Password is required" })}
                        className={styles.formControl}
                    />
                    {errors.password && (
                        <div className={styles.formError}>{errors.password.message}</div>
                    )}
                </div>
                {loginError && (
                    <div className={styles.loginError}>{loginError}</div>
                )}
                <button type="submit" className={styles.loginButton} disabled={isSubmitting}>
                    Login
                </button>
            </form>
        </div>
    );
}
