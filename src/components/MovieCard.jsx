import { Link } from "react-router-dom";

function MovieCard({ movie, isFavorite, onFavorite }) {
  return (
    <div className="movie-card">
      <div className="poster-container">
        <img
          src={movie.poster}
          alt={movie.title}
          className="movie-poster"
        />

        <button
          className={`favorite-btn ${isFavorite ? "favorite-active" : ""}`}
          onClick={() => onFavorite(movie.id)}
          title="Add to favorites"
        >
          {isFavorite ? "❤️" : "🤍"}
        </button>
      </div>

      <div className="movie-card-content">
        <h3>{movie.title}</h3>

        <div className="movie-info">
          <span>{movie.year}</span>
          <span>•</span>
          <span>{movie.genre}</span>
        </div>

        <div className="rating">
          ⭐ {movie.rating}/10
        </div>

        <Link to={`/movie/${movie.id}`} className="details-btn">
          View Details
        </Link>
      </div>
    </div>
  );
}

export default MovieCard;