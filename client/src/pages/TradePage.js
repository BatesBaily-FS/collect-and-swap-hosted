import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import styles from "./TradePage.module.css";
import { Link } from "react-router-dom";

// needs search component by author and title
const TradePage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchBooks("best sellers");
  }, []);

  const fetchBooks = async (term) => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          term
        )}&maxResults=12`
      );
      const data = await response.json();

      if (data.items?.length > 0) {
        setBooks(data.items);
      } else {
        setBooks([]);
        setError("No books found.");
      }
    } catch (err) {
      console.error("Error fetching books:", err);
      setError("Error fetching books. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.trim()) {
      fetchBooks(term);
    }
  };

  const renderBooks = (books) =>
    books.map((book) => (
      <Link key={book.id} to={`/google/${book.id}`} className={styles.bookLink}>
        <div key={book.id} className={styles.bookCard}>
          <div>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              alt={book.volumeInfo.title}
            />
          </div>
          <p className={styles.bookTitle}>{book.volumeInfo.title}</p>
        </div>
      </Link>
    ));

  return (
    <div className={styles.mainContainer}>
      <Header />
      <h1 className={styles.title}>Books For Trade...</h1>
      <h3 className={styles.subHeader}>
        Share your shelf, find your next favorite
      </h3>
      <input
        type="text"
        placeholder="Search by book tile or author..."
        value={searchTerm}
        onChange={(e) => {
          const term = e.target.value;
          setSearchTerm(term);
          if (term.trim()) {
            fetchBooks(term);
          } else {
            fetchBooks("best sellers");
          }
        }}
        className={styles.searchInput}
      />
      <div className={styles.colorBox}>
        <div className={styles.resultsContainer}>
          {loading && <p>Loading book...</p>}
          {!loading && error && <p>{error}</p>}
          {!loading && books.length > 0 && (
            <div className={styles.bookRow}>{renderBooks(books)}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TradePage;
