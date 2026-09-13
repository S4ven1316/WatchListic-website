import "../css/Home.css";
import MovieCard from "../components/MovieCard";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../services/api";
import { useEffect, useRef, useState } from "react";
import NavBar from "../components/NavBar";
import { useMovieContext } from "../context/MovieContext";
import { useNavigate } from "react-router-dom";

function Home() {
  document.title = "Home | WatchListic";

  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToFavorites, removeFromFavorites, isFavorite } = useMovieContext();
  const navigate = useNavigate();
  const movieLimit = 9;
  const popularScrollRef = useRef(null);
  const upcomingScrollRef = useRef(null);
  const nowPlayingScrollRef = useRef(null);
  const topRatedScrollRef = useRef(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        const [popularMovies, moviesUpcoming, nowPlaying, topRated] =
          await Promise.all([
            getPopularMovies(),
            getUpcomingMovies(),
            getNowPlayingMovies(),
            getTopRatedMovies(),
          ]);

        setMovies(popularMovies);
        setUpcomingMovies(moviesUpcoming);
        setNowPlayingMovies(nowPlaying);
        setTopRatedMovies(topRated);
      } catch (error) {
        console.error(error);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []);

  useEffect(() => {
    const containers = [
      popularScrollRef.current,
      upcomingScrollRef.current,
      nowPlayingScrollRef.current,
      topRatedScrollRef.current,
    ].filter(Boolean);

    const handlers = containers.map((container) => {
      let timeoutId;

      const handleScroll = () => {
        container.classList.add("is-scrolling");
        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
          container.classList.remove("is-scrolling");
        }, 900);
      };

      container.addEventListener("scroll", handleScroll);

      return () => {
        container.removeEventListener("scroll", handleScroll);
        clearTimeout(timeoutId);
      };
    });

    return () => {
      handlers.forEach((cleanup) => cleanup());
    };
  }, []);

  const visibleMovies = movies.slice(0, movieLimit);
  const visibleUpcomingMovies = upcomingMovies.slice(0, movieLimit);
  const visibleNowPlayingMovies = nowPlayingMovies.slice(0, movieLimit);
  const visibleTopRatedMovies = topRatedMovies.slice(0, movieLimit);
  const featuredMovie = movies[0];

  return (
    <div className="home">
      <NavBar />

      {featuredMovie && (
        <section
          className="hero-section"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(8,10,15,0.92) 0%, rgba(8,10,15,0.72) 34%, rgba(8,10,15,0.28) 60%, rgba(8,10,15,0.45) 100%), url(https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path})`,
          }}
        >
          <div className="hero-content">
            <span className="hero-badge">FEATURED</span>
            <h1>{featuredMovie.title}</h1>
            <div className="hero-meta">
              <span className="hero-rating">
                ★ {featuredMovie.vote_average.toFixed(1)}
              </span>
              <span>{featuredMovie.release_date?.split("-")[0]}</span>
              <span>
                {featuredMovie.genre_ids
                  ?.slice(0, 3)
                  .map((id) => {
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

                    return genres[id] || "Movie";
                  })
                  .join(" • ")}
              </span>
            </div>

            <p className="hero-description">{featuredMovie.overview}</p>

            <div className="hero-actions">
              <button
                type="button"
                className="hero-primary-btn"
                onClick={() => navigate(`/movie/${featuredMovie.id}`)}
              >
                ⓘ View Details
              </button>
              <button
                type="button"
                className={`hero-secondary-btn ${isFavorite(featuredMovie.id) ? "active" : ""}`}
                onClick={() =>
                  isFavorite(featuredMovie.id)
                    ? removeFromFavorites(featuredMovie.id)
                    : addToFavorites(featuredMovie)
                }
              >
                ♡ Favorite
              </button>
            </div>
          </div>
        </section>
      )}

      <section className="popular-category">
        <div className="popular-title">
          <h1>Popular</h1>
          <p>See All</p>
        </div>
        <div ref={popularScrollRef} className="movies-grid">
          {visibleMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="popular-category">
        <div className="popular-title">
          <h1>Upcoming</h1>
          <p>See All</p>
        </div>
        <div ref={upcomingScrollRef} className="movies-grid">
          {visibleUpcomingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="popular-category">
        <div className="popular-title">
          <h1>Now Playing</h1>
          <p>See All</p>
        </div>
        <div ref={nowPlayingScrollRef} className="movies-grid">
          {visibleNowPlayingMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>

      <section className="popular-category">
        <div className="popular-title">
          <h1>Top Rated</h1>
          <p>See All</p>
        </div>
        <div ref={topRatedScrollRef} className="movies-grid">
          {visibleTopRatedMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
