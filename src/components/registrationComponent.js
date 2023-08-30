import { useForm } from "react-hook-form";
import { useState } from "react";

function RegistrationForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const [loading, setLoading] = useState(false);

    const onSubmit = (data) => {
        const saveUser = async () => {
            setLoading(true);
            try {
                const response = await axios.post("/api/register", data);
                console.log(response);
            } catch (error) {
                console.error(error);
            }
        };
        setLoading(false);
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

            <button type="submit">Register</button>
        </form>
    );
}

export default RegistrationForm;
