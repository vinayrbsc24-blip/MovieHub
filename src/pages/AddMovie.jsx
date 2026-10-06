import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

function AddMovie() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    genre: "Action",
    year: "",
    rating: "",
    duration: "",
    poster: "",
    description: ""
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.year ||
      !formData.rating ||
      !formData.description
    ) {
      setMessage("Please fill all required fields.");
      return;
    }

    const savedMovies =
      JSON.parse(localStorage.getItem("customMovies")) || [];

    const newMovie = {
      ...formData,
      id: Date.now(),
      year: Number(formData.year),
      rating: Number(formData.rating),
      poster:
        formData.poster ||
        "https://via.placeholder.com/500x750?text=Movie"
    };

    localStorage.setItem(
      "customMovies",
      JSON.stringify([...savedMovies, newMovie])
    );

    setMessage("Movie added successfully!");

    setTimeout(() => {
      navigate("/movies");
    }, 1000);
  };

  return (
    <div>
      <main className="container page-container">
        <div className="page-heading">
          <span className="section-label">MANAGE MOVIES</span>
          <h1>➕ Add New Movie</h1>
          <p>Add a new movie to your collection.</p>
        </div>

        <form className="movie-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Movie Title *</label>
            <input
              type="text"
              name="title"
              placeholder="Enter movie title"
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Genre *</label>

              <select
                name="genre"
                value={formData.genre}
                onChange={handleChange}
              >
                <option>Action</option>
                <option>Drama</option>
                <option>Comedy</option>
                <option>Sci-Fi</option>
                <option>Thriller</option>
                <option>Horror</option>
                <option>Romance</option>
                <option>Animation</option>
              </select>
            </div>

            <div className="form-group">
              <label>Release Year *</label>

              <input
                type="number"
                name="year"
                placeholder="2026"
                value={formData.year}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Rating *</label>

              <input
                type="number"
                name="rating"
                min="0"
                max="10"
                step="0.1"
                placeholder="8.5"
                value={formData.rating}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Duration</label>

              <input
                type="text"
                name="duration"
                placeholder="2h 15m"
                value={formData.duration}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Poster URL</label>

            <input
              type="url"
              name="poster"
              placeholder="https://example.com/poster.jpg"
              value={formData.poster}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Description *</label>

            <textarea
              name="description"
              rows="5"
              placeholder="Enter movie description..."
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          {message && (
            <div className="form-message">
              {message}
            </div>
          )}

          <button type="submit" className="primary-btn">
            Add Movie 🎬
          </button>
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default AddMovie;