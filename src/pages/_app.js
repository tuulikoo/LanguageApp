import "../styles/globals.scss";
import Navbar from "@/components/Navbar";
import { UserProvider } from "../utils/userContext";
import SessionTimer from "@/utils/SessionTimer";
import { I18nextProvider } from "react-i18next";
import i18n from "/i18n";

function MyApp({ Component, pageProps }) {
    return (
        <div className="appContainer">
            <link
                rel="icon"
                href="/icon.svg"
                type="image/svg"
                sizes="<generated>x<generated"
            />
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
