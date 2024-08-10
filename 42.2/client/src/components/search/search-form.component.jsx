import React, { useState } from "react";

const SearchForm = ({ searchFor }) => {
  const [searchTerm, setSearchTerm] = useState("");

  function handleSubmit(evt) {
    evt.preventDefault();
    
    searchFor(searchTerm.trim() || undefined);
    setSearchTerm(searchTerm.trim());
  }

  function handleChange(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="searchTerm"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default SearchForm;
