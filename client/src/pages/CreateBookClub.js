import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CreateBookClub.module.css";
import { useBookClubManager } from "../hooks/bookClubManager";

const CreateBookClub = () => {
  const navigate = useNavigate();
  const { createClub } = useBookClubManager();

  const [currentUserProfile, setCurrentUserProfile] = useState(null);

  const [form, setForm] = useState({
    clubName: "",
    description: "",
    relatedTo: "",
  });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setCurrentUserProfile(JSON.parse(storedProfile));
    }
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Current User:", currentUserProfile);

    if (!currentUserProfile || !currentUserProfile._id) {
      setError("User is not authenticated or is missing credential");
      return;
    }

    if (!form.clubName || !form.description || !form.relatedTo) {
      setError("All fields are required");
      return;
    }
    setLoading(true);
    try {
      await createClub({
        ...form,
        creatorId: currentUserProfile._id,
      });
      navigate("/book-clubs");
    } catch (err) {
      setError(err?.response?.data.error || "Failed to create the club.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.mainContainer}>
      <Link to="/book-clubs">
        <span className={styles.arrow}></span>
      </Link>
      <div className={styles.headers}>
        <h1>Create Book Club</h1>
        <p className={styles.subHeader}>Tell us about your club</p>
      </div>

      {error && <p className={styles.errorMessage}>{error}</p>}

      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Club Name:</label>
        <input
          type="text"
          name="clubName"
          value={form.clubName}
          onChange={handleChange}
          required
        />
        <label>Description:</label>
        <textarea
          className={styles.largeInput}
          name="description"
          value={form.description}
          onChange={handleChange}
          required
        />
        <label>Related To:</label>
        <input
          type="text"
          name="relatedTo"
          value={form.relatedTo}
          onChange={handleChange}
          required
        />
        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? "Creating..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default CreateBookClub;
