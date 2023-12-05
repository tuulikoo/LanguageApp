import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/RegistrationForm.module.scss";
import { useTranslation } from "react-i18next";
/**
 * RegistrationForm is a component for user registration. It includes input fields for username, email, 
 * first name, password, and language selection. Users can also select an avatar from a modal window. 
 * The form handles submissions by making an API request to create a new user, displaying feedback based on the response.
 *
 * @component
 * @example
 * return (
 *   <RegistrationForm />
 * )
 *
 * @returns {React.ReactElement} A React component that renders a user registration form. 
 * It includes validation for each input field and provides visual feedback for form submission. 
 * The form also features language selection and avatar choice, enhancing user engagement and personalization.
 */


function RegistrationForm() {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [apiFeedback, setApiFeedback] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedLanguage, setSelectedLanguage] = useState("fi_FI");

    // Avatars for the modal
    const avatars = [
        { id: 1, src: "avatars/avatar1.png" },
        { id: 2, src: "avatars/avatar2.png" },
        { id: 3, src: "avatars/avatar3.png" },
        { id: 4, src: "avatars/avatar4.png" },
    ];

    const router = useRouter();

    const onSubmit = async (data) => {
        if (selectedAvatar) {
            data.avatarId = selectedAvatar.id;
        }

        // Set the language field based on the selectedLanguage state
        data.language = selectedLanguage;
        console.log("Kieli on" + data.language);

        try {
            setApiFeedback(null);
            setLoading(true);

            const response = await axios.post("/api/createUser", data);
            if (response.status === 200) {
                setApiFeedback({
                    type: "success",
                    message: t("userCreatedSuccessfully"),
                });
                setTimeout(() => {
                    router.push("/Login");
                }, 2000);
            }
        } catch (error) {
            setApiFeedback({
                type: "error",
                message: error.response.data.message,
            });
        } finally {
            setLoading(false);
        }
    };
    //TODO: errormessage if no avatar selected
    return (
        <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
            {[
                {
                    label: t("Username"),
                    type: "text",
                    id: "username",
                    validation: { required: t("RegUsernameRequired") },
                },
                {
                    label: t("RegEmail"),
                    type: "email",
                    id: "email",
                    validation: {
                        required: t("RegEmailRequired"),
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: t("RegEmailWrong"),
                        },
                    },
                },
                {
                    label: t("RegFirstname"),
                    type: "text",
                    id: "firstName",
                    validation: { required: t("RegFirstnameRequired") },
                },
                {
                    label: t("Password"),
                    type: "password",
                    id: "password",
                    validation: {
                        required: t("RegPasswordRequired"),
                        minLength: { 8: t("RegPasswordLength") },
                    },
                },
            ].map((field) => (
                <div key={field.id}>
                    <label>{field.label}</label>
                    <input
                        type={field.type}
                        id={field.id}
                        {...register(field.id, field.validation)}
                    />
                    {errors[field.id] && (
                        <p className={styles.inputError}>
                            {errors[field.id].message}
                        </p>
                    )}
                </div>
            ))}
            <div className={styles.languageSelection}>
                <label>{t("RegChooseLang")}</label>
                <div>
                    <input
                        type="radio"
                        name="language"
                        value="fi_FI"
                        id="language-fi"
                        {...register("language", {
                            required: "Select a language",
                        })}
                        checked={selectedLanguage === "fi_FI"}
                        onChange={() => setSelectedLanguage("fi_FI")}
                    />
                    <label htmlFor="language-fi">
                        <img
                            src="https://cdn.pixabay.com/photo/2020/02/28/02/21/finland-4886331_1280.png"
                            style={{ maxWidth: "60px" }}
                            alt="Finnish Flag"
                        />
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="language"
                        value="sv_SE"
                        id="language-se"
                        {...register("language", {
                            required: "Select a language",
                        })}
                        checked={selectedLanguage === "sv_SE"}
                        onChange={() => setSelectedLanguage("sv_SE")}
                    />
                    <label htmlFor="language-se">
                        <img
                            src="https://cdn.pixabay.com/photo/2014/02/03/20/48/flag-257636_1280.png"
                            style={{ maxWidth: "60px" }}
                            alt="Swedish Flag"
                        />
                    </label>
                </div>
                <div>
                    <input
                        type="radio"
                        name="language"
                        value="ja_JP"
                        id="language-jp"
                        {...register("language", {
                            required: "Select a language",
                        })}
                        checked={selectedLanguage === "ja_JP"}
                        onChange={() => setSelectedLanguage("ja_JP")}
                    />
                    <label htmlFor="language-jp">
                        <img
                            src="https://cdn.pixabay.com/photo/2012/04/13/12/23/flag-32177_1280.png"
                            style={{ maxWidth: "60px" }}
                            alt="Japanese Flag"
                        />
                    </label>
                </div>
            </div>
            <input
                type="hidden"
                validation={{ required: "Valitse avatar" }}
                {...register("avatarId")}
                value={selectedAvatar ? selectedAvatar.id : ""}
            />
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div className={styles.avatarsGrid}>
                            {avatars.map((avatar) => (
                                <div
                                    key={avatar.id}
                                    onClick={() => {
                                        setSelectedAvatar(avatar);
                                        setIsModalOpen(false);
                                    }}
                                >
                                    <img
                                        src={avatar.src}
                                        alt="Avatar"
                                        className={`${styles.avatarImage} ${selectedAvatar === avatar
                                            ? styles.selectedAvatar
                                            : ""
                                            }`}
                                    />
                                </div>
                            ))}
                        </div>
                        <button
                            className={styles.closeModalButton}
                            onClick={() => setIsModalOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
            <div className={styles.avatarButtoncontainer}>
                <button
                    className={styles.newUserButton}
                    type="submit"
                    disabled={loading}
                >
                    {loading ? t("Loading") : t("RegNewUser")}
                </button>
                <button
                    className={styles.selectAvatarButton}
                    type="button"
                    onClick={() => setIsModalOpen(true)}
                >
                    {selectedAvatar
                        ? t("RegChangeFriend")
                        : t("RegChooseFriend")}
                </button>
            </div>
            {apiFeedback && (
                <p
                    className={
                        apiFeedback.type === "success"
                            ? styles.successMessage
                            : styles.errorMessage
                    }
                >
                    {apiFeedback.message}
                </p>
            )}
        </form>
    );
}

export default RegistrationForm;
