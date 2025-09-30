import React, { useState } from 'react';

const DatosPersonales = () => {
  const [userData, setUserData] = useState({
    nombre: 'John',
    apellido: 'Doe',
    email: 'john.doe@example.com',
    telefono: '123-456-7890',
    password: '***asd'
  });
  const [originalUserData, setOriginalUserData] = useState({ ...userData });
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Datos actualizados:', userData);
    setOriginalUserData({ ...userData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setUserData({ ...originalUserData });
    setIsEditing(false);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-3 mt-3 text-center">Datos Personales</h2>
              <div className="text-center">
                <h5 className="card-title">Foto de perfil</h5>
                <div className="profile-picture-container">
                  <img src="/src/assets/img_M/plantilla-perfil.png" alt="Avatar" className="img-fluid rounded-circle" style={{ width: '150px', height: '150px', border: '5px solid #B50D30' }} />
                  <div className="overlay rounded-circle">
                    <i className="bi bi-pencil"></i>
                  </div>
                </div>
              </div>

              <h5 className="card-title mt-4">Detalles de Usuario</h5>
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="nombre" className="form-label">Nombres</label>
                    <input
                      type="text"
                      className={`form-control ${!isEditing ? 'readonly-input' : ''}`}
                      id="nombre"
                      name="nombre"
                      value={userData.nombre}
                      onChange={handleChange}
                      readOnly={!isEditing}
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="apellido" className="form-label">Apellidos</label>
                    <input
                      type="text"
                      className={`form-control ${!isEditing ? 'readonly-input' : ''}`}
                      id="apellido"
                      name="apellido"
                      value={userData.apellido}
                      onChange={handleChange}
                      readOnly={!isEditing}
                    />
                  </div>
                </div>
                <div className="mb-3">
                  <label htmlFor="telefono" className="form-label">Teléfono</label>
                  <input
                    type="text"
                    className={`form-control ${!isEditing ? 'readonly-input' : ''}`}
                    id="telefono"
                    name="telefono"
                    value={userData.telefono}
                    onChange={handleChange}
                    readOnly={!isEditing}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control readonly-input"
                    id="email"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                    readOnly
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password">Contraseña</label>
                  <div className="input-group">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      className={`form-control ${!isEditing ? 'readonly-input' : ''}`}
                      id="password"
                      name="password"
                      value={userData.password}
                      onChange={handleChange}
                      readOnly={!isEditing}
                    />
                    <button className="btn btn-outline-secondary" type="button" onClick={() => setShowPassword(!showPassword)} aria-label="toggle password visibility">
                      <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`}></i>
                    </button>
                  </div>
                </div>
                <div style={{ position: 'relative', height: '40px' }}>
                  <div className={`button-group ${isEditing ? 'hidden' : ''}`}>
                    <button type="button" className="btn text-white" style={{backgroundColor: '#B50D30' }} onClick={() => setIsEditing(true)}>Editar datos</button>
                  </div>
                  <div className={`button-group ${!isEditing ? 'hidden' : ''}`}>
                    <button type="submit" className="btn text-white me-2" style={{backgroundColor: '#B50D30' }}>Guardar Cambios</button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>Cancelar</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        .readonly-input:focus {
          outline: none;
          box-shadow: none;
        }
        .button-group {
          position: absolute;
          transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;
          opacity: 1;
          visibility: visible;
        }
        .button-group.hidden {
          opacity: 0;
          visibility: hidden;
        }
        .profile-picture-container {
          position: relative;
          display: inline-block;
          cursor: pointer;
        }
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .profile-picture-container:hover .overlay {
          opacity: 1;
        }
        .overlay i {
          color: white;
          font-size: 2rem;
        }
      `}</style>
    </div>
  );
};

export default DatosPersonales;
