import React from 'react';
import Head from 'next/head';
import UpdateDetailsComponent from '@/components/UpdateDetailsComponent'; // Import the component
import UserPointsComponent from '@/components/UserPointsComponent';
import {UserProvider} from "@/utils/userContext";

function UserPage() {
    return (
        <UserProvider>
        <div>
            <Head>
                <title>Welcome Page</title>
            </Head>
            <UpdateDetailsComponent />
            <UserPointsComponent />

        </div>
        </UserProvider>
    );
}

export default UserPage;
