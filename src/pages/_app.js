import "../styles/globals.scss";
import Navbar from "../components/navbar";
import { UserProvider } from "../utils/userContext";
import SessionTimer from "@/utils/SessionTimer";
function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <SessionTimer>
                <>
                    <Navbar />
                    <Component {...pageProps} />
                </>
            </SessionTimer>
        </UserProvider>
    );
}

export default MyApp;
