import { useEffect, useState, useCallback } from "react";
import axios from "axios";

// handles functionality of club activity section

const apiURL = process.env.REACT_APP_API_URL;

export const useBookClubManager = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeClubs, setActiveClubs] = useState(null);
  const [error, setError] = useState(null);

  const fetchClubs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${apiURL}/api/book-clubs`);
      setClubs(res.data || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchClubById = useCallback(async (clubId) => {
    if (!clubId) {
      setError(new Error("No clubId provided"));
      return null;
    }
    try {
      const res = await axios.get(`${apiURL}/api/book-clubs/${clubId}`);
      setActiveClubs(res.data);
      return res.data;
    } catch (err) {
      setError(err);
      return null;
    }
  }, []);

  const createClub = async (clubData) => {
    try {
      const res = await axios.post(`${apiURL}/api/book-clubs/`, clubData);
      setClubs((prev) => [...prev, res.data]);
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  const joinClub = async (clubId, userId) => {
    try {
      const res = await axios.post(`${apiURL}/api/book-clubs/${clubId}/join`, {
        userId,
      });
      setClubs((prev) => prev.map((c) => (c._id === clubId ? res.data : c)));
      return res.data;
    } catch (err) {
      setError(err);
      throw err;
    }
  };

  useEffect(() => {
    fetchClubs();
  }, []);

  return {
    clubs,
    fetchClubs,
    loading,
    error,
    createClub,
    joinClub,
    fetchClubById,
    activeClubs,
    setActiveClubs,
  };
};
