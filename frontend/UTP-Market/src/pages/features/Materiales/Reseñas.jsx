import React from "react";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import Persona1 from "../../../assets/img_M/Persona1.jpg";
import Persona2 from "../../../assets/img_M/Persona2.jpg";
import Persona3 from "../../../assets/img_M/Persona3.jpg";

export default function Resenas() {
  const data = [
    {
      id: 1,
      img: Persona1,
      texto: "Vendí mis guías en una tarde. La plataforma es rápida y me pagaron sin problemas.",
      nombre: "Valeria R.",
      detalle: "Estudiante de Ingeniería Industrial – 6.º ciclo",
    },
    {
      id: 2,
      img: Persona2,
      texto: "Conseguí tutorías fácilmente. Los estudiantes son muy atentos.",
      nombre: "Carlos M.",
      detalle: "Estudiante de Sistemas – 4.º ciclo",
    },
    {
      id: 3,
      img: Persona3,
      texto: "Compré snacks en el campus y fue súper práctico.",
      nombre: "Ana G.",
      detalle: "Estudiante de Administración – 3.º ciclo",
    },
  ];

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 text-white">Reseñas de estudiantes</h2>
      <Carousel indicators={false} interval={5000} className="text-center text-white">
        {data.map((item) => (
          <Carousel.Item key={item.id}>
            <img
              src={item.img}
              alt={item.nombre}
              className="rounded-circle mb-3"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <p className="mb-2">"{item.texto}"</p>
            <h5 className="fw-bold">{item.nombre}</h5>
            <p className="text-white">{item.detalle}</p>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}
