import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import styles from "./GoogleBookDetails.module.css";

const apiURL = process.env.REACT_APP_API_URL || "";

const GoogleBookDetails = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGoogleBook = async () => {
      try {
        const res = await fetch(`${apiURL}/api/google-books/${bookId}`);

        if (!res.ok) throw new Error("Failed to fetch Google Book");
        const data = await res.json();

        const volumeInfo = data.volumeInfo;

        setBook({
          id: data.id,
          title: volumeInfo.title,
          authors: volumeInfo.authors,
          description: volumeInfo.description,
          thumbnail: volumeInfo.imageLinks?.thumbnail,
          genre: volumeInfo.categories?.[0],
        });
      } catch (error) {
        console.error("Error fetching book ID:", error);
        setError("Could not load book");
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoogleBook();
  }, [bookId]);

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
        <p className={styles.message}>Book not found or missing data</p>
      </div>
    );
  }

  return (
    <div className={styles.mainContainer}>
      <Header />
      <div>
        <button className={styles.arrow} onClick={() => navigate(-1)}>
          &lt;
        </button>
      </div>

      <main className={styles.mainContent}>
        <div className={styles.bookInfo}>
          <img
            src={book.thumbnail}
            className={styles.bookCover}
            alt="Book Cover"
          />

          <h1 className={styles.title}>{book.title}</h1>

          <section className={styles.details}>
            <p>
              <strong>Book ID:</strong> {bookId}
            </p>
            <p>
              <strong>Author:</strong> {book.authors?.join(", ")}
            </p>
            <p>
              <strong>Genre:</strong> {book.genre || "N/A"}
            </p>

            <div className={styles.descriptionBlock}>
              <strong>Description</strong>
              <div
                className={styles.description}
                dangerouslySetInnerHTML={{ __html: book.description }}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default GoogleBookDetails;
