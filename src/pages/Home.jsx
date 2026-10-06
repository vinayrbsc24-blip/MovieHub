import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import moviesData from "../data/movies";
import MovieCard from "../components/MovieCard";
import MovieStatistics from "../components/MovieStatistics";
import Footer from "../components/Footer";

function Home() {
  const [movies, setMovies] = useState([]);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setMovies(moviesData);

    const savedFavorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setFavorites(savedFavorites);
  }, []);

  const handleFavorite = (id) => {
    let updatedFavorites;

    if (favorites.includes(id)) {
      updatedFavorites = favorites.filter(
        (favoriteId) => favoriteId !== id
      );
    } else {
      updatedFavorites = [...favorites, id];
    }

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updatedFavorites)
    );
  };

  return (
    <div>
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">WELCOME TO MOVIEHUB</span>

          <h1>
            Discover Your
            <br />
            <span>Next Favorite Movie</span>
          </h1>

          <p>
            Explore movies, check ratings, manage your favorites,
            and discover something amazing to watch.
          </p>

          <div className="hero-buttons">
            <Link to="/movies" className="primary-btn">
              Explore Movies →
            </Link>

            <Link to="/add-movie" className="secondary-btn">
              + Add Movie
            </Link>
          </div>
        </div>

        <div className="hero-visual">
          <div className="film-icon">🎬</div>
          <div className="hero-circle">⭐</div>
          <div className="hero-circle small">🍿</div>
        </div>
      </section>

      <main className="container">
        <MovieStatistics movies={movies} />

        <section className="section-header">
          <div>
            <span className="section-label">TRENDING NOW</span>
            <h2>Popular Movies</h2>
          </div>

          <Link to="/movies" className="view-all">
            View All →
          </Link>
        </section>

        <div className="movie-grid">
          {movies.slice(0, 4).map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              isFavorite={favorites.includes(movie.id)}
              onFavorite={handleFavorite}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Home;