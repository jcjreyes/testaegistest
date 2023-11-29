import React, { useRef, useState, useEffect } from "react";
import Avatar from "react-avatar";
import Burger from "@animated-burgers/burger-squeeze";
import "@animated-burgers/burger-squeeze/dist/styles.css";
import aegisLogo from "./assets/aegis-logo.png";
import uxsLogo from "./assets/uxs-logo.png";
import dashboard from "./assets/dashboard.png";
import logout from "./assets/logout.png";
import photoshoot from "./assets/photoshoot.png";
import writeup from "./assets/writeup.png";
import yearbook from "./assets/yearbook.png";
import { Link, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { Accounts } from "../../services";
import { useHistory } from "react-router-dom";

import {
    Nav,
    NavContainer,
    NavHeader,
    NavProfile,
    NavProfileContent,
    NavProfileName,
    NavProfilePosition,
    NavHeaderContent,
    NavMenu,
    NavItem,
    NavItemIcon,
    NavLink,
    NavLogos,
    AegisLogo,
    LogoContent,
    UXSLogo,
} from "./styles";

// let user = {
//     "first_name" : "Enzo",
//     "last_name" : "Pisig",
//     "position" : "Admin"
// }

let navLinks = [
    {
        name: "Dashboard",
        route: "/",
        icon: dashboard,
    },
    {
        name: "Photoshoot Enlistment",
        route: "/photoshoots",
        icon: photoshoot,
    },
    {
        name: "Writeups Submissions",
        route: "/writeups",
        icon: writeup,
    },
    {
        name: "Yearbook Revisions",
        route: "/yearbook",
        icon: yearbook,
    },
    {
        name: "Sign Out",
        route: "/logout",
        icon: logout,
    },
];

const Navbar = ({ slug, loggedIn }) => {
    const history = useHistory();
    const [navStatus, setNavStatus] = useState(false);
    const [user, setUser] = useState();
    const toggleMobileNavigation = () => setNavStatus(!navStatus);
    const isLoggedIn = loggedIn;

    useEffect(() => {
        // Fetch a user
        Accounts.me().then((data) => setUser(data));
    }, []);
    const location = useLocation();
    slug = location.pathname;

    return (
        <Nav>
            <NavContainer>
                <NavHeader>
                    {isLoggedIn && user ? (
                        <>
                            <NavProfile>
                                <Avatar
                                    name={user?.user?.first_name}
                                    size="52"
                                    round={true}
                                    color="#FDFEFF"
                                    fgColor="#001196"
                                />
                                <NavProfileContent>
                                    <NavProfileName>
                                        {`${user?.user?.first_name} ${user?.user?.last_name}`}
                                    </NavProfileName>
                                    <NavProfilePosition>
                                        Admin
                                    </NavProfilePosition>
                                </NavProfileContent>
                            </NavProfile>
                            <NavMenu>
                                {navLinks.map((link, index) => {
                                    return link.name == "Sign Out" ? (
                                        <Link
                                            to={link.route}
                                            style={{
                                                "text-decoration": "none",
                                            }}
                                            onClick={async () => {
                                                await Accounts.logout();
                                                // direct user back to login
                                                history.go("/");
                                            }}
                                        >
                                            <NavItem key={index}>
                                                <NavItemIcon src={link.icon} />
                                                <NavLink
                                                    to="/logout"
                                                    active={slug === link.route}
                                                >
                                                    {link.name}
                                                </NavLink>
                                            </NavItem>
                                        </Link>
                                    ) : (
                                        <Link
                                            to={link.route}
                                            style={{
                                                "text-decoration": "none",
                                            }}
                                        >
                                            <NavItem
                                                key={index}
                                                to={link.route}
                                                className={
                                                    slug === link.route
                                                        ? "activeNav"
                                                        : ""
                                                }
                                            >
                                                <NavItemIcon src={link.icon} />
                                                <NavLink to={link.route}>
                                                    {link.name}
                                                </NavLink>
                                            </NavItem>
                                        </Link>
                                    );
                                })}
                            </NavMenu>
                        </>
                    ) : (
                        <>
                            <NavHeaderContent>Welcome back.</NavHeaderContent>
                        </>
                    )}
                </NavHeader>
                <NavLogos>
                    <AegisLogo src={aegisLogo} />
                    <LogoContent>Passionately crafted by</LogoContent>
                    <UXSLogo src={uxsLogo} />
                </NavLogos>
            </NavContainer>

            {/* {navStatus && (
            <ul className={styles.navMobile}>
            <li className={styles.navItem}>
                <Link
                to="/"
                className={styles.navLink}
                onClick={toggleMobileNavigation}
                >
                Home
                </Link>
            </li>
            <li className={styles.navItem}>
                <Link
                to="/candidacy-submission"
                className={styles.navLink}
                onClick={toggleMobileNavigation}
                >
                Candidacy
                </Link>
            </li>
            <li className={styles.navItem}>
                <Link
                to="/memorandums"
                className={styles.navLink}
                onClick={toggleMobileNavigation}
                >
                Announcements
                </Link>
            </li>
            <li className={styles.navItem}>
                <Link
                to="/"
                className={styles.navLink}
                onClick={toggleMobileNavigation}
                >
                Contact Us
                </Link>
            </li>
            <li className={styles.navItem}>
                <Link
                to="/"
                className={styles.navLink}
                style={{ fontWeight: "600" }}
                onClick={toggleMobileNavigation}
                >
                Apply
                </Link>
            </li>
            </ul>
        )} */}
        </Nav>
    );
};

export default Navbar;
