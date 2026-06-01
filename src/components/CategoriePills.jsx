export default function CategoriePills({ categories, active, setActive }) {
  return (
    <div style={{ display: "flex", gap: "0.5rem", overflowX: "auto", padding: "0.5rem" }}>
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "20px",
            background: active === cat ? "#C34A2C" : "#eee",
            color: active === cat ? "white" : "black",
            border: "none",
            cursor: "pointer"
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  )
}
