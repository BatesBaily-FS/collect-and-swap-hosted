import React, { useState } from "react";
import { useTradeManager } from "../hooks/tradeManager";
import styles from "./TradeActivitySection.module.css";

// manages users trade activity and history on the profile page

const userId = localStorage.getItem("_id");

const TradeActivitySection = ({ userId }) => {
  const [showHistory, setShowHistory] = useState(false);

  const {
    tradeRequests,
    tradeHistory,
    activeTradeCount,
    updateTradeStatus,
    deleteProposal,
  } = useTradeManager(userId);

  return (
    <div className={styles.mainContainer}>
      <h2 className={styles.heading}>
        Active Trade Requests: {activeTradeCount}
      </h2>
      {tradeRequests.filter((tr) => tr.status === "pending").length === 0 ? (
        <p className={styles.emptyMessage}>No active requests</p>
      ) : (
        tradeRequests
          .filter((tr) => tr.status === "pending")
          .map((trade) => (
            <div ley={trade._id} className={styles.tradeCard}>
              <div className={styles.tradeInfo}>
                <strong>Offered:</strong> {trade.bookOffered?.title} <br />
                <strong>Desired:</strong> {trade.bookDesired?.title} <br />
                <strong>Status:</strong> {trade.status}
              </div>
              <div className={styles.buttonGroup}>
                <button
                  onClick={() => updateTradeStatus(trade._id, "accepted")}
                  className={styles.accept}
                >
                  Accept
                </button>
                <button
                  onClick={() => updateTradeStatus(trade._id, "rejected")}
                  className={styles.reject}
                >
                  Reject
                </button>
                <button
                  onClick={() => deleteProposal(trade._id, "delete")}
                  className={styles.delete}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
      )}
      <h3 className={styles.subHeading}>Trade History</h3>
      {!showHistory ? (
        <button
          className={styles.showHistoryButton}
          onClick={() => setShowHistory(true)}
        >
          View History
        </button>
      ) : tradeHistory.length === 0 ? (
        <p className={styles.emptyMessage}>No completed trades.</p>
      ) : (
        tradeHistory.map((trade) => (
          <div key={trade._id} className={styles.tradeHistoryCard}>
            <strong>Offered:</strong> {trade.bookOffered?.title} <br />
            <strong>Desired:</strong> {trade.bookDesired?.title} <br />
            <strong>Status:</strong> {trade.status}
          </div>
        ))
      )}
    </div>
  );
};

export default TradeActivitySection;
