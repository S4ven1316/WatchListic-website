const API_KEY = "0981558e2c5708a1a08eab2092108b31";
const BASE_URL = "https://api.themoviedb.org/3";

export const getMovieDetails = async (movieId) => {
  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
  );

  const data = await response.json();
  return data;
};

export const getPopularMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);

  const data = await response.json();
  return data.results;
};

export const getTopRatedMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/top_rated?api_key=${API_KEY}`,
  );

  const data = await response.json();
  return data.results;
};

export const getNowPlayingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/now_playing?api_key=${API_KEY}`,
  );

  const data = await response.json();
  return data.results;
};

export const getUpcomingMovies = async () => {
  const response = await fetch(`${BASE_URL}/movie/upcoming?api_key=${API_KEY}`);

  const data = await response.json();
  return data.results;
};

export const getTrendingMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`,
  );

  const data = await response.json();
  return data.results;
};

export const searchMovies = async (query) => {
  const response = await fetch(
    `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`,
  );

  const data = await response.json();
  return data.results;
};
