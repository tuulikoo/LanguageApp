import React from "react";
import Head from "next/head";
import UpdateDetailsComponent from "@/components/UpdateDetailsComponent";
import UserPointsComponent from "@/components/UserPointsComponent";
import { UserProvider } from "@/utils/userContext";
import styles from "../styles/UserPage.module.scss";

import Game4Component from "@/components/Game4Component";
function UserPage() {
    return (
        <div className={styles.pageContainer}>
            <UserProvider>
                <div className={styles.container}>
                        <Head>
                    <title>UserPage</title>
                        </Head>
                    <div className={styles.updateDetails}>
                        <UpdateDetailsComponent />
                    </div>
                </div>
            </UserProvider>
        </div>
    );
}

export default UserPage;
