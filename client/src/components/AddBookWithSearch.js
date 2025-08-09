import React, { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import styles from "./AddBookWithSearch.module.css";

console.log("API URL:", process.env.REACT_APP_API_URL);
const apiURL = process.env.REACT_APP_API_URL || "";

const AddBookWithSearch = ({ onBookAdded, userMongoId }) => {
  const { getAccessTokenSilently } = useAuth0();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState("");

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
          query
        )}`
      );
      const data = await res.json();
      setSearchResults(data.items.slice(0, 10));
    } catch (err) {
      setStatus("Error fetching search results.");
    }
  };

  const handleAddBook = async (book) => {
    setStatus("Adding");

    try {
      const token = await getAccessTokenSilently();

      const res = await fetch(`${apiURL}/api/books`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          googleBookId: book.id,
          title: book.volumeInfo.title || "",
          authors: book.volumeInfo.authors || ["Unknown"],
          description: book.volumeInfo.description || "",
          thumbnail: book.volumeInfo.imageLinks?.thumbnail || "",
          owner: userMongoId,
        }),
      });

      if (res.ok) {
        setStatus("Book added!");
        setSearchQuery("");
        setSearchResults([]);
        if (onBookAdded) onBookAdded();
      } else {
        const error = await res.json();
        setStatus(`Error: ${error.message || "Failed to add book."}`);
      }
    } catch (err) {
      setStatus(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <h3>Add a Book</h3>
      <input
        type="text"
        placeholder="Search by title or author"
        value={searchQuery}
        onChange={handleSearchChange}
        className={styles.searchInput}
      />
      <ul className={styles.searchResults}>
        {searchResults.map((book, idx) => (
          <li key={book.key || idx}>
            <strong>{book.volumeInfo.title}</strong> by{" "}
            {book.volumeInfo.authors?.join(", ") || "Unknown"}
            <button
              onClick={() => handleAddBook(book)}
              className={styles.addButton}
            >
              Add
            </button>
          </li>
        ))}
      </ul>
      {status && <div>{status}</div>}
    </div>
  );
};

export default AddBookWithSearch;
