import React, { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(query);
  };

  return (
    <div className="d-flex justify-content-center my-4">
      <form 
        className="w-100" 
        style={{ maxWidth: "600px" }} 
        onSubmit={handleSubmit}
      >
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar productos..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button className="btn btn-warning fw-semibold" type="submit">
            Buscar
          </button>
        </div>
      </form>
    </div>
  );
}
