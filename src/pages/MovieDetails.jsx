import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import moviesData from "../data/movies";
import Footer from "../components/Footer";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const selectedMovie = moviesData.find(
      (item) => item.id === Number(id)
    );

    setMovie(selectedMovie);

    const favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    setIsFavorite(favorites.includes(Number(id)));
  }, [id]);

  const toggleFavorite = () => {
    let favorites =
      JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.includes(Number(id))) {
      favorites = favorites.filter(
        (favoriteId) => favoriteId !== Number(id)
      );
      setIsFavorite(false);
    } else {
      favorites.push(Number(id));
      setIsFavorite(true);
    }

    localStorage.setItem(
      "favorites",
      JSON.stringify(favorites)
    );
  };

  if (!movie) {
    return (
      <div className="empty-state">
        <h2>Movie not found</h2>
        <Link to="/movies" className="primary-btn">
          Back to Movies
        </Link>
      </div>
    );
  }

  return (
    <div>
      <main className="container">
        <Link to="/movies" className="back-link">
          ← Back to Movies
        </Link>

        <section className="details-page">
          <div className="details-poster">
            <img src={movie.poster} alt={movie.title} />
          </div>

          <div className="details-content">
            <span className="section-label">
              {movie.genre.toUpperCase()}
            </span>

            <h1>{movie.title}</h1>

            <div className="details-meta">
              <span>📅 {movie.year}</span>
              <span>⏱️ {movie.duration}</span>
              <span>⭐ {movie.rating}/10</span>
            </div>

            <p className="details-description">
              {movie.description}
            </p>

            <div className="details-actions">
              <button
                className="primary-btn"
                onClick={toggleFavorite}
              >
                {isFavorite
                  ? "❤️ Remove from Favorites"
                  : "🤍 Add to Favorites"}
              </button>

              <Link to="/movies" className="secondary-btn">
                Browse More
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default MovieDetails;