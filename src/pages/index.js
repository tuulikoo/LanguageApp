import React from 'react';
import MainPage from './MainPage'
import {UserProvider} from "@/utils/userContext";


const IndexPage = () => {
    return (
        <UserProvider>
        <div>
            <MainPage/>
        </div>
        </UserProvider>
    );
};

export default IndexPage;
