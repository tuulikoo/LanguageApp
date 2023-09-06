import "../styles/globals.scss";
import Navbar from "../components/navbar";
import { UserProvider } from "../utils/userContext";

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <>
                <Navbar />
                <Component {...pageProps} />
            </>
        </UserProvider>
    );
}

export default MyApp;