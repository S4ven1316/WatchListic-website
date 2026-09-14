import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMovieDetails } from "../services/api";
import { useMovieContext } from "../context/MovieContext";
import "../css/MovieDetails.css";
import NavBar from "../components/NavBar";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateLeft } from "@fortawesome/free-solid-svg-icons";

function MovieDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMovie = async () => {
      try {
        setError("");
        setMovie(null);
        const details = await getMovieDetails(id);

        if (details.success === false) {
          throw new Error("Movie not found");
        }

        setMovie(details);
      } catch (loadError) {
        console.error(loadError);
        setError("Unable to load this movie.");
      }
    };

    loadMovie();
  }, [id]);

  if (error) {
    return (
      <main className="movie-details-page">
        <button
          className="back-button"
          type="button"
          onClick={() => navigate(-1)}
        >
          <FontAwesomeIcon icon={faRotateLeft} /> Back
        </button>
        <p className="details-message">{error}</p>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="movie-details-page details-message">
        <span className="details-spinner" role="status" aria-label="Loading" />
      </main>
    );
  }

  const favorite = isFavorite(movie.id);
  const year = movie.release_date?.split("-")[0] || "Unknown year";
  const runtime = movie.runtime ? `${movie.runtime} min` : "Unknown runtime";

  return (
    <main className="movie-details-page">
      <NavBar />
      <button
        className="back-button"
        type="button"
        onClick={() => navigate(-1)}
      >
        <FontAwesomeIcon icon={faRotateLeft} /> Back
      </button>

      <section className="movie-details-content">
        <img
          className="details-poster"
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />

        <div className="details-copy">
          <h1>{movie.title}</h1>
          <div className="details-meta">
            <span className="details-rating">
              ★ {movie.vote_average.toFixed(1)}
            </span>
            <span>•</span>
            <span>▣ {year}</span>
            <span>•</span>
            <span>◷ {runtime}</span>
          </div>

          <div className="details-genres">
            {movie.genres?.map((genre) => (
              <span key={genre.id}>{genre.name}</span>
            ))}
          </div>

          <h2>Overview</h2>
          <p className="details-overview">
            {movie.overview || "No overview available for this movie."}
          </p>

          <button
            className={`details-favorite-button ${favorite ? "active" : ""}`}
            type="button"
            onClick={() =>
              favorite ? removeFromFavorites(movie.id) : addToFavorites(movie)
            }
          >
            ♡ {favorite ? "Remove from Favorites" : "Add to Favorites"}
          </button>
        </div>
      </section>
    </main>
  );
}

export default MovieDetails;
