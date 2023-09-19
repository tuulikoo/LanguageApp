import styles from "@/styles/Footer.module.scss";

const Footer = () => {
    return (
        <div className={styles.footer}>
        <footer id="contacts">
            <div className={styles.footer_container}>
                <a href="./" className={styles.logo}>
                    🄻🄰🄽🄶🅄🄰🄶🄴 🄰🄿🄿
                </a>
                <ul className={styles.address_list}>
                    <li className={styles.address_item}>
                        <a
                            className={styles.address_link}
                            href="https://www.google.com.ua/maps/place/%D0%B1%D1%83%D0%BB%D1%8C%D0%B2%D0%B0%D1%80+%D0%9B%D0%B5%D1%81%D1%96+%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%BA%D0%B8,+26,+%D0%9A%D0%B8%D1%97%D0%B2,+02000"
                            target="_blank"
                            rel="noopener noreferrer Nofollow"
                        >
                            Myllypurontie 1, 00920 Helsinki
                        </a>
                    </li>
                    <li className={styles.address_item}>
                        <a
                            className={styles.address_link}
                            href="mailto:info@example.com"
                            target="_blank"
                            rel="noopener noreferrer Nofollow"
                        >
                            info@example.com
                        </a>
                    </li>
                    <li className={styles.address_item}>
                        <a
                            className={styles.address_link}
                            href="tel:+38(099)111 11 11"
                            target="_blank"
                            rel="noopener noreferrer Nofollow"
                        >
                            +358 111 11 11
                        </a>
                    </li>
                </ul>

                {/*// <!-- subscribe -->*/}
                <div className={styles.subscription}>
                    <form className={styles.subscription_form}>
                        <input
                            className={styles.colortext}
                            type="email"
                            name="mail"
                            id="email"
                            autoComplete="on"
                            placeholder="E-mail"
                        />
                        <button className={styles.subscribe_btn}>
                            subscribe
                        </button>
                    </form>
                </div>
            </div>
        </footer>
    </div>)
}


export default Footer;