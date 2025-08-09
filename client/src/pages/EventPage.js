import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styles from "./EventPage.module.css";
import { useEventManager } from "../hooks/eventManager";

const ExplorePage = () => {
  const navigate = useNavigate();
  const { events, activeEvents, loading, error } = useEventManager();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredEvents = events.filter(
    (event) =>
      event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (event.description &&
        event.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (event.location &&
        event.location.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleClick = () => {
    navigate("/create-event");
  };
  return (
    <div className={styles.mainContainer}>
      <Header />
      <div className={styles.headings}>
        <h1>Engage with your Bookish Community</h1>
        <h3 className={styles.subHeader}>
          Discover and attend events that inspire & connect
        </h3>
        <div>
          <input
            type="text"
            placeholder="Search by name, description, or location"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>
      <main className={styles.colorBox}>
        <button className={styles.createButton} onClick={handleClick}>
          Create Event
        </button>

        {loading && <p>Loading events</p>}
        {error && <p>{error.message || error.toString()}</p>}

        <section className={styles.eventsContainer}>
          {filteredEvents.length === 0 && loading ? (
            <p>No events found</p>
          ) : (
            filteredEvents.map((event) => (
              <div key={event._id} className={styles.eventRow}>
                <label className={styles.name}>{event.eventName}</label>
                <label className={styles.date}>{event.date}</label>
                <label className={styles.location}>{event.location}</label>
                <label className={styles.description}>
                  {event.description}
                </label>
                <button
                  className={styles.button}
                  onClick={() => {
                    navigate(`/events/${event._id}`);
                  }}
                >
                  View
                </button>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};

export default ExplorePage;
