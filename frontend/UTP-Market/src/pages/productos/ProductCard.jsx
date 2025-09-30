import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ProductCard({ product, onAddToCart, onToggleWishlist }) {
  const formatPrice = (price) => `$${price.toFixed(2)}`;

  return (
    <div className="card shadow-sm h-100 border-0">
      {/* Imagen */}
      <div className="position-relative">
        <img
          src={product?.image || "https://via.placeholder.com/300x200"}
          className="card-img-top"
          alt={product?.name || "Producto"}
        />

        {/* Wishlist */}
        <button
          className="btn btn-light position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
          onClick={() => onToggleWishlist(product)}
        >
          {product.isWishlisted ? "❤️" : "🤍"}
        </button>
      </div>

      {/* Contenido */}
      <div className="card-body">
        {/* Badge si el producto es "new" */}
        {product?.isNew === "new" && (
          <span className="badge bg-warning text-dark px-3 py-2 small">New</span>
        )}

        {/* Nombre con link */}
        <Link
          to={`/products/${product.id}`}
          className="text-decoration-none text-reset"
        >
          <h3 className="mt-3 h5 mb-1">{product?.name || "Product name"}</h3>
        </Link>

        <p className="text-muted mb-3">
          {product?.price != null ? formatPrice(product.price) : "—"}
        </p>

        {/* Botón de añadir al carrito */}
        <button
          className="btn btn-success w-100"
          onClick={(e) => {
            e.target.classList.add("btn-dark"); // cambia a verde oscuro
            setTimeout(() => e.target.classList.remove("btn-dark"), 300);
            onAddToCart(product);
          }}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
    category: PropTypes.string,
    isNew: PropTypes.string,
    isWishlisted: PropTypes.bool,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
  onToggleWishlist: PropTypes.func.isRequired,
};
