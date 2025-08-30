import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Header from "../components/Header";
import styles from "./BookClubPage.module.css";
import { useNavigate } from "react-router-dom";
import { useBookClubManager } from "../hooks/bookClubManager.js";

const RESULTS_PER_PAGE = 6;

function BookClubPage({ currentUser }) {
  const navigate = useNavigate();
  const { clubs, loading, error } = useBookClubManager();
  const [searchTerm, setSearchTerm] = useState("");
  const [visibleCount, setVisibleCount] = useState(RESULTS_PER_PAGE);

  const filteredClubs = clubs.filter(
    (club) =>
      club.clubName.toLowerCase().includes(searchTerm.toLocaleLowerCase()) ||
      (club.description &&
        club.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const visibleClubs = filteredClubs.slice(0, visibleCount);

  return (
    <>
      <Helmet>
        <title>
          Join a Book Club Online | Virtual Reading Community - Collect & Swap
        </title>
        <meta
          name="description"
          content="Find, join, or create online and local book clubs. Connect with fellow readers, discuss books, and grow your reading community."
        />
      </Helmet>
      <div className={styles.mainContainer}>
        <Header />
        <h1>Find Your Community of Book Lovers!</h1>
        <input
          type="text"
          placeholder="Search clubs..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={styles.searchInput}
        />

        <button
          className={styles.newClubButton}
          onClick={() => {
            navigate(`/clubs/create`);
          }}
        >
          Create Club
        </button>

        {loading && <p>Loading clubs...</p>}
        {error && <p>{error.message || error.toString()}</p>}

        <section className={styles.clubsContainer}>
          {visibleClubs.length === 0 && !loading ? (
            <p>No clubs found</p>
          ) : (
            visibleClubs.map((club) => (
              <div key={club._id} className={styles.clubRow}>
                <label className={styles.clubName}>{club.clubName}</label>
                <label className={styles.description}>{club.description}</label>
                <button
                  className={styles.button}
                  onClick={() => {
                    navigate(`/clubs/${club._id}`);
                  }}
                >
                  View
                </button>
              </div>
            ))
          )}
        </section>

        {visibleCount < filteredClubs.length && (
          <button
            className={styles.loadMoreButton}
            onClick={() => setVisibleCount((prev) => prev + RESULTS_PER_PAGE)}
            style={{ margin: "1rem auto", display: "block" }}
          >
            Load More
          </button>
        )}
      </div>
    </>
  );
}

export default BookClubPage;
