import 'bootstrap/dist/css/bootstrap.css';
import styles from '../styles/Tab1.module.css'

const Tab1 = () => {
    return <>
        <div className={styles.navbar_container}>
            <nav className={styles.navbar}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <a href="./Header.js" className={styles.logo_link} title="click going to the main page">
                    <img className='header' id='header' src='data:image/png;base64,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' alt="logo"/>
                </a>
                <div className={styles.nav_container} >
                    <ul className={styles.navbar_list}>
                        <li className="nav-item">
                            <a className={styles.nav_link} href="./Header">🄷🄾🄼🄴</a>
                        </li>
                        <li className="nav-item" >
                            <a className={styles.nav_link} href="./Tab1">𝟭𝘀𝘁 𝗹𝗲𝘃𝗲𝗹</a>
                        </li>

                        <li className="nav-item">
                            <a className={styles.nav_link} href="./Tab2">𝟮𝗻𝗱 𝗹𝗲𝘃𝗲𝗹</a>
                        </li>

                        <li className="nav-item">
                            <a className={styles.nav_link} href="./Tab3">𝟯𝗿𝗱 𝗹𝗲𝘃𝗲𝗹</a>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>

        {/*HERO*/}
        <div className={styles.hero_container}>
            <img className={styles.hero_img} src="https://thumbs.dreamstime.com/b/superhero-boy-cartoon-character-super-hero-isolated-vector-illustration-102869654.jpg"/>
            <img className={styles.hero_img2} src="https://img.freepik.com/premium-vector/boy-superhero-costume-cheerful-little-boy-like-super-hero-cute-cartoon-character-stock-vector-illustration-white-background_88465-3243.jpg?w=2000"/>
            <img className={styles.hero_img3} src="https://img.freepik.com/premium-vector/cute-super-hero-kid-girl-cartoon-character-flying-vector-hand-drawn-illustration_20412-3177.jpg?w=2000"/>

            <h1 className={styles.hero_title}>🄻🄴🄰🅁🄽🄸🄽🄶 <br/><span> 🄸🅂 🄿🄾🅆🄴🅁</span></h1>
        </div>

        <div className={styles.levels_container}>
            <h1>🄻🄴🅅🄴🄻🅂 🅆🄴 🄷🄰🅅🄴</h1>
            <ul className={styles.levels_list}>
                <li className={styles.levels_item}>
                    <p>Tab 1</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem ea facilis fugiat laboriosam.</p>
                </li>
                <li className={styles.levels_item}>
                    <p>Tab 2</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem ea facilis fugiat laboriosam.</p>
                </li>
                <li className={styles.levels_item}>
                    <p>Tab 3</p>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet autem ea facilis fugiat laboriosam.</p>
                </li>
            </ul>
        </div>
        <div className={styles.carousel_container}>
            <h1>🅁🄴🅅🄸🄴🅆🅂</h1>
        </div>

        <div className={styles.footer}>
            <footer id="contacts" >
                <div className={styles.footer_container}>

                    <ul className={styles.address_list}>
                        <a href="./" className={styles.logo}>🄻🄰🄽🄶🅄🄰🄶🄴 🄰🄿🄿</a>

                        <li className={styles.address_item}><a className={styles.address_link}
                                                        href="https://www.google.com.ua/maps/place/%D0%B1%D1%83%D0%BB%D1%8C%D0%B2%D0%B0%D1%80+%D0%9B%D0%B5%D1%81%D1%96+%D0%A3%D0%BA%D1%80%D0%B0%D1%97%D0%BD%D0%BA%D0%B8,+26,+%D0%9A%D0%B8%D1%97%D0%B2,+02000"
                                                        target="_blank" rel="noopener noreferrer Nofollow">Myllypurontie 1, 00920 Helsinki</a></li>
                        <li className={styles.address_item}><a className={styles.address_link} href="mailto:info@example.com"
                                                        target="_blank"
                                                        rel="noopener noreferrer Nofollow">info@example.com</a></li>
                        <li className={styles.address_item}><a className={styles.address_link} href="tel:+38(099)111 11 11"
                                                        target="_blank"
                                                        rel="noopener noreferrer Nofollow">+358 111 11 11</a></li>
                    </ul>

                    {/*// <!-- join us -->*/}
                    <div className="subscribe-section">
                        <p className={styles.footer_title}>join us</p>
                        <div className="social-section-footer">
                            {/*<ul className="social-list-footer">*/}
                            {/*    <li className="social-item-footer">*/}
                            {/*        <a className="social-link-footer" href="www.instagram.com" target="_blank"*/}
                            {/*           rel="noopener noreferrer Nofollow">*/}
                            {/*            <svg className="social-icon-footer" width="20" height="20">*/}
                            {/*                <use href="./images/SVG/symbol-defs.svg#icon-instagram"></use>*/}
                            {/*            </svg>*/}
                            {/*        </a>*/}
                            {/*    </li>*/}
                            {/*    <li className="social-item-footer">*/}
                            {/*        <a className="social-link-footer" href="www.twitter.com" target="_blank"*/}
                            {/*           rel="noopener noreferrer Nofollow">*/}
                            {/*            <svg className="social-icon-footer" width="20" height="20">*/}
                            {/*                <use href="./images/SVG/symbol-defs.svg#icon-twitter"></use>*/}
                            {/*            </svg>*/}
                            {/*        </a>*/}
                            {/*    </li>*/}
                            {/*    <li className="social-item-footer">*/}
                            {/*        <a className="social-link-footer" href="www.facebook.com" target="_blank"*/}
                            {/*           rel="noopener noreferrer Nofollow">*/}
                            {/*            <svg className="social-icon-footer" width="20" height="20">*/}
                            {/*                <use href="./images/SVG/symbol-defs.svg#icon-facebook"></use>*/}
                            {/*            </svg>*/}
                            {/*        </a>*/}
                            {/*    </li>*/}
                            {/*    <li className="social-item-footer">*/}
                            {/*        <a className="social-link-footer" href="www.linkedin.com" target="_blank"*/}
                            {/*           rel="noopener noreferrer Nofollow">*/}
                            {/*            <svg className="social-icon-footer" width="20" height="20">*/}
                            {/*                <use href="./images/SVG/symbol-defs.svg#icon-linkedin"></use>*/}
                            {/*            </svg>*/}
                            {/*        </a>*/}
                            {/*    </li>*/}
                            {/*</ul>*/}
                        </div>
                    </div>

                    {/*// <!-- subscribe -->*/}
                    <div className={styles.subscription}>
                        <strong>subscribe</strong>

                        <form className={styles.subscription_form}>
                            <input className={styles.colortext} type="email" name="mail" id="email" autoComplete="on"
                                   placeholder="E-mail"/>

                            <button className={styles.hero_btn}>
                                subscribe &#8594;
                            </button>

                        </form>
                    </div>
                </div>

            </footer>

        </div>

    </>
};

export default Tab1;
