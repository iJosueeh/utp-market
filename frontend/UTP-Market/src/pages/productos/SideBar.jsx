import PropTypes from "prop-types";

export default function SideBar({
  categories,
  onFilter,
  onSort,
  activeCategory,
  sortValue,
}) {
  return (
    <aside
      className="w-100 p-3 border-end shadow-sm"
      style={{ backgroundColor: "#F2F2F2" }}
    >
      {/* Categorías */}
      <h3
        className="fw-bold fs-5 mb-3 border-bottom pb-2"
        style={{ color: "#222222" }}
      >
        Categorías
      </h3>

      <div className="d-flex flex-column gap-2">
        <button
          onClick={() => onFilter("all")}
          className="btn btn-sm"
          style={{
            backgroundColor: activeCategory === "all" ? "#B50D30" : "transparent",
            color: activeCategory === "all" ? "#fff" : "#B50D30",
            border: `1px solid #B50D30`,
          }}
        >
          Todos
        </button>

        {categories.length === 0 ? (
          <p className="text-muted fst-italic">No hay categorías</p>
        ) : (
          categories.map((cat) => (
            <button
              key={cat}
              onClick={() => onFilter(cat)}
              className="btn btn-sm text-start"
              style={{
                backgroundColor: activeCategory === cat ? "#B50D30" : "transparent",
                color: activeCategory === cat ? "#fff" : "#B50D30",
                border: `1px solid #B50D30`,
              }}
            >
              {cat}
            </button>
          ))
        )}

        {/* Botón para limpiar filtros */}
        <button
          onClick={() => {
            onFilter("all");
            onSort("default");
          }}
          className="btn btn-sm"
          style={{
            backgroundColor: "#222222",
            color: "#fff",
            border: "1px solid #222222",
          }}
        >
          Limpiar filtros
        </button>
      </div>

      {/* Ordenar por */}
      <div className="mt-4">
        <h3
          className="fw-bold fs-6 mb-2 border-bottom pb-2"
          style={{ color: "#222222" }}
        >
          Ordenar por
        </h3>
        <select
          value={sortValue}
          onChange={(e) => onSort(e.target.value)}
          className="form-select form-select-sm"
          style={{ borderColor: "#B50D30", color: "#222222" }}
        >
          <option value="default">Por defecto</option>
          <option value="price-asc">Precio: Menor a Mayor</option>
          <option value="price-desc">Precio: Mayor a Menor</option>
          <option value="name-asc">Nombre A-Z</option>
          <option value="name-desc">Nombre Z-A</option>
        </select>
      </div>
    </aside>
  );
}

SideBar.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  onFilter: PropTypes.func.isRequired,
  onSort: PropTypes.func.isRequired,
  activeCategory: PropTypes.string.isRequired,
  sortValue: PropTypes.string.isRequired,
};
