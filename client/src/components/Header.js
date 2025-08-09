import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import SettingsIcon from "../components/setting-2.png";
import styles from "./Header.module.css";
import Logo from "./Logo.png";

function Header() {
  const { user, isAuthenticated, isLoading } = useAuth0();
  return (
    <header className={styles.header}>
      <div className={styles.topBar}>
        <div className={styles.branding}>
          <img src={Logo} alt="Logo" className={styles.logo} />
        </div>
        <div className={styles.titleContainer}>
          <h1 className={styles.title}>Collect & Swap</h1>
        </div>

        <div className={styles.iconGroup}>
          <Link to="/settings" aria-label="Setting" className={styles.iconLink}>
            <img
              src={SettingsIcon}
              alt="Settings"
              className={styles.SettingsIcon}
            />
          </Link>

          {!isLoading && isAuthenticated && user && (
            <Link
              to="/profile"
              aria-label="Profile"
              className={styles.iconLink}
            >
              <img
                src={user.picture}
                alt="Profile"
                className={styles.profileIcon}
              />
            </Link>
          )}
        </div>
      </div>

      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link to="/trade">Trade</Link>
          </li>
          <li>
            <Link to="/explore">Explore</Link>
          </li>
          <li>
            <Link to="/book-clubs">Book Clubs</Link>
          </li>
          <li>
            <Link to="/events">Events</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
