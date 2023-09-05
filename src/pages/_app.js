
//import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS if needed

function MyApp({ Component, pageProps }) {
    return (
        <div className="app">
            <main className="container">
                <Component {...pageProps} />
            </main>
            <footer>
                <p>Copyright © 2023</p>
            </footer>
        </div>
    );
}

export default MyApp;
