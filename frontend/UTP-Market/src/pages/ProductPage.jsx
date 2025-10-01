import { useState, useEffect } from "react";
import SideBar from "./productos/SideBar"
import SearchBar from "./productos/SearchBar";
import ProductList from "./productos/ProductList";
import Navbar from "../components/common/Navbar";
import { useLocation } from "react-router-dom";
import Footer from "../components/common/Footer";
import { getProductos, getCategorias } from "../services/productService";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductos();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCategories = async () => {
      try {
        const data = await getCategorias();
        setCategories(data.map(c => c.nombre));
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // Estados
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortValue, setSortValue] = useState("default");
  const [searchQuery, setSearchQuery] = useState("");

  // Capturar query param de categoría desde el Navbar
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryFromUrl = params.get("category");
    if (categoryFromUrl) {
      setActiveCategory(categoryFromUrl);
    }
  }, [location.search]);

  // Filtrado por categoría
  const filteredByCategory =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  // Filtrado por búsqueda
  const filteredBySearch = filteredByCategory.filter((p) =>
    p.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Ordenamiento
  const sortedProducts = [...filteredBySearch].sort((a, b) => {
    switch (sortValue) {
      case "price-asc":
        return a.precio - b.precio;
      case "price-desc":
        return b.precio - a.precio;
      case "name-asc":
        return a.nombre.localeCompare(b.nombre);
      case "name-desc":
        return b.nombre.localeCompare(a.nombre);
      default:
        return 0;
    }
  });

  return (
    <div className="container-fluid d-flex flex-column min-vh-100 p-0">
      <Navbar />
      <SearchBar onSearch={setSearchQuery} />

      <div className="row flex-grow-1 m-0">
        {/* Sidebar */}
        <div className="col-12 col-md-3 col-lg-2">
          <SideBar
            categories={categories}
            onFilter={setActiveCategory}
            onSort={setSortValue}
            activeCategory={activeCategory}
            sortValue={sortValue}
          />
        </div>

        {/* Lista de productos */}
        <div className="col-12 col-md-9 col-lg-10">
          <ProductList products={sortedProducts} />
        </div>
      </div>

      <Footer />
    </div>
  );
}
