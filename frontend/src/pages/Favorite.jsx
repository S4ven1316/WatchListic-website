import NavBar from "../components/NavBar";
import "../css/Favorite.css";
import { useMovieContext } from "../context/MovieContext";
import MovieCard from "../components/MovieCard";
import { useEffect } from "react";

function Favorite() {
  document.title = "Favorites | WatchListic";

  const { favorites } = useMovieContext();

  return (
    <div className="favorite">
      <NavBar />
      <div className="header">
        <h1>My Favorites</h1>
        <p>
          {favorites.length} Movie{favorites.length === 1 ? "" : "s"} Saved
        </p>
      </div>

      {favorites.length > 0 ? (
        <div className="fav-movies">
          <div className="fav-movies-grid">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      ) : (
        <div className="fav-movies-none">
          <div className="no-favorites">
            <h2>You're favorite list is empty.</h2>
            <p>
              Start exploring movies and save the ones you love to build your
              personal collection.
            </p>
            <button className="explore-btn">Explore Movies</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Favorite;
