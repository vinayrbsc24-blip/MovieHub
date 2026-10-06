import React from "react";

class MovieStatistics extends React.Component {
  render() {
    const { movies } = this.props;

    const totalMovies = movies.length;

    const averageRating =
      totalMovies > 0
        ? (
            movies.reduce((sum, movie) => sum + movie.rating, 0) /
            totalMovies
          ).toFixed(1)
        : 0;

    const genres = new Set(movies.map((movie) => movie.genre)).size;

    return (
      <div className="statistics">
        <div className="stat-card">
          <span className="stat-icon">🎬</span>
          <div>
            <h3>{totalMovies}</h3>
            <p>Total Movies</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <div>
            <h3>{averageRating}</h3>
            <p>Average Rating</p>
          </div>
        </div>

        <div className="stat-card">
          <span className="stat-icon">🎭</span>
          <div>
            <h3>{genres}</h3>
            <p>Genres</p>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieStatistics;