import { useState } from "react";
import FormComponent from "../components/loginComponent";

const login = () => {

    const [formdata, setFormdata] = useState({});
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const handleFormData = (data) => {
        setFormdata(data);
    };

    return (
        <div className="login">
            <h1>Login</h1>
            <FormComponent onSubmit={handleFormData} />
        </div>
    );
};
export default login;


