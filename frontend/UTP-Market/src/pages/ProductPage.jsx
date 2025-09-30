import { useState, useEffect } from "react";
import SideBar from "./productos/SideBar"
import SearchBar from "./productos/SearchBar";
import ProductList from "./productos/ProductList";
import Navbar from "../components/common/Navbar";
import { useLocation } from "react-router-dom";
import Footer from "../components/common/Footer";

export default function ProductsPage() {
  // Productos de prueba (mock) con imágenes reales
  const [products] = useState([
    {
      id: 1,
      name: "Tutoría de Matemáticas",
      price: 25,
      category: "Tutorías universitarias",
      image: "https://www.aulaplaneta.com/sites/default/files/styles/article_detail/public/articles/images/recurso462.jpeg?itok=3rEnqGzj",
      isNew: "new",
    },
    {
      id: 2,
      name: "Guía de Álgebra",
      price: 10,
      category: "Guías de estudio",
      image: "https://img.freepik.com/foto-gratis/estudiantes-aprendiendo-algebra_1098-1155.jpg",
      isNew: "normal",
    },
    {
      id: 3,
      name: "Snack Galletas",
      price: 3,
      category: "Ventas de snacks",
      image: "https://images-cdn.ubuy.co.id/64ff997c192014395b3b6379-cookie-variety-pack-assortment-25-pack.jpg",
      isNew: "normal",
    },
    {
      id: 4,
      name: "Cuaderno A4",
      price: 6,
      category: "Materiales",
      image: "https://www.infofar.com.pe/wp-content/uploads/CUADERNO-ALPHA-A4-X-92H-RAYADO.jpg",
      isNew: "normal",
    },
    {
      id: 5,
      name: "Tutoría de Física",
      price: 30,
      category: "Tutorías universitarias",
      image: "https://images.squarespace-cdn.com/content/v1/5728d511cf80a17bbd8f8dcb/1462705348963-P6EDSWXTDTIJPUNIO1KF/tutoria-individual-fisica-matematica-tutor-san-salvador-el-salvador",
      isNew: "new",
    },
    {
      id: 6,
      name: "Guía de Estadística",
      price: 12,
      category: "Guías de estudio",
      image: "https://sciencemediacentre.es/sites/default/files/2023-07/estadistica.jpg",
      isNew: "normal",
    },
  ]);

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
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Ordenamiento
  const sortedProducts = [...filteredBySearch].sort((a, b) => {
    switch (sortValue) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return 0;
    }
  });

  // Categorías únicas
  const categories = [
    "Tutorías universitarias",
    "Guías de estudio",
    "Ventas de snacks",
    "Materiales",
  ];

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
