import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext";

import "./App.css";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Favorite from "./pages/Favorite";
import MovieDetails from "./pages/MovieDetails";

function App() {
  return (
    <MovieProvider>
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </main>
    </MovieProvider>
  );
}

export default App;
