import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./BookDetails.module.css";

const BookDetails = ({ books = [] }) => {
  const chunkBooks = (books, chunkSize) => {
    const rows = [];
    for (let i = 0; i < books.length; i += chunkSize) {
      rows.push(books.slice(i, i + chunkSize));
    }
    return rows;
  };

  const bookRows = chunkBooks(books, 4);

  return (
    <div className={styles.collectionContainer}>
      {bookRows.map((row, rowIndex) => (
        <div key={rowIndex} className={styles.bookShelfRow}>
          <div className={styles.shelfImage}></div>
          <div className={styles.bookRow}>
            {row.map((book) => (
              <Link
                key={book._id}
                to={`/book/${book._id}`}
                className={styles.bookLink}
              >
                <div className={styles.bookCard}>
                  <img src={book.thumbnail} alt={book.title} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default BookDetails;
