import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import styles from "./BookClubDetailPage.module.css";
import { useBookClubManager } from "../hooks/bookClubManager";

const BookClubDetailPage = () => {
  const { clubId } = useParams();
  const { fetchClubById, joinClub } = useBookClubManager();

  const [club, setClub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [joining, setJoining] = useState(false);

  const currentUser = { _id: "687eb46a74ab15e8ef474839", name: "Baily Bates" };

  useEffect(() => {
    async function loadClub() {
      if (!clubId) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchClubById(clubId);
        console.log("Fetched club ", data);
        setClub(data);
      } catch (err) {
        setError("Failed to load club details");
      } finally {
        setLoading(false);
      }
    }
    loadClub();
  }, [clubId, fetchClubById]);

  const handleJoin = async () => {
    if (!club) return;
    setJoining(true);
    try {
      const updatedClub = await joinClub(club._id, currentUser._id);
      setClub(updatedClub);
    } catch (err) {
      alert("Error joining club. Please try again");
    } finally {
      setJoining(false);
    }
  };

  if (loading)
    return (
      <div className={styles.mainContainer}>
        <Header />
        <p className={styles.message}>Loading club details...</p>
      </div>
    );

  if (error)
    return (
      <div className={styles.mainContainer}>
        <Header />
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );

  if (!club)
    return (
      <div className={styles.mainContainer}>
        <Header />
        <p className={styles.message}>Club not found.</p>
      </div>
    );

  const posts = club.posts || [
    { id: 1, author: "System", content: "Welcome to the club!" },
  ];

  const isMember = club.memberIds.includes(currentUser._id);

  return (
    <div className={styles.mainContainer}>
      <Header />
      <main className={styles.clubsInfo}>
        <Link to={"/book-clubs"}>
          <span className={styles.arrow}></span>
        </Link>

        <h1 className={styles.clubName}>{club.clubName}</h1>
        <p className={styles.description}>{club.description}</p>

        <p className={styles.memberCount}>
          <strong>Number of Members:</strong> {club.memberIds.length}
        </p>

        <section className={styles.postsContainer}>
          <h3 className={styles.postTitle}>Posts</h3>
          <ul className={styles.postList}>
            {posts.map((post) => (
              <li key={post.id} className={styles.postItem}>
                <strong>"{post.content}"</strong> {post.author}:
              </li>
            ))}
          </ul>
        </section>

        {!isMember && (
          <button
            disabled={joining}
            onClick={handleJoin}
            className={styles.joinButton}
          >
            {joining ? "Joining..." : "Join Club"}
          </button>
        )}
        {isMember && <p>You are already a member of this club.</p>}
      </main>
    </div>
  );
};

export default BookClubDetailPage;
