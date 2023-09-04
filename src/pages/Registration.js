import RegistrationForm from "@/components/registrationComponent";
import React from "react";

const Registration = () => {
    const handleSubmit = (data) => {
        console.log(data);
    };

    return (
        <div>
            <RegistrationForm onSubmit={handleSubmit} />
        </div>
    );
};
export default Registration;
