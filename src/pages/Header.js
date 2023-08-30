import React from 'react';
import Link from 'next/link'; // Import the Link component
import { Navbar, Nav } from 'react-bootstrap';
import styles from '../styles/Header.module.css';

const Header = () => {
    return (
        <div className={styles.headerContainer}>
            <Navbar bg="dark" variant="dark" className={styles.customNavbar}>
                <Link href="/Tab1" passHref>
                    <Navbar.Brand className={styles.headerHeading}>LanguageApp</Navbar.Brand>
                </Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                            <Nav.Link as = "Tab1">
                             <Link href={"/Tab1"}>Tab1</Link>
                          </Nav.Link>
                          <Nav.Link as = "Tab2">
                             <Link href={"/Tab2"}>Tab2</Link>
                          </Nav.Link>
                          <Nav.Link as = "Tab3">
                             <Link href={"/Tab3"}>Tab3</Link>
                          </Nav.Link>
                          <Nav.Link as = "Login">
                            <Link href={"/Login"}>Login</Link>
                         </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        </div>
    );
};

export default Header;