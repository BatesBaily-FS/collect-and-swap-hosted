import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import styles from "./ExplorePage.module.css";

const exploreCategories = [
  { key: "trending", label: "Trending Now", query: "trending now" },
  {
    key: "authors",
    label: "Popular Authors",
    query: "Stephen King, Sarah J Maas, John Marrs",
  },
  { key: "summer", label: "Summer Reads", query: "vacation reads" },
  { key: "staff", label: "Staff Picks", query: "staff picks" },
];

const ExplorePage = () => {
  const [bookByCategory, setBooksByCategory] = useState({});

  useEffect(() => {
    const fetchAllCategories = async () => {
      const results = await Promise.all(
        exploreCategories.map(async (cat) => {
          const resp = await fetch(
            `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
              cat.query
            )}&maxResults=5`
          );
          const data = await resp.json();
          return { [cat.key]: data.items || [] };
        })
      );
      setBooksByCategory(
        results.reduce((acc, curr) => ({ ...acc, ...curr }), {})
      );
    };
    fetchAllCategories();
  }, []);

  const renderBooks = (books) =>
    books.map((book) => (
      <Link key={book.id} to={`/google/${book.id}`} className={styles.bookLink}>
        <div key={book.id} className={styles.bookCard}>
          <div>
            <img
              src={book.volumeInfo.imageLinks?.thumbnail}
              className={styles.bookImg}
            />
          </div>
          <p className={styles.bookTitle}>{book.volumeInfo.title}</p>
        </div>
      </Link>
    ));
  return (
    <>
      <Helmet>
        <title>Discover Books | Reading Community App - Collect & Swap</title>
        <meta
          name="description"
          content="Explore trending books, staff picks, and curate genres. Find something new to read and connect with our online book community."
        />
      </Helmet>
      <div className={styles.mainContainer}>
        <Header />
        <div className={styles.headings}>
          <h1 className={styles.title}>Find Your Next Read & More</h1>
          <h3 className={styles.subHeader}>
            Browse our selections of the week
          </h3>
        </div>
        <main className={styles.resultsContainer}>
          {exploreCategories.map((cat) => (
            <section key={cat.key} className={styles.categorySection}>
              <h2 className={styles.categoryTitle}>
                {cat.label.split(" ").map((word, idx) => (
                  <span key={idx} className={styles.categoryTitleWord}>
                    {word}
                  </span>
                ))}
              </h2>
              <div className={styles.bookRow}>
                {renderBooks(bookByCategory[cat.key] || [])}
              </div>
            </section>
          ))}
        </main>
      </div>
    </>
  );
};

export default ExplorePage;
