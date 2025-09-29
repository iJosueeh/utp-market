import React, { useState } from "react";

export default function ProductList({ products }) {
  // Estado de carrito
  const [cart, setCart] = useState([]);

  // Estado de wishlist (ids de productos)
  const [wishlist, setWishlist] = useState([]);

  // Estado para mostrar alerta cuando agregas al carrito
  const [alert, setAlert] = useState(null);

  // Handler para añadir al carrito
  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    setAlert(`${product.name} añadido al carrito 🛒`);

    // La alerta desaparece automáticamente después de 2 segundos
    setTimeout(() => setAlert(null), 2000);

    console.log("🛒 Añadido al carrito:", product);
  };

  // Handler para toggle wishlist
  const handleToggleWishlist = (product) => {
    setWishlist((prev) =>
      prev.includes(product.id)
        ? prev.filter((id) => id !== product.id)
        : [...prev, product.id]
    );
  };

  // Función para generar reseñas ficticias
  const getFakeReviews = () => {
    const rating = (Math.random() * 2 + 3).toFixed(1); // 3.0 a 5.0
    const count = Math.floor(Math.random() * 200) + 1; // 1 a 200 reseñas
    return { rating, count };
  };

  return (
    <div className="container my-4">
      {/* Resumen arriba */}
      <div className="mb-4">
        <h2 className="h4 text-dark">Lista de productos</h2>
        <p className="mb-0 text-dark">
          Mostrando {products.length} producto{products.length !== 1 ? "s" : ""}
        </p>
        <p className="mb-0 text-dark">
          Carrito: {cart.length} | Wishlist: {wishlist.length}
        </p>
      </div>

      {/* Alerta */}
      {alert && (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
          {alert}
          <button
            type="button"
            className="btn-close"
            onClick={() => setAlert(null)}
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Grid de productos */}
      <div className="row g-4" style={{ backgroundColor: "#F2F2F2", borderRadius: "8px", padding: "10px" }}>
        {products.length === 0 ? (
          // Mensaje si no hay productos
          <div className="text-center text-dark">
            <i className="bi bi-box-seam fs-1 d-block mb-3"></i>
            <h5>No hay productos disponibles</h5>
            <p>Vuelve más tarde para ver nuevos artículos.</p>
          </div>
        ) : (
          products.map((p) => {
            // Generar datos ficticios
            const fakeReviews = getFakeReviews();
            const fakeDate = new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000)
              .toLocaleDateString();
            const stock = Math.floor(Math.random() * 50) + 1; // Stock aleatorio 1-50

            return (
              <div key={p.id} className="col-12 col-sm-6 col-lg-4 d-flex">
                <div className="card shadow-sm w-100 d-flex flex-column position-relative">

                  {/* Wishlist ícono */}
                  <button
                    className="btn btn-light btn-sm position-absolute top-0 end-0 m-2 rounded-circle shadow-sm"
                    onClick={() => handleToggleWishlist(p)}
                  >
                    {wishlist.includes(p.id) ? "❤️" : "🤍"}
                  </button>

                  {/* Imagen del producto */}
                  <img
                    src={p.image}
                    alt={p.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderTopLeftRadius: "0.375rem",
                      borderTopRightRadius: "0.375rem",
                    }}
                  />

                  <div className="card-body d-flex flex-column">
                    {/* Nombre y precio */}
                    <h5 className="card-title text-truncate text-dark">{p.name}</h5>
                    <p className="card-text fw-bold text-danger">S/. {p.price}</p>
                    <small className="text-dark">{p.category}</small>

                    {/* Stock */}
                    <p className="mb-1 text-dark"><strong>Stock:</strong> {stock} unidades</p>

                    {/* Fecha de publicación */}
                    <p className="mb-1 text-dark"><strong>Publicado:</strong> {fakeDate}</p>

                    {/* Reseñas */}
                    <p className="mb-2 text-dark">
                      <strong>⭐ {fakeReviews.rating}</strong> ({fakeReviews.count} reseñas)
                    </p>

                    {/* Botón para añadir al carrito */}
                    <button
                      onClick={() => handleAddToCart(p)}
                      className="btn btn-danger mt-auto"
                      title="Agregar al carrito"
                    >
                      Agregar al carrito
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
