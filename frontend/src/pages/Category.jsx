import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import NavBar from "../components/NavBar";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "../services/api";
import "../css/Category.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

const categories = {
  popular: { title: "Popular Movies", load: getPopularMovies },
  upcoming: { title: "Upcoming Movies", load: getUpcomingMovies },
  "now-playing": { title: "Now Playing", load: getNowPlayingMovies },
  "top-rated": { title: "Top Rated Movies", load: getTopRatedMovies },
};

function Category() {
  const { category } = useParams();
  const selectedCategory = categories[category];
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = `${selectedCategory?.title || "Category"} | WatchListic`;

    if (!selectedCategory) {
      setLoading(false);
      return;
    }

    const loadCategory = async () => {
      try {
        setMovies(await selectedCategory.load());
      } catch (loadError) {
        console.error(loadError);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadCategory();
  }, [selectedCategory]);

  return (
    <div className="category-page">
      <NavBar />
      <main className="category-content">
        <Link className="category-back" to="/">
          <span aria-hidden="true">
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>{" "}
          Back to home
        </Link>

        {selectedCategory ? (
          <>
            <div className="category-heading">
              <div>
                <p className="category-eyebrow">Browse collection</p>
                <h1>{selectedCategory.title}</h1>
              </div>
            </div>

            {loading ? (
              <p className="category-message">Loading movies...</p>
            ) : error ? (
              <p className="category-message">{error}</p>
            ) : movies.length === 0 ? (
              <p className="category-message">No movies found.</p>
            ) : (
              <div className="category-movies">
                {movies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
          </>
        ) : (
          <p className="category-message">Category not found.</p>
        )}
      </main>
    </div>
  );
}

export default Category;
