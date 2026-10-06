import { useEffect, useState } from "react";
import moviesData from "../data/movies";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import GenreFilter from "../components/GenreFilter";
import Footer from "../components/Footer";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
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

  const genres = [...new Set(movies.map((movie) => movie.genre))];

  const filteredMovies = movies.filter((movie) => {
    const matchesSearch = movie.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesGenre =
      genre === "All" || movie.genre === genre;

    return matchesSearch && matchesGenre;
  });

  return (
    <div>
      <main className="container page-container">
        <div className="page-heading">
          <span className="section-label">EXPLORE</span>
          <h1>All Movies</h1>
          <p>
            Search and filter through our movie collection.
          </p>
        </div>

        <div className="filter-area">
          <SearchBar
            search={search}
            setSearch={setSearch}
          />

          <GenreFilter
            genre={genre}
            setGenre={setGenre}
            genres={genres}
          />
        </div>

        <div className="result-info">
          Showing <strong>{filteredMovies.length}</strong> movies
        </div>

        {filteredMovies.length > 0 ? (
          <div className="movie-grid">
            {filteredMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isFavorite={favorites.includes(movie.id)}
                onFavorite={handleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div>🎬</div>
            <h2>No Movies Found</h2>
            <p>Try changing your search or genre filter.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Movies;