import React from 'react';
import Head from 'next/head';
import UpdateDetailsComponent from '@/components/UpdateDetailsComponent'; // Import the component
import UserPointsComponent from '@/components/UserPointsComponent';

function UserPage() {
    return (
        <div>
            <Head>
                <title>Welcome Page</title>
            </Head>
            <UpdateDetailsComponent />
            <UserPointsComponent />

        </div>
    );
}

export default UserPage;
