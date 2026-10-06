import Footer from "../components/Footer";

function About() {
  return (
    <div>
      <main className="container page-container">
        <div className="page-heading">
          <span className="section-label">ABOUT PROJECT</span>
          <h1>About MovieHub</h1>
          <p>
            A React-based movie management mini project.
          </p>
        </div>

        <section className="about-card">
          <div className="about-icon">🎬</div>

          <h2>MovieHub</h2>

          <p>
            MovieHub is a full-stack movie management application
            developed using React.js and Express.js. The application
            allows users to explore movies, search and filter movies,
            view detailed movie information, manage favorites, and
            add new movies.
          </p>

          <h3>Technologies Used</h3>

          <div className="technology-grid">
            <div>⚛️ React.js</div>
            <div>🚀 Express.js</div>
            <div>🛣️ React Router</div>
            <div>📦 Node.js</div>
            <div>🎨 CSS3</div>
            <div>🔌 REST API</div>
          </div>

          <h3>CIE-2 Enhancements</h3>

          <ul className="feature-list">
            <li>🔍 Advanced movie search</li>
            <li>🎭 Genre filtering</li>
            <li>❤️ Favorites management</li>
            <li>📱 Responsive design</li>
            <li>➕ Add movie form</li>
          </ul>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default About;