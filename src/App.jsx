import { useState } from "react";
import SearchBar from "./components/SearchBar";
import { getUser, getRepos } from "./services/githubApi";

function App() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchGitHubData = async (username) => {
    try {
      console.log("Searching:", username);
      setError("");
      setLoading(true);
      const userData = await getUser(username);
      const repoData = await getRepos(username);

      setUser(userData);
      setRepos(repoData);
      setLoading(false);
    } catch (err) {
  console.log("ERROR:", err);
  console.log("RESPONSE:", err.response);
  console.log("DATA:", err.response?.data);

  setLoading(false);
  setError("User not found");
  setUser(null);
  setRepos([]);
}
  };

  const totalStars = repos.reduce(
    (sum, repo) => sum + repo.stargazers_count,
    0
  );

  const languages = [
    ...new Set(
      repos
        .map((repo) => repo.language)
        .filter(Boolean)
    ),
  ];
  const languageCount = {};

repos.forEach((repo) => {
  if (repo.language) {
    languageCount[repo.language] =
      (languageCount[repo.language] || 0) + 1;
  }
});

const sortedLanguages =
  Object.entries(languageCount).sort(
    (a, b) => b[1] - a[1]
  );
  return (
  <div className="app">
    <div className="hero">

  <div className="orb orb1"></div>
  <div className="orb orb2"></div>

  <div className="hero-content">
    <div className="bg-text">
  GITHUB
</div>
    <span className="badge">
      🚀 GitHub Intelligence Platform
    </span>

    <h1 className="hero-title">
      GitScope
    </h1>

    <h2 className="hero-subtitle">
      Discover the Story Behind Every Developer
    </h2>

    <p className="hero-text">
      Analyze repositories, languages, stars,
      contributions and coding trends instantly.
    </p>

    <button
      className="hero-btn"
      onClick={() =>
        document
          .getElementById("search")
          ?.scrollIntoView({
            behavior: "smooth",
          })
      }
    >
      Explore Profiles →
    </button>
    <div className="floating-card card1">
  ⭐ 2.5M+ Repositories Analyzed
</div>

<div className="floating-card card2">
  🚀 Real-Time GitHub Insights
</div>

<div className="floating-card card3">
  💻 Language Analytics
</div>
  </div>

</div>
<div className="features">

  <div className="feature-card">
    🚀 Real-Time GitHub Analysis
  </div>

  <div className="feature-card">
    📊 Repository Insights
  </div>

  <div className="feature-card">
    💻 Language Analytics
  </div>

  <div className="feature-card">
    ⭐ Developer Statistics
  </div>

</div>
      <div id="search">
      <SearchBar onSearch={fetchGitHubData} />
        </div>
        {loading && (
  <h2
    style={{
      textAlign: "center",
      marginTop: "30px",
      color: "#58a6ff",
    }}
  >
    Loading GitHub Profile...
  </h2>
)}
      {error && <h2>{error}</h2>}

      {user && (
        <div className="profile-card">
          <img
            src={user.avatar_url}
            alt={user.login}
          />

          <h2>{user.name || user.login}</h2>

          <div className="profile-stats">
            <p>👥 Followers: {user.followers}</p>
            <p>👤 Following: {user.following}</p>
            <p>📦 Repositories: {user.public_repos}</p>
          </div>

          <p>{user.bio || "No bio available"}</p>

          <p>
            📍 {user.location || "Location not available"}
          </p>

          <p>
            🏢 {user.company || "No company listed"}
          </p>

          <p>
            📅 Joined:{" "}
            {new Date(
              user.created_at
            ).toLocaleDateString()}
          </p>
          <a
  href={user.html_url}
  target="_blank"
  rel="noreferrer"
  className="profile-btn"
>
  View GitHub Profile →
</a>
        </div>
      )}

      {user && (
        <div className="stats-grid">
          <div className="stat-card">
            <h2>⭐</h2>
            <h3>{totalStars}</h3>
            <p>Total Stars</p>
          </div>

          <div className="stat-card">
            <h2>📦</h2>
            <h3>{user.public_repos}</h3>
            <p>Repositories</p>
          </div>

          <div className="stat-card">
            <h2>👥</h2>
            <h3>{user.followers}</h3>
            <p>Followers</p>
          </div>

          <div className="stat-card">
            <h2>💻</h2>
            <h3>{languages.length}</h3>
            <p>Languages</p>
          </div>
        </div>
      )}
      {sortedLanguages.length > 0 && (
  <div className="language-card">
    <h2>Top Languages</h2>

    {sortedLanguages.map(([lang, count]) => (
      <div
        className="language-row"
        key={lang}
      >
        <span>{lang}</span>
        <span>{count} repos</span>
      </div>
    ))}
  </div>
)}

      {repos.length > 0 && (
        <>
          <h2
            style={{
              marginBottom: "20px",
              marginTop: "30px",
            }}
          >
            Repositories
          </h2>

          <div className="repo-grid">
            {repos.map((repo) => (
              <div
                className="repo-card"
                key={repo.id}
              >
                <h3>{repo.name}</h3>

                <p>
                  ⭐ {repo.stargazers_count}
                </p>

                <p>
                  💻{" "}
                  {repo.language ||
                    "Not Specified"}
                </p>
                <a
  href={repo.html_url}
  target="_blank"
  rel="noreferrer"
  className="repo-btn"
>
  View Repository →
</a>
              </div>
            ))}
          </div>
        </>
      )}
      <footer className="footer">
  Built with React • GitHub API • GitScope 🚀
</footer>
    </div>
  );
}

export default App;