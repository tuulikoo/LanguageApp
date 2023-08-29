import { useState } from "react";
import * as Yup from "yup";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import {useUser} from "../utils/userContext";
import { useContext } from "react";


const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username is required").min(4, "Username is too short - should be 4 chars minimum."),
    password: Yup.string().required("Password is required").min(8, "Password is too short - should be 8 chars minimum."),
});

const LoginPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [loginStatus, setLoginStatus] = useState(false);
    const [error, setError] = useState("");
    const [setUser, setToken] = useContext(UserContext);                                                                    

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await validationSchema.validate({ username, password });

            try {
                const { data } = await axios.post("/api/login", { username, password });
                if (data.message === "Login successful") {
                    setUser({ username: username });
                    setToken(data.token);
                    setLoginStatus('Logged in successfully');

                    setTimeout(() => {
                        router.replace("/");
                    }, 2000);
                }
            } catch (error) {
                setLoginStatus('Login failed');
                setError(error.response.data.message);
            }
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);


        const handleMouseEnter = () => {
            setIsHover(true);
        };

        return (
            <div
                className={styles.wrapper}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={() => setIsHover(false)}
                id={isHover === true ? styles.blur : null}
            >
                <form onSubmit={handleSubmit}>
                    <label>
                        <input
                            type="text"
                            value={username}
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </label>
                    {errors.username && <p>{errors.username}</p>}
                    <label>
                        <input
                            type="password"
                            value={password}
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                    {errors.password && <p>{errors.password}</p>}
                    <button type="submit">Log in</button>
                    {loginStatus && <p>{loginStatus}</p>}
                </form>
                <div className={styles.signUpLink}>
                    <Link title="Sign up"
                        href="/signup">
                        <p className={styles.signUpLinkText}>Sign up</p>
                    </Link>
                </div>
            </div>
        );
    };
};

export default LoginPage;



