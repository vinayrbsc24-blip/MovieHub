import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        🎬 MovieHub
      </Link>

      <div className="nav-links">
        <Link
          to="/"
          className={location.pathname === "/" ? "active" : ""}
        >
          Home
        </Link>

        <Link
          to="/movies"
          className={location.pathname === "/movies" ? "active" : ""}
        >
          Movies
        </Link>

        <Link
          to="/favorites"
          className={location.pathname === "/favorites" ? "active" : ""}
        >
          ❤️ Favorites
        </Link>

        <Link
          to="/add-movie"
          className={location.pathname === "/add-movie" ? "active" : ""}
        >
          + Add Movie
        </Link>

        <Link
          to="/about"
          className={location.pathname === "/about" ? "active" : ""}
        >
          About
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;