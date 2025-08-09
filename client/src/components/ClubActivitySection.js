import { useState } from "react";
import { useBookClubManager } from "../hooks/bookClubManager";
import styles from "./ClubActivitySection.module.css";

const ClubActivitySection = ({ currentUser }) => {
  const { clubs, joinClub, fetchClubs, loading, error } = useBookClubManager();
  const [search, setSearch] = useState("");

  const filteredClubs = clubs.filter(
    (club) =>
      club.clubName.toLowerCase().includes(search.toLowerCase()) ||
      (club.description &&
        club.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div className={styles.mainContainer}>
      <h2> Book Clubs</h2>
      <input
        type="text"
        placeholder="Search clubs..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
      />

      {filteredClubs.map((club) => (
        <div key={club._id} className={styles.clubCard}>
          <strong>{club.clubName}</strong>
          <div className={styles.clubMeta}>
            <span>
              <b>Organizer:</b>{" "}
            </span>
            <span>
              <b>Members:</b> {club.memberIds?.length || 0}
            </span>
          </div>
          <div className={styles.clubDescription}>{club.description}</div>
          <div className={styles.clubActions}>
            {club.memberIds.includes(currentUser._id) ? (
              <span className={styles.memberBadge}>You are a member</span>
            ) : (
              <button
                className={styles.joinButton}
                onClick={() => joinClub(club._id, currentUser._id)}
              >
                Join
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ClubActivitySection;
