import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Header from "../components/Header";
import styles from "./EventDetailPage.module.css";
import { useEventManager } from "../hooks/eventManager";

const EventDetailPage = () => {
  const { eventId } = useParams();
  const { fetchEventById } = useEventManager();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadEvent() {
      if (!eventId) return;
      setLoading(true);
      setError(null);
      try {
        const data = await fetchEventById(eventId);
        console.log("fetched club:", data);
        setEvent(data);
      } catch (err) {
        setError("Failed to load events details");
      } finally {
        setLoading(false);
      }
    }
    loadEvent();
  }, []);

  if (loading)
    return (
      <div className={styles.mainContainer}>
        <Header />
        <p className={styles.message}>Loading event details</p>
      </div>
    );

  if (error)
    return (
      <div className={styles.mainContainer}>
        <Header />
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );

  if (!event)
    return (
      <div className={styles.mainContainer}>
        <Header />
        <p className={styles.message}>Event not found.</p>
      </div>
    );

  return (
    <div className={styles.mainContainer}>
      <Header />
      <main className={styles.eventInfo}>
        <Link to={"/events"} aria-label="Back to Events">
          <span className={styles.arrow}></span>
        </Link>
        <h1 className={styles.pageTitle}>Event Details</h1>

        <section className={styles.eventDetails}>
          <h2 className={styles.eventName}>{event.eventName}</h2>
          <p className={styles.eventMeta}>
            <strong>Date:</strong> {event.date}
          </p>
          <p className={styles.eventMeta}>
            <strong>Location:</strong> {event.location}
          </p>
          <p className={styles.eventDescription}>{event.description}</p>
        </section>
      </main>
    </div>
  );
};

export default EventDetailPage;
