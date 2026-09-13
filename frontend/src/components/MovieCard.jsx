import "../css/MovieCard.css";
import { useMovieContext } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

function MovieCard({ movie }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const navigate = useNavigate();
  const favorite = isFavorite(movie.id);
  const genres = {
    28: "Action",
    12: "Adventure",
    16: "Animation",
    35: "Comedy",
    80: "Crime",
    99: "Documentary",
    18: "Drama",
    10751: "Family",
    14: "Fantasy",
    36: "History",
    27: "Horror",
    10402: "Music",
    9648: "Mystery",
    10749: "Romance",
    878: "Sci-Fi",
    10770: "TV Movie",
    53: "Thriller",
    10752: "War",
    37: "Western",
  };

  function onFavoriteClick(e) {
    e.preventDefault();
    e.stopPropagation();
    if (favorite) removeFromFavorites(movie.id);
    else addToFavorites(movie);
  }

  return (
    <div
      className="movie-card"
      role="link"
      tabIndex={0}
      onClick={() => navigate(`/movie/${movie.id}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          navigate(`/movie/${movie.id}`);
        }
      }}
    >
      <div className="movie-poster">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <div className="movie-overlay">
          <button
            className={`fav-btn ${favorite ? "active" : ""}`}
            onClick={onFavoriteClick}
          >
            ♡
          </button>
        </div>
      </div>
      <div className="movie-info">
        <h3>{movie.title}</h3>
        <div className="movie-detail">
          <div className="movie-rated">
            <p>⭐{movie.vote_average.toFixed(1)}</p>
          </div>
          <p>{movie.release_date?.split("-")[0]}</p>
        </div>
        <p>{movie.genre_ids?.map((id) => genres[id]).join(" • ")}</p>
      </div>
    </div>
  );
}

export default MovieCard;
