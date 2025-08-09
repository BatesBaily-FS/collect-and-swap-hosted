import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CreateEventPage.module.css";
import { useEventManager } from "../hooks/eventManager";

const CreateEventPage = () => {
  const navigate = useNavigate();
  const { createEvent } = useEventManager();

  const [currentUserProfile, setCurrentUserProfile] = useState(null);

  const [form, setForm] = useState({
    eventName: "",
    description: "",
    date: "",
    location: "",
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
    console.log("Current User Profile:", currentUserProfile);

    if (!form.eventName || !form.description || !form.date || !form.location) {
      setError("All fields are required");
      return;
    }

    setError(null);
    setLoading(true);
    try {
      await createEvent({
        ...form,
        creatorId: currentUserProfile._id,
      });
      navigate("/events");
    } catch (err) {
      setError(err?.response?.data?.error || "Failed to created event.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Link to="/events" className={styles.backLink}>
        <span className={styles.arrow}></span>
      </Link>
      <h1>Create Event</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label>Event Name:</label>
        <input
          type="text"
          name="eventName"
          value={form.eventName}
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
        <label>Date</label>
        <input
          type="text"
          name="date"
          placeholder='e.g. "May 20th, 2024 at 5pm'
          value={form.date}
          onChange={handleChange}
          required
        />
        <label>Location</label>
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
        />
        <button className={styles.button}>Create</button>
      </form>
    </div>
  );
};

export default CreateEventPage;
