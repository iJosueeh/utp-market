// CardProfileTeam.jsx
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Kath from "../../assets/img_M/avatar.png";


export default function CardProfileTeam() {
  const profiles = [
    {
      image:
        "https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/16620/production/_91408619_55df76d5-2245-41c1-8031-07a4da3f313f.jpg",
      name: "Kenny Salazar",
      role: "Dueño & Co-Fundador & CEO",
      email: "ceo@empresa.com",
      social: {
        linkedin: "https://linkedin.com/in/kenny",
        twitter: "https://twitter.com/kenny",
        instagram: "https://instagram.com/kenny",
        facebook: "https://facebook.com/kenny",
      },
    },
    {
      image: "data:image/png;base64,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",
      name: "Josue Tanta",
      role: "Developer",
      email: "cofundador@empresa.com",
      social: {
        linkedin: "https://https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpixAErSiA8chDm1EUl9Fi0qeiZCMLZQQvfg&s.com/in/josue",
        twitter: "https://twitter.com/josue",
        instagram: "https://instagram.com/josue",
        facebook: "https://facebook.com/josue",
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

              style={{ height: "200px",
                        width:"190px"}}
            />

            {/* Texto */}
          <div className="mt-3">
              <h5 className="fw-bold">{profile.name}</h5>
              <p className="mb-3 small text-dark  ">{profile.role}</p>

              {/* Redes sociales */}
              <div className="d-flex justify-content-center gap-3 mb-3">
                <a href={profile.social.linkedin} target="_blank" rel="noreferrer">
                  <i className="bi bi-linkedin text-dark fs-5"></i>
                </a>
                <a href={profile.social.twitter} target="_blank" rel="noreferrer">
                  <i className="bi bi-twitter text-dark fs-5"></i>
                </a>
                <a href={profile.social.instagram} target="_blank" rel="noreferrer">
                  <i className="bi bi-instagram text-dark fs-5"></i>
                </a>
                <a href={profile.social.facebook} target="_blank" rel="noreferrer">
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
  </div>
);

}
