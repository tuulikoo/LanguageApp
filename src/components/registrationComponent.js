import { useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import styles from "../styles/RegistrationForm.module.scss";
import Image from "next/image";

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
        if (selectedAvatar) {
            data.avatarId = selectedAvatar.id;
        }

        try {
            setApiFeedback(null);
            setLoading(true);
            const response = await axios.post("/api/createUser", data);
            if (response.status === 200) {
                setApiFeedback({
                    type: "success",
                    message: "Käyttäjä luotu onnistuneesti!",
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
//TODO: errormessage if no avatar selected
    return (
        <form className={styles.formWrapper} onSubmit={handleSubmit(onSubmit)}>
            {[
                {
                    label: "Käyttäjänimi",
                    type: "text",
                    id: "username",
                    validation: { required: "Käyttäjänimi tarvitaan" },
                },
                {
                    label: "Sähköposti",
                    type: "email",
                    id: "email",
                    validation: {
                        required: "Sähköpostiosoite tarvitaan",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Sähköpostiosoite ei ole oikeassa muodossa",
                        },
                    },
                },
                {
                    label: "Etunimesi",
                    type: "text",
                    id: "firstName",
                    validation: { required: "Etunimi tarvitaan" },
                },
                {
                    label: "Salasana",
                    type: "password",
                    id: "password",
                    validation: {
                        required: "Salasana tarvitaan",
                        minLength: { 8: "Salasanan pitää olla vähintään 8 merkkiä" },
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
                        <p className={styles.inputError}>{errors[field.id].message}</p>
                    )}
                </div>
            ))}
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
                                        className={`${styles.avatarImage} ${selectedAvatar === avatar ? styles.selectedAvatar : ""
                                            }`}
                                    />
                                </div>
                            ))}
                        </div>
                        <button className={styles.closeModalButton} onClick={() => setIsModalOpen(false)}>Close</button>
                    </div>
                </div>
            )}
            <div className={styles.avatarButtoncontainer}>
                <button
                    className={styles.newUserButton}
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Ladataan..." : "Uusi käyttäjä"}
                </button>
                <button className={styles.selectAvatarButton} type="button" onClick={() => setIsModalOpen(true)}>
                    {selectedAvatar ? "Vaihda Kaveria" : "Valitse Kaverisi"}
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
