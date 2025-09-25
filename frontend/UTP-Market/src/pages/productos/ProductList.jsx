import React, { useState } from "react";
import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  // Estado de carrito
  const [cart, setCart] = useState([]);

  // Estado de wishlist (ids de productos)
  const [wishlist, setWishlist] = useState([]);

  // Handler para carrito
  const handleAddToCart = (product) => {
    setCart((prev) => [...prev, product]);
    console.log("🛒 Añadido al carrito:", product);
  };

  // Handler para wishlist
  const handleToggleWishlist = (product, state) => {
    setWishlist((prev) => {
      if (state) {
        console.log("❤️ Agregado a wishlist:", product);
        return [...prev, product.id];
      } else {
        console.log("💔 Quitado de wishlist:", product);
        return prev.filter((id) => id !== product.id);
      }
    });
  };

  return (
    <div className="container my-4">
      {/* Resumen arriba */}
      <div className="mb-4">
        <h2 className="h4">Lista de productos</h2>
        <p className="text-muted mb-0">
          Carrito: {cart.length} items | Wishlist: {wishlist.length} items
        </p>
      </div>

      {/* Grid de productos */}
      <div className="row g-4">
        {products.length === 0 ? (
          <p className="text-center text-muted">No hay productos disponibles</p>
        ) : (
          products.map((p) => (
            <div key={p.id} className="col-12 col-sm-6 col-lg-4">
              <ProductCard
                product={p}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
