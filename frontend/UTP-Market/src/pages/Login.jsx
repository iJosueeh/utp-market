import React from 'react'

const Login = () => {
  return (
    <div className="container-fluid vh-100">
        <div className="row h-100 g-0">
            <div className="col-md-6">
                <img src="src/assets/background/login_bg.webp" alt="UTP Market Logo" className="w-100 h-100" style={{ objectFit: 'cover' }} />
            </div>
            <div className="col-md-4 d-flex justify-content-center align-items-center">
                <div className="w-75" style={{ maxWidth: '500px' }}>
                    <div className="text-start mb-4">
                        <h1 className='h3 mb-3 fw-bold'>Iniciar Sesion</h1>
                        <p>Accede a tu cuenta de UTP Market.</p>
                    </div>

                    <form>
                        <div className="mb-3">
                            <label htmlFor="InputEmail" className="form-label">Correo Institucional</label>
                            <input type="email" className="form-control" id="InputEmail" placeholder="example@utp.edu.pe" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="InputPassword" className="form-label">Contraseña</label>
                            <input type="password" className="form-control" id="InputPassword" placeholder="************" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login
