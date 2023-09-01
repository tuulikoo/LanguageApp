import React from 'react';
import Head from 'next/head';
import UpdateDetailsComponent from '@/components/updateDetailsComponent'; // Import the component

function UserPage() {
    return (
        <div>
            <Head>
                <title>Welcome Page</title>
            </Head>
            <UpdateDetailsComponent /> {/* Use the imported component */}
        </div>
    );
}

export default UserPage;
