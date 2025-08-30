import { useEffect, useState, useMemo } from "react";
import axios from "axios";

// handles functionality of trade activity section

const apiURL = process.env.REACT_APP_API_URL || "";

export const useTradeManager = (userId) => {
  const [tradeRequests, setTradeRequests] = useState([]);
  const [tradeHistory, setTradeHistory] = useState([]);

  const activeTradeCount = useMemo(() => {
    return tradeRequests.filter((req) => req.status === "pending").length;
  }, [tradeRequests]);

  const fetchTradeRequests = async () => {
    if (!userId) return;

    try {
      const res = await axios.get(
        `${apiURL}/api/trade-proposals/user/${userId}`
      );
      const allTrades = res.data;

      setTradeRequests(allTrades);
      setTradeHistory(allTrades.filter((req) => req.status !== "pending"));
    } catch (err) {
      console.error("Failed to fetch trade request:", err);
    }
  };

  const proposeTrade = async (newTradeData) => {
    try {
      const res = await axios.post(
        `${apiURL}/api/trade-proposals/`,
        newTradeData
      );
      setTradeRequests((prev) => [...prev, res.data]);
    } catch (err) {
      console.error("Error creating trade proposal:", err);
    }
  };

  const updateTradeStatus = async (id, status) => {
    try {
      const res = await axios.put(
        `${apiURL}/api/trade-proposals/update/${id}`,
        {
          status,
        }
      );
      setTradeRequests((prev) =>
        prev.map((trade) => (trade._id === id ? res.data : trade))
      );
    } catch (err) {
      console.error("Error updating trade status:", err);
    }
  };

  const deleteProposal = async (id) => {
    try {
      const res = await axios.delete(
        `${apiURL}/api/trade-proposals/delete/${id}`
      );
      setTradeRequests((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error("Error deleting trade proposal", err);
    }
  };

  useEffect(() => {
    fetchTradeRequests();
  }, [userId]);

  return {
    tradeRequests,
    tradeHistory,
    activeTradeCount,
    proposeTrade,
    updateTradeStatus,
    deleteProposal,
    fetchTradeRequests,
  };
};
