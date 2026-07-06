import { useState, useMemo } from "react";
import { LINKS, CATEGORIES } from "./data";
import "./App.css";

const CATEGORY_COLORS = {
  Chassidus: { bg: "#EAE0F5", text: "#5B2D8E" },
  Parsha: { bg: "#DFF0E8", text: "#1A6640" },
  Kabbalah: { bg: "#E8EBF7", text: "#2D3A6B" },
  Tool: { bg: "#FDF0D5", text: "#7A5200" },
  Site: { bg: "#F7E8E8", text: "#7A2020" },
  Other: { bg: "#EBEBEB", text: "#444444" },
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
