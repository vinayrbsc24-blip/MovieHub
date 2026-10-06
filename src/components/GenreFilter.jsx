function GenreFilter({ genre, setGenre, genres }) {
  return (
    <div className="filter-box">
      <label>Genre:</label>

      <select
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
      >
        <option value="All">All Genres</option>

        {genres.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
}

export default GenreFilter;