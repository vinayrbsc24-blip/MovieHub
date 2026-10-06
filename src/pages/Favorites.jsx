import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";

function Favorites() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    setFavorites(savedFavorites);
  }, []);

  const removeFavorite = (movieId) => {
    const updatedFavorites = favorites.filter(
      (movie) => movie.id !== movieId
    );

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <main className="page-container">
        <section className="page-header">
          <h1>❤️ My Favorites</h1>
          <p>Your favorite movies are saved here.</p>
        </section>

        {favorites.length === 0 ? (
          <div className="empty-state">
            <h2>No Favorite Movies Yet</h2>
            <p>
              Add movies to your favorites and they will appear here.
            </p>
          </div>
        ) : (
          <div className="movie-grid">
            {favorites.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onFavorite={() => removeFavorite(movie.id)}
              />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Favorites;