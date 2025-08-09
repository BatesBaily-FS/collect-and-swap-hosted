import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Header from "../components/Header";
import LogoutButton from "../components/LogoutButton";
import styles from "./SettingsPage.module.css";
import settingsIcon from "../components/setting-2.png";

const SettingsPage = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) return <p>Loading your profile...</p>;

  if (!isAuthenticated) return <p>Your not logged in.</p>;

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.profileInfo}>
        <img src={user.picture} className={styles.avatar} alt="User Avatar" />
        <p className={styles.userName}>
          <strong>{user.name}</strong>
        </p>
      </div>
      <main className={styles.settingsBox}>
        <header className={styles.settingHeader}>
          <img src={settingsIcon} alt="Settings Icon" className={styles.icon} />
          <span>Settings</span>
        </header>
        <div className={styles.settings}>
          <LogoutButton />
        </div>
      </main>
    </div>
  );
};
export default SettingsPage;
