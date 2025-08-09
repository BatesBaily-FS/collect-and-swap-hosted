import React, { useState, useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import Header from "../components/Header";
import styles from "./BookDetailsPage.module.css";

const apiURL = process.env.REACT_APP_API_URL || "";

const BookDetailPage = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { getAccessTokenSilently } = useAuth0();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const token = await getAccessTokenSilently();
        const res = await fetch(`${apiURL}/api/books/${bookId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) {
          if (res.status === 404) {
            const googleRes = await fetch(
              `https://googleapis.com/books/v1/volumes/${bookId}`
            );
            if (!googleRes.ok) {
              throw new Error("Book not found in Google Books either");
            }
            const googleData = await googleRes.json();
            const volumeInfo = googleData.volumeInfo;

            setBook({
              id: googleData.id,
              title: volumeInfo.title,
              authors: volumeInfo.authors,
              description: volumeInfo.description,
              thumbnail: volumeInfo.imagesLinks?.thumbnail,
              genre: volumeInfo.categories?.[0],
              source: "google",
            });
            return;
          } else {
            throw new Error("Failed to fetch book");
          }
        }

        const data = await res.json();
        setBook({
          ...data,
          source: "local",
        });
      } catch (error) {
        console.error("Error fetching book ID:", error);
        setError("Could not load book");
      } finally {
        setIsLoading(false);
      }
    };

    fetchBook();
  }, [bookId, getAccessTokenSilently]);

  if (isLoading) {
    return (
      <div className={styles.loadingContainer}>
        <p className={styles.message}>Loading book details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );
  }

  if (!book) {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorMessage}>Book not found or missing data</p>
      </div>
    );
  }

  const handleClick = () => {
    if (book.source === "local") {
      navigate(`/trade-form/${bookId}`);
    } else {
      alert("Trade Proposals are only available for local books.");
    }
  };

  return (
    <div className={styles.mainContainer}>
      <Header />

      <Link to={"/profile"}>
        <span className={styles.arrow}></span>
      </Link>

      {/* for making new trade proposal */}
      <main className={styles.mainContent}>
        <button
          onClick={handleClick}
          className={styles.tradeButton}
          aria-label="Start Trade Proposal"
        >
          Trade Proposal
        </button>

        <div className={styles.bookInfo}>
          <img
            src={book.thumbnail}
            className={styles.bookCover}
            alt="Book Cover"
          />

          <h1 className={styles.title}>{book.title}</h1>
          <section className={styles.details}>
            <p>
              Book ID: <strong>{bookId}</strong>
            </p>
            <p>
              Author: <strong>{book.authors?.join(", ")}</strong>
            </p>
            <p>
              Genre: <strong>{book.genre || "N/A"}</strong>
            </p>
            <div className={styles.descriptionBlock}>
              <strong>Description</strong>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{
                  __html: book.description || "No description available",
                }}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default BookDetailPage;
