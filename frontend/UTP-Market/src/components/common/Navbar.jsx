import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import feather from "feather-icons";

import brandLogo from "../../assets/utpmarketlogo.png"; // adjust path

const Navbar = ({ logoText = "UTP Market", links = [] }) => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid px-0">
          <div className="d-flex">
            <a className="navbar-brand" href="/">
              <img
                src={brandLogo}
                alt="Geeks high quality website templates created with Bootstrap 5."
                style={{ height: 40 }}
              />
            </a>

            <div className="dropdown d-none d-md-block">
              <button
                className="btn btn-light-primary text-primary"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-list me-2 align-middle"></i>
                Category
              </button>

              <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                <li className="dropdown-submenu dropend">
                  <a
                    className="dropdown-item dropdown-list-group-item dropdown-toggle"
                    href="#"
                  >
                    Web Development
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="../pages/course-category.html">
                        Bootstrap
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="../pages/course-category.html">
                        React
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="../pages/course-category.html">
                        GraphQl
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="../pages/course-category.html">
                        Gatsby
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="../pages/course-category.html">
                        Grunt
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="../pages/course-category.html">
                        Svelte
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="../pages/course-category.html">
                        Meteor
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="../pages/course-category.html">
                        HTML5
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="../pages/course-category.html">
                        Angular
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="dropdown-submenu dropend">
                  <a
                    className="dropdown-item dropdown-list-group-item dropdown-toggle"
                    href="#"
                  >
                    Design
                  </a>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="../pages/course-category.html">
                        Graphic Design
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="../pages/course-category.html">
                        Illustrator
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="../pages/course-category.html">
                        UX / UI Design
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="../pages/course-category.html">
                        Figma Design
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="../pages/course-category.html">
                        Adobe XD
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="../pages/course-category.html">
                        Sketch
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="../pages/course-category.html">
                        Icon Design
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="../pages/course-category.html">
                        Photoshop
                      </a>
                    </li>
                  </ul>
                </li>

                <li>
                  <a href="../pages/course-category.html" className="dropdown-item">
                    Mobile App
                  </a>
                </li>
                <li>
                  <a href="../pages/course-category.html" className="dropdown-item">
                    IT Software
                  </a>
                </li>
                <li>
                  <a href="../pages/course-category.html" className="dropdown-item">
                    Marketing
                  </a>
                </li>
                <li>
                  <a href="../pages/course-category.html" className="dropdown-item">
                    Music
                  </a>
                </li>
                <li>
                  <a href="../pages/course-category.html" className="dropdown-item">
                    Life Style
                  </a>
                </li>
                <li>
                  <a href="../pages/course-category.html" className="dropdown-item">
                    Business
                  </a>
                </li>
                <li>
                  <a href="../pages/course-category.html" className="dropdown-item">
                    Photography
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="order-lg-3">
            <div className="d-flex align-items-center">
              <div className="dropdown me-2">
                <button
                  className="btn btn-light btn-icon rounded-circle d-flex align-items-center bd-theme"
                  type="button"
                  aria-expanded="false"
                  data-bs-toggle="dropdown"
                  aria-label="Toggle theme (auto)"
                >
                  <i className="bi theme-icon-active"></i>
                  <span className="visually-hidden bs-theme-text">Toggle theme</span>
                </button>
                <ul className="dropdown-menu dropdown-menu-end shadow" aria-labelledby="bs-theme-text">
                  <li>
                    <button
                      type="button"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-theme-value="light"
                      aria-pressed="false"
                    >
                      <i className="bi theme-icon bi-sun-fill"></i>
                      <span className="ms-2">Light</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item d-flex align-items-center"
                      data-bs-theme-value="dark"
                      aria-pressed="false"
                    >
                      <i className="bi theme-icon bi-moon-stars-fill"></i>
                      <span className="ms-2">Dark</span>
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      className="dropdown-item d-flex align-items-center active"
                      data-bs-theme-value="auto"
                      aria-pressed="true"
                    >
                      <i className="bi theme-icon bi-circle-half"></i>
                      <span className="ms-2">Auto</span>
                    </button>
                  </li>
                </ul>
              </div>

              <span className="d-none d-md-block">
                <a href="#" className="btn btn-icon btn-light rounded-circle">
                  <i className="bi bi-cart align-middle"></i>
                </a>
              </span>

              <Link to="/login" className="btn btn-outline-primary ms-2">
                Sign in
              </Link>
              <Link to="/register" className="btn btn-primary ms-1 d-none d-lg-block">
                Sign up
              </Link>

              {/* Toggler */}
              <button
                className="navbar-toggler ms-2"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#navbar-default2"
                aria-controls="navbar-default2"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>

          {/* Collapsible */}
          <div className="collapse navbar-collapse" id="navbar-default2">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Link
                </a>
              </li>
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="navbarDropdown"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  data-bs-display="static"
                >
                  Dropdown
                </a>
                <ul className="dropdown-menu dropdown-menu-arrow" aria-labelledby="navbarDropdown">
                  <li className="dropdown-submenu dropend">
                    <a className="dropdown-item dropdown-list-group-item dropdown-toggle" href="#">
                      Dropdown
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="../pages/course-category.html">
                          Action Link
                        </a>
                      </li>
                      <li>
                        <a href="#!" className="dropdown-item">
                          Anthor Action
                        </a>
                      </li>
                      <li>
                        <a href="#!" className="dropdown-item">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="#!" className="dropdown-item">
                      Action Link
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="dropdown-item">
                      Anthor Action
                    </a>
                  </li>
                  <li>
                    <a href="#!" className="dropdown-item">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>

              <li className="nav-item dropdown dropdown-fullwidth">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Mega Menu
                </a>

                <div className="dropdown-menu dropdown-menu-md">
                  <div className="px-4 pt-2 pb-2">
                    <div className="row">
                      <div className="col-12">
                        <div className="lh-1 mb-5">
                          <h3 className="mb-1">Earn a Degree</h3>
                          <p>Breakthrough pricing on 100% online degrees designed to fit into your life.</p>
                        </div>
                      </div>

                      <div className="col-lg-4 col-12">
                        <div className="border-bottom pb-2 mb-3">
                          <h5 className="mb-0">Degrees</h5>
                        </div>
                        <div>
                          <a href="#">
                            <div className="d-flex mb-3">
                              <img src="/assets/images/png/degree-1.png" alt="" />
                              <div className="ms-2">
                                <small className="text-body">University of Michigan</small>
                                <h6 className="mb-0">Master of Applied Data Science</h6>
                              </div>
                            </div>
                          </a>
                          <a href="#">
                            <div className="d-flex mb-3">
                              <img src="/assets/images/png/degree-2.png" alt="" />
                              <div className="ms-2">
                                <small className="text-body">A&B College 1980</small>
                                <h6 className="mb-0">MBA in Business Analytics</h6>
                              </div>
                            </div>
                          </a>
                          <a href="#">
                            <div className="d-flex mb-3">
                              <img src="/assets/images/png/degree-3.png" alt="" />
                              <div className="ms-2">
                                <small className="text-body">Imperial College London</small>
                                <h6 className="mb-0">Master of Science in Machine</h6>
                              </div>
                            </div>
                          </a>
                          <a href="#">
                            <div className="d-flex mb-3">
                              <img src="/assets/images/png/degree-4.png" alt="" />
                              <div className="ms-2">
                                <small className="text-body">University of Colorado</small>
                                <h6 className="mb-0">Master of Computer Science</h6>
                              </div>
                            </div>
                          </a>
                          <div className="mt-4">
                            <a href="#" className="btn btn-outline-primary btn-sm">
                              View all degree
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 col-12 mt-4 mt-lg-0">
                        <div className="border-bottom pb-2 mb-3">
                          <h5 className="mb-0">Certificate Programs</h5>
                        </div>
                        <div>
                          <a href="#">
                            <div className="d-flex mb-3">
                              <img src="/assets/images/png/google.png" alt="" />
                              <div className="ms-2">
                                <small className="text-body">No Prerequisites</small>
                                <h6 className="mb-0">Google Data Analytics</h6>
                              </div>
                            </div>
                          </a>
                          <a href="#">
                            <div className="d-flex mb-3">
                              <img src="/assets/images/png/IBM.png" alt="" />
                              <div className="ms-2">
                                <small className="text-body">No Prerequisites</small>
                                <h6 className="mb-0">IBM Data Science</h6>
                              </div>
                            </div>
                          </a>
                          <a href="#">
                            <div className="d-flex mb-3">
                              <img src="/assets/images/png/microsoft.png" alt="" />
                              <div className="ms-2">
                                <small className="text-body">Expert Feedback</small>
                                <h6 className="mb-0">Machine Leaning for Analytics</h6>
                              </div>
                            </div>
                          </a>
                          <a href="#">
                            <div className="d-flex mb-3">
                              <img src="/assets/images/png/tensorflow.png" alt="" />
                              <div className="ms-2">
                                <small className="text-body">Certification Prerequisites</small>
                                <h6 className="mb-0">TensorFlow Developer Certificate</h6>
                              </div>
                            </div>
                          </a>
                          <a href="#">
                            <div className="d-flex mb-3">
                              <img src="/assets/images/png/meta.png" alt="" />
                              <div className="ms-2">
                                <small className="text-body">University of Colorado</small>
                                <h6 className="mb-0">Meta Marketing Analytics</h6>
                              </div>
                            </div>
                          </a>
                          <div className="mt-4">
                            <a href="#" className="btn btn-outline-primary btn-sm">
                              View all Certificates
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="col-lg-4 col-12 mt-4 mt-lg-0">
                        <div className="border-bottom pb-2 mb-3">
                          <h5 className="mb-0">Popular Skills</h5>
                        </div>
                        <div>
                          <ul className="nav flex-column">
                            <li className="nav-item">
                              <a href="#" className="nav-link">Python</a>
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">SQL</a>
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">Microsoft Excel</a>
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">Machine Learning</a>
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">Data Science</a>
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">Data Analytics</a>
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">Power BI</a>
                            </li>
                            <li className="nav-item">
                              <a href="#" className="nav-link">Artificial Intelligence</a>
                            </li>
                          </ul>
                          <div className="mt-4">
                            <a href="#" className="btn btn-outline-primary btn-sm">
                              View all Skills
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>

            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;