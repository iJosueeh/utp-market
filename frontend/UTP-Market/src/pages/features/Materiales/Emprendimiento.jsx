import React, { useState } from "react";
import Tutoria from "../../../assets/img_M/tutoria.jpg";
import Guias from "../../../assets/img_M/guias.jpg";
import Ventas from "../../../assets/img_M/ventas.jpg";
import Material from "../../../assets/img_M/mt.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form, Card } from "react-bootstrap";

export default function Emprendimiento() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (item) => {
    setSelected(item);
    setShow(true);
  };

  const data = [
    {
      id: 1,
      titulo: "Tutorías",
      desc: "Apoyo académico entre estudiantes para reforzar materias clave.",
      img: Tutoria,
    },

    {
      id: 2,
      titulo: "Guías de estudio",
      desc: "Resúmenes y materiales hechos por estudiantes para facilitar el aprendizaje.",
      img: Guias,
    },
    {
      id: 3,
      titulo: "Ventas de snack",
      desc: "Snacks accesibles y prácticos dentro del campus.",
      img: Ventas,
    },
    {
      id: 4,
      titulo: "Materiales",
      desc: "Intercambio y venta de útiles y herramientas académicas.",
      img: Material,
    },
  ];

  return (
    <div className="container my-5">
      <h5 className="text-black text-center">MATERIALES</h5>
      <h2 className="text-center mb-4">Emprendimientos estudiantiles</h2>

      <div className="row">
        {data.map((item) => (
          <div className="col-md-3 mb-4" key={item.id}>
            <Card className="h-100 shadow-sm">
              <Card.Img variant="top"
                src={item.img}
                alt={item.titulo}
                className="img-fluid"
                style={{ height: "200px", objectFit: "cover" }}
              />
              <Card.Body>
                <Card.Title>{item.titulo}</Card.Title>
                <Card.Text>{item.desc}</Card.Text>
                <Button
                  variant="dark"
                  className="w-100"
                  onClick={() => handleShow(item)}
                ><p className="m-0">Más Información →</p>
                </Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{selected?.titulo}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selected?.desc}</p>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="validationCustom01">
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Ingresa tu nombre"
              />
              <Form.Control.Feedback type="invalid">
                Por favor, ingresa tu nombre.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom02">
              <Form.Label>Correo</Form.Label>
              <Form.Control
                required
                type="email"
                placeholder="correo@ejemplo.com"
              />
              <Form.Control.Feedback type="invalid">
                Por favor, ingresa un correo válido.
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Label>Mensaje</Form.Label>
              <Form.Control
                required
                as="textarea"
                rows={3}
                placeholder="Escribe tu mensaje aquí"
              />
              <Form.Control.Feedback type="invalid">
                Por favor, escribe un mensaje.
              </Form.Control.Feedback>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Enviar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
