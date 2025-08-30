import { useEffect, useState, useMemo } from "react";
import axios from "axios";

// handles functionality of event activity section

const apiURL = process.env.REACT_APP_API_URL;

export const useEventManager = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeEvents, setActiveEvents] = useState(null);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiURL}/api/events`);
      setEvents(res.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchEventById = async (eventId) => {
    if (!eventId) {
      setError(new Error("No eventId provided"));
      return null;
    }
    try {
      const res = await axios.get(`${apiURL}/api/events/${eventId}`);
      setActiveEvents(res.data);
      return res.data;
    } catch (err) {
      setError(err);
    }
  };

  const createEvent = async (eventData) => {
    try {
      const res = await axios.post(`${apiURL}/api/events/`, eventData);
      setEvents((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return {
    events,
    fetchEvents,
    loading,
    error,
    createEvent,
    fetchEventById,
    activeEvents,
    setActiveEvents,
  };
};
