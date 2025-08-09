import React, { useState } from "react";
import { useEventManager } from "../hooks/eventManager";
import styles from "./EventActivitySection.module.css";

const EventActivitySection = ({ currentUser }) => {
  const { events, loading, error } = useEventManager();
  const [search, setSearch] = useState("");

  const filteredEvents = events.filter((event) =>
    event.location.toLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <div className={styles.mainContainer}>
      <h2>Upcoming Events</h2>
      <input
        type="text"
        placeholder="Search by location"
        value={search}
        onChange={() => setSearch(error.target.value)}
        className={styles.searchInput}
      />

      {loading && <p>Loading events...</p>}
      {error && (
        <p className={styles.error}>{error.message || error.toString()}</p>
      )}
      {filteredEvents.length === 0 && <p>No events found for this location.</p>}

      {filteredEvents.map((event) => (
        <div key={event._id} className={styles.eventCard}>
          <strong>{event.eventName}</strong>
          <div className={styles.eventMete}>
            <span>
              <b>Date:</b> {event.date}
            </span>
            <span>
              <b>Location:</b> {event.location}
            </span>
            <span>
              <b>Organizer:</b> {event.creatorId?.name || "Unknown"}
            </span>
          </div>
          <div className={styles.eventDescription}>{event.description}</div>
        </div>
      ))}
    </div>
  );
};

export default EventActivitySection;
