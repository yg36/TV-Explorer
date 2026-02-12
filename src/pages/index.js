import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Film, Sparkles, TrendingUp, Sun, Moon } from "lucide-react";
import {
  searchShows,
  getShowDetails,
  getShowCast
} from "../services/tvmazeService";
import ShowGrid from "../components/ShowGrid";
import DetailsDrawer from "../components/DetailsDrawer";
import Loader from "../components/Loader";

export default function Home() {
  const [query, setQuery] = useState("");
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [details, setDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [castLoading, setCastLoading] = useState(false);

  const [theme, setTheme] = useState("dark");

  const debounceRef = useRef(null);

  /* ---------------- THEME INIT ---------------- */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* ---------------- SEARCH ---------------- */
  useEffect(() => {
    if (query.length < 2) {
      setShows([]);
      return;
    }

    clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        setError(null);
        const results = await searchShows(query);
        setShows(results);
      } catch {
        setError("Search failed. Please try again.");
      } finally {
        setLoading(false);
      }
    }, 400);

    return () => clearTimeout(debounceRef.current);
  }, [query]);

  useEffect(() => {
  if (details) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };
}, [details]);



  /* ---------------- SELECT SHOW ---------------- */
  const handleSelect = async (id) => {
    setDetailsLoading(true);
    setCastLoading(true);

    try {
      const showData = await getShowDetails(id);
      setDetails(showData);
      setDetailsLoading(false);

      const castData = await getShowCast(id);
      setCast(castData);
      setCastLoading(false);
    } catch {
      setError("Failed to load details.");
    }
  };

  return (
    <div className="app-container">

      <div className="background-grid" />
      <div className="background-glow glow-left" />
      <div className="background-glow glow-right" />

      <div className="content-wrapper">

        {/* NAVBAR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="navbar"
        >
          <div className="navbar-left">
            <Film size={26} />
            <span className="brand-title">Explorer</span>
          </div>

          <div className="navbar-right">
            <span className="nav-item">
              <Sparkles size={16} /> Discover
            </span>
            <span className="nav-item">
              <TrendingUp size={16} /> Trending
            </span>

            <button
              className="theme-toggle"
              onClick={() =>
                setTheme(theme === "dark" ? "light" : "dark")
              }
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </motion.div>

        {/* HERO */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="hero"
        >
          <h1 className="hero-title">
            Discover Movies & Series
          </h1>

          <p className="hero-subtitle">
            Search and explore detailed metadata, cast information,
            ratings and more — all in one elegant experience.
          </p>
        </motion.div>

        {/* SEARCH */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="search-wrapper"
        >
          <div className="search-box">
            <Search className="search-icon" size={20} />

            <input
              type="text"
              placeholder="Search for shows..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="search-input"
            />

            {query && (
              <button
                onClick={() => setQuery("")}
                className="clear-btn"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </motion.div>

        {/* STATE */}
        <div className="state-wrapper">
          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                key="error"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="error-text"
              >
                {error}
              </motion.p>
            )}

            {loading && (
              <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <Loader text="Searching..." />
              </motion.div>
            )}

            {!loading && shows.length === 0 && query.length >= 2 && (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="empty-state"
              >
                <p>No results found.</p>
                <p>Try searching for something else.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* RESULTS */}
        {shows.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="results-section"
          >
            <div className="results-header">
              <h2>Results</h2>
              <span>{shows.length} found</span>
            </div>

            <ShowGrid shows={shows} onSelect={handleSelect} />
          </motion.div>
        )}
      </div>

      <DetailsDrawer
        show={details}
        cast={cast}
        loading={detailsLoading}
        castLoading={castLoading}
        onClose={() => {
          setDetails(null);
          setCast([]);
        }}
      />
    </div>
  );
}
