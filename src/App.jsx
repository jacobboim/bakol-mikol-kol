import { useState, useMemo } from "react";
import { LINKS, CATEGORIES } from "./data";
import "./App.css";

const CATEGORY_COLORS = {
  Chassidus: { bg: "#e4d8f5", text: "#5b2d8e" },
  Parsha:    { bg: "#d0eedf", text: "#166534" },
  Kabbalah:  { bg: "#d0e8f5", text: "#0e5a7a" },
  Tool:      { bg: "#d6eef7", text: "#0e7490" },
  Site:      { bg: "#dce9ef", text: "#1e4d62" },
  Other:     { bg: "#dce9ef", text: "#4d6675" },
};

function CategoryPill({ category }) {
  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS.Other;
  return (
    <span
      className="category-pill"
      style={{ background: colors.bg, color: colors.text }}
    >
      {category}
    </span>
  );
}

function Card({ item }) {
  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className="card"
    >
      <div className="card-top">
        <CategoryPill category={item.category} />
      </div>
      <h3 className="card-title">{item.title}</h3>
      <p className="card-desc">{item.description}</p>
      <span className="card-arrow" aria-hidden="true">
        ↗
      </span>
    </a>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    return LINKS.filter((item) => {
      const matchesCategory =
        activeCategory === "All" || item.category === activeCategory;
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  return (
    <div className="page">
      {/* Watermark letter */}
      {/* <div className="watermark" aria-hidden="true">
        פ
      </div> */}

      <header className="header">
        <h1 className="header-title">Bakol Mikol Kol</h1>
        <p className="header-subtitle">
          Translations, tools, and Torah resources — all in one place
        </p>
      </header>

      <div className="controls">
        <input
          className="search-input"
          type="search"
          placeholder="Search by title or topic…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search"
        />
        <div
          className="filter-pills"
          role="group"
          aria-label="Filter by category"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <main className="grid" aria-label="Links">
        {filtered.length > 0 ? (
          filtered.map((item) => <Card key={item.id} item={item} />)
        ) : (
          <p className="empty">
            No results found — try a different search or category.
          </p>
        )}
      </main>
    </div>
  );
}
