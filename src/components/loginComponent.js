import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/router';
import styles from '../styles/login.module.scss';
import { useUser } from '../utils/userContext';
import { useTranslation } from 'react-i18next';

const MAX_LOGIN_ATTEMPTS = 5;
const TIMEOUT_DURATION = 6000;

export default function Login() {
    const { t } = useTranslation();
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
    const [loginError, setLoginError] = useState('');
    const [loginAttempts, setLoginAttempts] = useState(0);
    const { setUser } = useUser();
    const router = useRouter();
    const ERROR_MESSAGE = t("UsernameOrPWwrong")

    useEffect(() => {
        let timer;
        if (loginError && loginAttempts < MAX_LOGIN_ATTEMPTS) {
            timer = setTimeout(() => setLoginError(''), TIMEOUT_DURATION);
        }
        return () => clearTimeout(timer);
    }, [loginError, loginAttempts]);

    const handleLoginError = () => {
        setLoginError(ERROR_MESSAGE);
        setLoginAttempts((prev) => prev + 1);
    };

    const onSubmit = async (data) => {
        try {
            const response = await axios.post('/api/login', data);
            if (response.status === 200) {
                setUser(response.data.user);
                router.push('/MainPage');
            } else {
                handleLoginError();
            }
        } catch {
            handleLoginError();
        }
    };

    return (
        <div className={styles.loginContainer}>
            <h2 className={styles.loginHeader}>{t("SignIn")}</h2>
            <form onSubmit={handleSubmit(onSubmit)} className={loginError ? styles.shake : ''}>
                <div className={styles.inputGroup}>
                    <label htmlFor="login_username">{t("Username")}</label>
                    <input
                        type="text"
                        id="login_username"
                        {...register('username', { required: t("InsertUser") })}
                        className={errors.username ? styles.formControlError : styles.formControl}
                    />
                    {errors.username && <p className={styles.error}>{errors.username.message}</p>}
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="login_password">{t("Password")}</label>
                    <input
                        type="password"
                        id="login_password"
                        {...register('password', { required: t("InsertPassword") })}
                        className={errors.password ? styles.formControlError : styles.formControl}
                    />
                    {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                </div>
                {loginError && <div className={styles.error}>{loginError}</div>}
                <button type="submit" id='loginButton' disabled={isSubmitting} className={styles.loginButton}>
                    {t("Login")}
                </button>
            </form>
        </div>
    );
}

