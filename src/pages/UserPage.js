import React from "react";
import Head from "next/head";
import UpdateDetailsComponent from "@/components/UpdateDetailsComponent";
import UserPointsComponent from "@/components/UserPointsComponent";
import { UserProvider } from "@/utils/userContext";
import styles from "../styles/UserPage.module.scss";

function UserPage() {
    return (
        <UserProvider>
            <div className={styles.container}>
                <Head>
                    <title>UserPage</title>
                </Head>
                <div>
                    <UserPointsComponent />
                </div>
                <div className={styles.updateDetails}>
                    <UpdateDetailsComponent />
                </div>
            </div>
        </UserProvider>
    );
}

export default UserPage;
