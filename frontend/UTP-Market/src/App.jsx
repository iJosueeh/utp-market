import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import MainPage from './pages/MainPage'
//Función, que dependiendo de las solicitudes/rutas, renderiza los componentes:
//MainPage, Login, Register, Profile, AdminProfile.
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/admin" element={<AdminProfile />} /> */}
      </Routes>
    </Router>
  );
}

export default App