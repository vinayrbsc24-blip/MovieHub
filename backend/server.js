import express from "express";
import cors from "cors";

import movieRoutes from "./routes/movieRoutes.js";

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "MovieHub API is running successfully"
  });
});

app.use("/api/movies", movieRoutes);

app.listen(PORT, () => {
  console.log(`MovieHub backend running at http://localhost:${PORT}`);
});