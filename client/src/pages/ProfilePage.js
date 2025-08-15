import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import BookDetails from "../components/BookDetails";
import LogoutButton from "../components/LogoutButton";
import AddBookWithSearch from "../components/AddBookWithSearch";
import TradeActivitySection from "../components/TradeActivitySection";
import styles from "./ProfilePage.module.css";

const apiURL = process.env.REACT_APP_API_URL || "";

const ProfilePage = () => {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();
  console.log("Auth0 loading", isLoading);
  console.log("Auth0 isAuthenticated", isAuthenticated);
  console.log("Auth0 user:", user);
  const [books, setBooks] = useState([]);
  const [profileInfo, setProfileInfo] = useState(null);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [locationInput, setLocationInput] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState(null);

  useEffect(() => {
    if (!isAuthenticated && user) {
      console.log("Saving user to localStorage:", user);
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [isAuthenticated, user]);

  const fetchBooks = async () => {
    if (!profileInfo?._id) return;
    try {
      const token = await getAccessTokenSilently();
      const res = await fetch(`${apiURL}/api/books/user/${profileInfo._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      console.error("Error fetching books", err);
    }
  };

  const fetchProfileInfo = async () => {
    setProfileError(null);
    try {
      setProfileLoading(true);

      const token = await getAccessTokenSilently();
      const res = await fetch(
        `${apiURL}/api/users/${encodeURIComponent(user.sub)}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (!res.ok) {
        if (res.status === 404) {
          setProfileError("profile-missing");
        } else {
          throw new Error("Failed to fetch profile info");
        }
        setProfileInfo(null);
        setProfileLoading(false);
        return;
      }
      const data = await res.json();
      setProfileInfo(data);
      localStorage.setItem("userProfile", JSON.stringify(data));
    } catch (err) {
      setProfileError(err.message);
      setProfileInfo(null);
    } finally {
      setProfileLoading(false);
    }
  };

  const handleStartCreateProfile = () => {
    setShowLocationInput(true);
  };

  const handleCreateProfile = async () => {
    if (!locationInput.trim()) {
      setProfileError("Please provide your location");
      return;
    }

    try {
      setProfileLoading(true);
      setProfileError(null);

      const token = await getAccessTokenSilently();

      const payload = {
        auth0Id: user.sub,
        username: user.nickname || user.email.split("@")[0],
        email: user.email,
        name: user.name,
        location: locationInput.trim(),
        rating: 0,
        books: [],
        tradeProposals: [],
        bookClubs: [],
        tokens: [],
      };

      const res = await fetch(`${apiURL}/api/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorResp = await res.json();
        throw new Error(errorResp.message || "Failed to create profile");
      }

      setLocationInput(" ");
      setShowLocationInput(false);
      await fetchProfileInfo();
    } catch (err) {
      setProfileError(`Create profile error: ${err.message}`);
    } finally {
      setProfileLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated && user?.sub) {
      fetchProfileInfo();
    }
  }, [isAuthenticated, user?.sub, getAccessTokenSilently]);

  useEffect(() => {
    if (profileInfo && profileInfo._id) {
      fetchBooks();
    }
  }, [profileInfo]);

  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please login to view profile.</div>;

  return (
    <>
      <Helmet>
        <title>
          Your Profile | Book Sharing Platform & Secondhand Book App - Collect &
          Swap
        </title>
        <meta
          name="description"
          content="Manage your book collection, send and respond to trade proposals, join book clubs, and connect with a reading community on Collect & Swap."
        />
      </Helmet>
      <Header />
      <div className={styles.mainContainer}>
        <div className={styles.userInfo}>
          <img src={user.picture} alt={user.name} className={styles.avatar} />
          <div>
            <h2>{user.name}</h2>

            {profileLoading && <p>Loading profile info...</p>}

            {profileError === "profile-missing" ? (
              <div>
                {!showLocationInput ? (
                  <>
                    <p>
                      User Profile not found. Please create your profile to
                      continue.
                    </p>

                    <button
                      onClick={handleStartCreateProfile}
                      className={styles.submitButton}
                    >
                      Create Profile
                    </button>
                  </>
                ) : (
                  <>
                    <p>Please enter your location:</p>
                    <input
                      type="text"
                      value={locationInput}
                      onChange={(e) => setLocationInput(e.target.value)}
                      placeholder="Enter your location"
                      className={styles.locationInput}
                    />
                    <button
                      onClick={handleCreateProfile}
                      disabled={profileLoading}
                      className={styles.submitButton}
                    >
                      Submit Profile
                    </button>
                  </>
                )}
                {profileError && profileError !== "profile-missing" && (
                  <p className={styles.error}>{profileError}</p>
                )}
              </div>
            ) : profileError ? (
              <p className={styles.error}>Error: {profileError}</p>
            ) : (
              profileInfo && (
                <>
                  <p>Rating: {profileInfo.rating} /5</p>
                  <p>Location: {profileInfo.location}</p>
                </>
              )
            )}
          </div>
        </div>
        <section>
          <TradeActivitySection />
        </section>
        <div className={styles.searchBar}>
          {profileInfo && profileInfo._id && (
            <AddBookWithSearch
              onBookAdded={fetchBooks}
              userMongoId={profileInfo._id}
            />
          )}
        </div>
        <section className={styles.bookCollection}>
          <BookDetails books={books} />
          <LogoutButton />
        </section>
      </div>
    </>
  );
};

export default ProfilePage;
