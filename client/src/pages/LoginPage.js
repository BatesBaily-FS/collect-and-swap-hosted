import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./LoginPage.module.css";

function LoginPage() {
  const { loginWithRedirect, isLoading, isAuthenticated } = useAuth0();

  if (isLoading) return <div>Loading...</div>;
  if (isAuthenticated) return <div>You are already logged in.</div>;

  return (
    <div className={styles.mainContainer}>
      <h2>Welcome to Collect & Swap</h2>
      <main className={styles.colorBox}>
        <p>Sign in to continue</p>
        <button className={styles.button} onClick={() => loginWithRedirect()}>
          Log In with Google
        </button>
      </main>
    </div>
  );
}

export default LoginPage;
