import NavBar from "../components/NavBar";
import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import { searchMovies } from "../services/api";

import "../css/Search.css";

function Search() {
  document.title = "Search | WatchListic";

  const suggestions = [
    "Inception",
    "Interstellar",
    "The Dark Knight",
    "Avengers",
  ];
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const query = searchQuery.trim();

    if (!query) {
      setMovies([]);
      setError("");
      setLoading(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const results = await searchMovies(query);
        setMovies(results);
      } catch (error) {
        console.error(error);
        setMovies([]);
        setError("Pencarian gagal. Silakan coba lagi.");
      } finally {
        setLoading(false);
      }
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  return (
    <div className="search">
      <NavBar />

      <div
        className={`search-content ${movies.length > 0 ? "has-results" : ""}`}
      >
        <h1 className="search-title">What are you looking for?</h1>
        <div className="search-form">
          <input
            type="text"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="suggestion">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setSearchQuery(suggestion)}
            >
              {suggestion}
            </button>
          ))}
        </div>

        {loading && <p>Searching...</p>}
        {!loading && movies.length > 0 && (
          <div className="movies-grid-search">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
