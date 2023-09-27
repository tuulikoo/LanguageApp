import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import axios from "axios";
import {useRouter} from "next/router";
import styles from "../styles/login.module.scss";
import {useUser} from "../utils/userContext";

const MAX_LOGIN_ATTEMPTS = 5;
const ERROR_MESSAGE = "Väärä käyttäjänimi tai salasana";
const TIMEOUT_DURATION = 6000;

export default function Login() {
    const {register, handleSubmit, formState} = useForm();
    const {errors, isSubmitting} = formState;

    const [loginError, setLoginError] = useState("");
    const [loginAttempts, setLoginAttempts] = useState(0);
    const [successMessage, setSuccessMessage] = useState("");

    const {setUser} = useUser();
    const router = useRouter();

    const handleLoginError = () => {
        setSuccessMessage("");
        setLoginError(ERROR_MESSAGE);
        setLoginAttempts((prev) => prev + 1);
    };

    const onSubmit = async (data) => {
        try {
            const response = await axios.post("/api/login", data);

            if (response.status === 200) {
                const {user} = response.data;
                setUser(user); // set user data in the context
                router.push("/MainPage");
            } else {
                handleLoginError();
            }
        } catch {
            handleLoginError();
        }
    };

    useEffect(() => {
        if (loginAttempts >= MAX_LOGIN_ATTEMPTS) {
            const timer = setTimeout(() => setLoginError(""), TIMEOUT_DURATION);
            return () => clearTimeout(timer);
        }
    }, [loginAttempts]);

    return (
        <div className={styles.loginContainer}>
            <h2>Kirjaudu sisään</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Username Input */}
                <InputField
                    type="text"
                    label="Käyttäjänimi"
                    id="login_username"
                    register={register("username", {required: "Syötä Käyttäjänimi"})}
                    error={errors.username}
                />

                {/* Password Input */}
                <InputField
                    type="password"
                    label="Salasana"
                    id="login_password"
                    register={register("password", {required: "Syötä salasanasi"})}
                    error={errors.password}
                />

                {/* Login Error Display */}
                {loginError && (
                    <div className={styles.loginError}>
                        {loginAttempts >= MAX_LOGIN_ATTEMPTS
                            ? "Oletko unohtanut salasanasi?"
                            : loginError}
                    </div>
                )}
                {successMessage && (
                    <div className={styles.loginSuccess}>{successMessage}</div>
                )}

                {/* Login Button */}
                <button
                    id="login_loginButton"
                    type="submit"
                    className={styles.loginButton}
                    disabled={isSubmitting}
                >
                    Kirjaudu
                </button>
            </form>
        </div>
    );
}

function InputField({type, label, register, error, id}) {
    return (
        <div className={styles.inputGroup}>
            <label>{label}</label>
            <input type={type} {...register} id={id} className={styles.formControl}/>
            {error && <div className={styles.formError}>{error.message}</div>}
        </div>
    );
}
