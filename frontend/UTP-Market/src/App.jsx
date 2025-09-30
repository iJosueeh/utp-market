import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import './App.css';
import MainPage from './pages/MainPage.jsx';
import AboutUsPage from "./pages/AboutUs/AUPage.jsx";
import HelpPage from "./pages/Help/HelpPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import UsuarioDashboard from "./pages/Usuario/UsuarioDashboard.jsx";

//Función, que dependiendo de las solicitudes/rutas, renderiza los componentes:
//MainPage, Login, Register, Profile, AdminProfile.
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />  
        <Route path="/help" element={<HelpPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/products" element={<ProductPage />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        <Route path="/usuario/*" element={<UsuarioDashboard />} />
        {/* <Route path="/admin" element={<AdminProfile />} /> */}
      </Routes>
    </Router>
  );
}

export default App