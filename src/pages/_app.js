import "../styles/globals.scss";
import Navbar from "@/components/Navbar.1";
import { UserProvider } from "../utils/userContext";
import SessionTimer from "@/utils/SessionTimer";
import { I18nextProvider } from "react-i18next";
import i18n from "/i18n";

function MyApp({ Component, pageProps }) {
    return (
        <div className="appContainer">
            <UserProvider>
                <I18nextProvider i18n={i18n}>
                    <SessionTimer>
                        <>
                            <Navbar />
                            <Component {...pageProps} />
                        </>
                    </SessionTimer>
                </I18nextProvider>
            </UserProvider>
        </div>
    );
}

export default MyApp;
