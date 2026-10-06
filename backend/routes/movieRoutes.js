import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataPath = path.resolve(
  __dirname,
  "../data/movies.json"
);

console.log("Movie data path:", dataPath);

function readMovies() {
  try {
    const data = fs.readFileSync(dataPath, "utf8");

    console.log("Movie JSON loaded successfully.");

    return JSON.parse(data);
  } catch (error) {
    console.error("ERROR READING MOVIES.JSON:");
    console.error(error);

    throw error;
  }
}

function writeMovies(movies) {
  fs.writeFileSync(
    dataPath,
    JSON.stringify(movies, null, 2),
    "utf8"
  );
}

// GET all movies
router.get("/", (req, res) => {
  try {
    const movies = readMovies();

    res.json(movies);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load movies",
      error: error.message
    });
  }
});

// GET movie by ID
router.get("/:id", (req, res) => {
  try {
    const movies = readMovies();

    const movie = movies.find(
      (item) => item.id === Number(req.params.id)
    );

    if (!movie) {
      return res.status(404).json({
        message: "Movie not found"
      });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({
      message: "Failed to load movie",
      error: error.message
    });
  }
});

// POST movie
router.post("/", (req, res) => {
  try {
    const movies = readMovies();

    const {
      title,
      genre,
      year,
      rating,
      duration,
      poster,
      description
    } = req.body;

    if (!title || !genre || !year || !rating) {
      return res.status(400).json({
        message:
          "Title, genre, year and rating are required"
      });
    }

    const newMovie = {
      id:
        movies.length > 0
          ? Math.max(...movies.map((movie) => movie.id)) + 1
          : 1,
      title,
      genre,
      year: Number(year),
      rating: Number(rating),
      duration: duration || "2h",
      poster:
        poster ||
        "https://via.placeholder.com/500x750?text=Movie",
      description:
        description || "No description available."
    };

    movies.push(newMovie);
    writeMovies(movies);

    res.status(201).json(newMovie);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add movie",
      error: error.message
    });
  }
});

// PUT movie
router.put("/:id", (req, res) => {
  try {
    const movies = readMovies();

    const index = movies.findIndex(
      (movie) => movie.id === Number(req.params.id)
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Movie not found"
      });
    }

    movies[index] = {
      ...movies[index],
      ...req.body,
      id: movies[index].id
    };

    writeMovies(movies);

    res.json(movies[index]);
  } catch (error) {
    res.status(500).json({
      message: "Failed to update movie",
      error: error.message
    });
  }
});

// DELETE movie
router.delete("/:id", (req, res) => {
  try {
    const movies = readMovies();

    const filteredMovies = movies.filter(
      (movie) => movie.id !== Number(req.params.id)
    );

    if (movies.length === filteredMovies.length) {
      return res.status(404).json({
        message: "Movie not found"
      });
    }

    writeMovies(filteredMovies);

    res.json({
      message: "Movie deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete movie",
      error: error.message
    });
  }
});

export default router;