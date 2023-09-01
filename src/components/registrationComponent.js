import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/RegistrationForm.module.scss";

function RegistrationForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const [loading, setLoading] = useState(false);
    const [apiFeedback, setApiFeedback] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Avatars for the modal
    const avatars = [
        { id: 1, src: "avatars/small_giraffe.png" },
        //TODO: Add more avatars
        // { id: 2, src: "/avatars/avatar2.png" },
        // { id: 3, src: "/avatars/avatar3.png" },
        // { id: 4, src: "/avatars/avatar4.png" }
    ];

    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            setApiFeedback(null);
            setLoading(true);
            const response = await axios.post("/api/createUser", data);
            if (response.status === 200) {
                setApiFeedback({
                    type: "success",
                    message: "User created successfully",
                });
                setTimeout(() => {
                    router.push("/Login");
                }, 2000);
            }
        } catch (error) {
            setApiFeedback({ type: "error", message: error.response.data.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {[
                {
                    label: "Username",
                    type: "text",
                    id: "username",
                    validation: { required: "Username is required" },
                },
                {
                    label: "Email",
                    type: "email",
                    id: "email",
                    validation: {
                        required: "Email is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email address",
                        },
                    },
                },
                {
                    label: "First Name",
                    type: "text",
                    id: "firstName",
                    validation: { required: "First Name is required" },
                },
                {
                    label: "Last Name",
                    type: "text",
                    id: "lastName",
                    validation: { required: "Last Name is required" },
                },
                {
                    label: "Password",
                    type: "password",
                    id: "password",
                    validation: { required: "Password is required" },
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
                        <p className={styles.inputError}>{errors[field.id].message}</p>
                    )}
                </div>
            ))}

            <button type="button" onClick={() => setIsModalOpen(true)}>
                Select Avatar
            </button>

            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <h2>Select an Avatar</h2>
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
                                        className={
                                            selectedAvatar === avatar ? styles.selectedAvatar : ""
                                        }
                                    />
                                </div>
                            ))}
                        </div>
                        <button onClick={() => setIsModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}

            <button
                className={styles.newUserButton}
                type="submit"
                disabled={loading}
            >
                {loading ? "Loading..." : "New User"}
            </button>

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
