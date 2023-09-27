import "../styles/globals.scss";
import Navbar from "../components/Navbar";
import { UserProvider } from "../utils/userContext";
import SessionTimer from "@/utils/SessionTimer";
import NotificationWrapper from "@/components/NotificationWrapper";


function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <SessionTimer>
                <NotificationWrapper>
                    <>
                        <Navbar />
                        <Component {...pageProps} />
                    </>
                </NotificationWrapper>
            </SessionTimer>
        </UserProvider>
    );
}

export default MyApp;
