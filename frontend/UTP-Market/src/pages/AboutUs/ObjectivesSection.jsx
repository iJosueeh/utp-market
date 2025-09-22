import { 
  BsRecycle,     
  BsShieldLock,   
  BsPeople,       
  BsGraphUpArrow  
} from "react-icons/bs";
import objectivesImage from "../../assets/img_M/objetivos.png";

const objectives = [
  {
    icon: <BsRecycle className="text-danger display-5 mb-3" />,
    text: "Fomentar la reutilización de recursos mediante la compra y venta entre estudiantes.",
  },
  {
    icon: <BsShieldLock className="text-danger display-5 mb-3" />,
    text: "Garantizar seguridad y confianza en cada transacción con reglas claras y soporte.",
  },
  {
    icon: <BsPeople className="text-danger display-5 mb-3" />,
    text: "Crear una red de apoyo económico y colaborativo dentro de la comunidad UTP.",
  },
  {
    icon: <BsGraphUpArrow className="text-danger display-5 mb-3" />,
    text: "Impulsar la innovación y el crecimiento continuo de la plataforma.",
  },
];

export default function ObjectivesSection() {
  return (
    <section className="container py-5">
      <div className="row align-items-center">
        {/* Izquierda: grid 2x2 */}
        <div className="col-md-6">
          <h2 className="fw-bold mb-5 text-danger text-center">Objetivos</h2>

          <div className="row row-cols-1 row-cols-md-2 g-4">
            {objectives.map((item, index) => (
              <div key={index} className="col">
                <div className="d-flex flex-column align-items-center text-center p-3 h-100">
                  {item.icon}
                  <p className="mb-0">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Derecha: imagen */}
        <div className="col-md-6 mt-4 mt-md-0 d-flex justify-content-center">
          <img
            src={objectivesImage}
            alt="Objetivos UTP Market"
            className="img-fluid rounded shadow"
            style={{ maxHeight: 420, objectFit: "cover" }}
          />
        </div>
      </div>
    </section>
  );
}
