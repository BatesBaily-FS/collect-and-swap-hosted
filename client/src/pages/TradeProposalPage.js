import React, { useEffect, useState } from "react";
import styles from "./TradeProposal.module.css";
import { Link, useNavigate, useParams } from "react-router-dom";

const apiURL = process.env.REACT_APP_API_URL || "";

const TradeProposalPage = () => {
  // const { getAccessTokenSilently, user } = useAuth0();
  const { bookId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [offerBook, setOfferBook] = useState("");
  const [requestBook, setRequestBook] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState("");

  const [userBooks, setUserBooks] = useState([]);
  const [requestBookDetails, setRequestBookDetails] = useState(null);

  const [profileInfo, setProfileInfo] = useState(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setProfileInfo(profile);
      setName(profile.name || "");
      setEmail(profile.email || "");
    }
  }, []);

  useEffect(() => {
    const fetchBooksAndRequestedBook = async () => {
      try {
        // const token = await getAccessTokenSilently();

        if (!profileInfo?._id) return;

        const res = await fetch(`${apiURL}/api/books/user/${profileInfo._id}`);
        if (!res.ok) throw new Error("Failed to fetch user books");
        const books = await res.json();
        setUserBooks(books);

        if (bookId) {
          const bookDetailRes = await fetch(`${apiURL}/api/books/${bookId}`);
          if (bookDetailRes.ok) {
            const bookDetails = await bookDetailRes.json();
            setRequestBookDetails(bookDetails);
            setRequestBook(bookId);
          }
        }
      } catch (error) {
        setStatus(error.message);
      }
    };
    fetchBooksAndRequestedBook();
  }, [bookId, profileInfo?._id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Submitting...");

    if (!profileInfo?._id) {
      setStatus("User profile is not loaded");
      return;
    }

    if (!offerBook) {
      setStatus("Please specify the book you want in exchange");
      return;
    }

    if (!notes.trim()) {
      setStatus("Please add notes to your proposal");
      return;
    }

    try {
      // const token = await getAccessTokenSilently();

      const formData = {
        sender: profileInfo._id,
        bookOffered: offerBook,
        bookDesired: requestBook,
        notes,
      };

      const res = await fetch(`${apiURL}/api/trade-proposals`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("Trade Proposal submitted successfully");
        setOfferBook("");
        setRequestBook(bookId || "");
        setNotes("");

        setTimeout(() => {
          navigate("/trade");
        }, 2000);
      } else {
        const error = await res.json();
        setStatus(`Error: ${error.message || "Failed to submit proposal."}`);
      }
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1>Trade Proposal</h1>
      <Link to={`/book/${bookId}`}>
        <span className={styles.arrow}></span>
      </Link>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>Name</label>
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label>Email</label>
        <input
          type="text"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Book You Wish to Trade</label>
        <select
          required
          value={offerBook}
          onChange={(e) => setOfferBook(e.target.value)}
        >
          <option value="">Select a book</option>
          {userBooks.map((book) => (
            <option key={book._id} value={book._id}>
              {book.title}
            </option>
          ))}
        </select>
        <label>Book You Want in Exchange</label>
        {requestBookDetails ? (
          <div>
            <strong>{requestBookDetails.title}</strong>
          </div>
        ) : (
          <input
            type="text"
            required
            value={requestBook}
            onChange={(e) => setRequestBook(e.target.value)}
            placeholder="Book Id or title"
          />
        )}

        <label>Additional Notes</label>
        <textarea
          className={styles.largeInput}
          type="text"
          required
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
        />
        <button type="submit">Submit</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default TradeProposalPage;
