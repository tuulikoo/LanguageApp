import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/login.module.scss";
import {useEffect} from "react";

export default function Login() {
    const router = useRouter();
    const [loginError, setLoginError] = useState("");
    const [loginAttempts, setLoginAttempts] =useState(0)

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/api/login", data);
            if (response.status === 200) {
                setLoginError("");
                setLoginAttempts(0);
                router.push("/dashboard");
            } else {
                setLoginError("Väärä käyttäjänimi tai salasana");
                setLoginAttempts(prev => prev +1);
            }
        } catch (error) {
            setLoginError("Väärä käyttäjänimi tai salasana");
            setLoginAttempts(prev => prev +1);
        }
    };
    useEffect (() => {
        if (loginAttempts >=5){
        const timer =setTimeout(() => {
            setLoginError("");
        }, 6000);
        return () => clearTimeout(timer);
        }
    }, [loginAttempts]);

    return (
        <div className={styles.loginContainer}>
            <h2>Kirjaudu sisään</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={styles.inputGroup}>
                    <label htmlFor="username">Käyttäjänimi</label>
                    <input
                        type="text"
                        id="username"
                        {...register("username", { required: "Syötä Käyttäjänimi" })}
                        className={styles.formControl}
                    />
                    {errors.username && (
                        <div className={styles.formError}>{errors.username.message}</div>
                    )}
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="password">Salasana</label>
                    <input
                        type="password"
                        id="password"
                        {...register("password", { required: "Syötä salasanasi" })}
                        className={styles.formControl}
                    />
                    {errors.password && (
                        <div className={styles.formError}>{errors.password.message}</div>
                    )}
                </div>
                {loginError && (
                    <div className={styles.loginError}>
                    {loginAttempts >=5 ? "Oletko unohtanut salasanasi" : loginError}
                    </div>
                )}
                <button type="submit" className={styles.loginButton} disabled={isSubmitting}>
                    Kirjaudu
                </button>
            </form>
        </div>
    );
}

