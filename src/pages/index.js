import React from 'react';
import MainPage from './MainPage'
import {UserProvider} from "@/utils/userContext";
import MyApp from './_app'

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
