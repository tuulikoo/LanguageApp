import { set, useForm } from "react-hook-form";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import {styles} from "next/dist/client/components/react-dev-overlay/internal/components/Toast";

function RegistrationForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const router = useRouter();

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            const response = await axios.post("/api/createUser", data);
            if (response.status === 200) {
                setSuccess("User created successfully");
                setTimeout(() => {
                    router.push("/Login");
                }, 2000);
            } else {
                setError("Something went wrong");
            }
        } catch (error) {
            setError(error.response.data.message);
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Username</label>
                <input
                    type="text"
                    id="username"
                    {...register("username", { required: "Username is required" })}
                />
                {errors.username && <p>{errors.username.message}</p>}
            </div>

            <div>
                <label>Email</label>
                <input
                    type="email"
                    id="email"
                    {...register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Invalid email address",
                        },
                    })}
                />
                {errors.email && <p>{errors.email.message}</p>}
            </div>
            <div>
                <label>First Name</label>
                <input
                    type="text"
                    id="firstName"
                    {...register("firstName", { required: "First Name is required" })}
                />
                {errors.firstName && <p>{errors.firstName.message}</p>}
                <div>
                    <label>Last Name</label>
                    <input
                        type="text"
                        id="lastName"
                        {...register("lastName", { required: "Last Name is required" })}
                    />
                    {errors.lastName && <p>{errors.lastName.message}</p>}
                </div>
            </div>

            <div>
                <label>Password</label>
                <input
                    type="password"
                    id="password"
                    {...register("password", { required: "Password is required" })}
                />
                {errors.password && <p>{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={loading}>
                {loading ? "Loading..." : "Register"}
            </button>
            {success && <p>{styles.successMessage}{success}</p>}
            {error && <p>{styles.errorMessage}{error}</p>}
        </form>
    );
}

export default RegistrationForm;
