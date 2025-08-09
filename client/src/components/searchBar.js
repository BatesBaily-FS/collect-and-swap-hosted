import React, { useState } from "react";
import styles from "./searchBar.module.css";

const SearchBar = ({ placeholder = "Search...", onSearch }) => {
  const [term, setTerm] = useState("");

  const handleInput = (e) => {
    setTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <form className={styles.searchBar} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder={placeholder}
        value={term}
        onChange={handleInput}
        className={styles.input}
      />
      <button type="submit" className={styles.button}>
        Search
      </button>
    </form>
  );
};
export default SearchBar;
