
//import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS if needed
import styles from  '../styles/Header.module.css'
import { UserProvider} from '@/utils/userContext';

function MyApp({ Component, pageProps }) {
    return (
        <UserProvider>
            <Component {...pageProps} />;
        </UserProvider>
        );
}

export default MyApp;
