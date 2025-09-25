import PropTypes from "prop-types";

export default function SideBar({
  categories,
  onFilter,
  onSort,
  activeCategory,
  sortValue,
}) {
  return (
    <aside className="w-full sm:w-60 p-4 border-r bg-gray-50 shadow-sm">
      {/* Categorías */}
      <h3 className="font-bold text-lg mb-3 text-gray-800 border-b pb-2">
        Categorías
      </h3>
      <ul className="space-y-2">
        <li
          role="button"
          onClick={() => onFilter("all")}
          className={`cursor-pointer px-2 py-1 rounded transition ${
            activeCategory === "all"
              ? "bg-blue-500 text-white"
              : "hover:bg-blue-100 hover:text-blue-600"
          }`}
        >
          Todos
        </li>
        {categories.length === 0 ? (
          <p className="text-gray-500 italic">No hay categorías</p>
        ) : (
          categories.map((cat) => (
            <li
              key={cat}
              role="button"
              onClick={() => onFilter(cat)}
              className={`cursor-pointer px-2 py-1 rounded transition ${
                activeCategory === cat
                  ? "bg-blue-500 text-white"
                  : "hover:bg-blue-100 hover:text-blue-600"
              }`}
            >
              {cat}
            </li>
          ))
        )}
      </ul>

      {/* Ordenar por */}
      <div className="mt-6">
        <h3 className="font-bold text-lg mb-2 text-gray-800 border-b pb-2">
          Ordenar por
        </h3>
        <select
          value={sortValue}
          onChange={(e) => onSort(e.target.value)}
          className="w-full p-2 border rounded focus:ring focus:ring-blue-200"
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
