import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Kath from "../../assets/img_M/avatar.png";


export default function CardProfileTeam() {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleLinkClick = (e, url, type) => {
    if (!url || url.trim() === '') {
      e.preventDefault();
      setToastMessage(`No hay ${type} registrado.`);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000); // Hide toast after 3 seconds
    } else {
      window.open(url, '_blank', 'noopener noreferrer');
    }
  };

  const profiles = [
    {
      image:
        "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg",
      name: "Kenny Salazar",
      role: "Developer",
      email: "ceo@empresa.com",
      social: {
        linkedin: "https://linkedin.com/in/kenny",
        twitter: "https://twitter.com/kenny",
        instagram: "https://instagram.com/kenny",
        facebook: "https://facebook.com/kenny",
      },
    },
    {
      image: "https://avatars.githubusercontent.com/u/107824312?v=4",
      name: "Josue Tanta",
      role: "Developer",
      email: "josue.tantacieza@outlook.com",
      social: {
        linkedin: "https://linkedin.com/in/josue-tanta",
        twitter: "",
        instagram: "https://www.instagram.com/ijosueeh27/",
        facebook: "",
      },
    },
    {
      image: "https://i.pinimg.com/474x/13/cd/7b/13cd7b0470f16386f9699dc337871fa6.jpg",
      name: "Alexander Sinte",
      role: "UX Designer & Co-founder",
      email: "cto@empresa.com",
      social: {
        linkedin: "https://linkedin.com/in/alexander",
        twitter: "https://twitter.com/alexander",
        instagram: "https://instagram.com/alexander",
        facebook: "https://facebook.com/alexander",
      },
    },
    {
      image: Kath,
      name: "Katherine Salas",
      role: "Developer",
      email: "cmo@empresa.com",
      social: {
        linkedin: "https://linkedin.com/in/katherine",
        twitter: "https://twitter.com/katherine",
        instagram: "https://instagram.com/katherine",
        facebook: "https://facebook.com/katherine",
      },
    },
    {
      image: "https://ih1.redbubble.net/image.697497590.6072/papergc,500x,w,f8f8f8-pad,750x1000,f8f8f8.u5.jpg",
      name: "Ian Callirgos",
      role: "Developer",
      email: "cfo@empresa.com",
      social: {
        linkedin: "https://linkedin.com/in/ian",
        twitter: "https://twitter.com/ian",
        instagram: "https://instagram.com/ian",
        facebook: "https://facebook.com/ian",
      },
    },
  ];

  return (
    <div className="container my-3">

      {/* Título de la sección */}
      <div className="text-center mb-5">
        <p className="text-uppercase fw-bold small mb-0 text-white">
          EQUIPO DE DESARROLLO
        </p>
        <h2 className="fw-bold text-dark">Nuestro Equipo</h2>
      </div>

      <div className="row g-4 justify-content-center">
        {profiles.map((profile, index) => (
          <div key={index} className="col-auto">
            <div className="text-center text-white ">
              {/* Imagen */}
              <img
                src={profile.image}
                alt={profile.name}
                className="img-fluid opacity-75 object-fit-cover "
                style={{
                  height: "200px",
                  width: "190px"
                }}
              />

              {/* Texto */}
              <div className="mt-3">
                <h5 className="fw-bold">{profile.name}</h5>
                <p className="mb-3 small text-dark  ">{profile.role}</p>

                {/* Redes sociales */}
                <div className="d-flex justify-content-center gap-3 mb-3">
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, profile.social.linkedin, 'LinkedIn')}
                    rel="noreferrer"
                  >
                    <i className="bi bi-linkedin text-dark fs-5"></i>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, profile.social.twitter, 'Twitter')}
                    rel="noreferrer"
                  >
                    <i className="bi bi-twitter text-dark fs-5"></i>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, profile.social.instagram, 'Instagram')}
                    rel="noreferrer"
                  >
                    <i className="bi bi-instagram text-dark fs-5"></i>
                  </a>
                  <a
                    href="#"
                    onClick={(e) => handleLinkClick(e, profile.social.facebook, 'Facebook')}
                    rel="noreferrer"
                  >
                    <i className="bi bi-facebook text-dark fs-5"></i>
                  </a>
                </div>
                {/* Botón */}
                <a
                  href={`mailto:${profile.email}`}
                  className="btn btn-outline-light btn-sm px-4 border-2"
                >
                  Contacta a {profile.name.split(" ")[0]}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showToast && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div className="toast fade show" role="alert" aria-live="assertive" aria-atomic="true">
            <div className="toast-header">
              <strong className="me-auto">Notificación</strong>
              <button type="button" className="btn-close" onClick={() => setShowToast(false)} aria-label="Close"></button>
            </div>
            <div className="toast-body">
              {toastMessage}
            </div>
          </div>
        </div>
      )}
    </div>
  );

}