import React from "react";
import { Link } from "react-router-dom";
import brandLogo from "../../assets/utpmarketlogo.png";
<hr className="border border-1 border-white opacity-50" />

const Footer = () => {
    return (
        <>
            {/* footer */}
            <footer className="py-lg-8 py-5 bg-dark text-white">
                <div className="container ">
                    <div className="row text-center align-items-center text-md-start">
                        {/* Contactanos */}
                        <div className="col-12 col-md-4 mb-4 mb-md-0 ">
                            <h5 className="fw-bold mb-3">Contactanos</h5>
                            <div className="d-grid gap-2">
                                <span>
                                    <i className="bi bi-whatsapp me-2"> +51 922 873 004</i>
                                </span>
                                <span>
                                    <i className="bi bi-telephone me-2"> +51 922 873 004 </i>
                                </span>
                                <span>
                                    <i className="bi bi-envelope-at me-2"> UTP-Market@outlook.com</i>
                                </span>
                            </div>
                        </div>

                        <div className="col-12 col-md-4 mb-4 mb-md-0 text-center">
                            <img
                                src={brandLogo}
                                style={{ height: 45 }}
                                className="mb-3"
                            />
                        </div>

                        {/* Redes sociales */}
                        <div className="col-12 col-md-4 text-center text-md-end">
                            <div className="my-6">
                                {/* YouTube */}
                                <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer" className="me-4" aria-label="YouTube" title="YouTube">
                                    <i className="bi bi-youtube fs-4 text-white"></i>
                                </a>
                                {/* Facebook */}
                                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="me-4" aria-label="Facebook" title="Facebook">
                                    <i className="bi bi-facebook fs-4 text-white"></i>
                                </a>
                                {/* Twitter */}
                                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="me-4" aria-label="Twitter" title="Twitter">
                                    <i className="bi bi-twitter fs-4 text-white"></i>
                                </a>
                                {/* Instagram */}
                                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="me-4" aria-label="Instagram" title="Instagram">
                                    <i className="bi bi-instagram fs-4 text-white"></i>
                                </a>
                                {/* LinkedIn */}
                                <a href="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" className="" aria-label="LinkedIn" title="LinkedIn">
                                    <i className="bi bi-linkedin fs-4 text-white"></i>
                                </a>

                            </div>
                        </div>

                        <div className="row">
                            <div className="col-12 text-center mt-4">
                                <span> &copy; UTP MARKET  {new Date().getFullYear()}. Todos los derechos reservados</span>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};
export default Footer;