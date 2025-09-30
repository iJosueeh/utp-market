import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';;

const AuthCallback = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    useEffect(() => {
        const timer = setTimeout(() => {
            const params = new URLSearchParams(location.search);
            const token = params.get('token');
            const userString = params.get('user');

            if (token && userString) {
                try {
                    const user = JSON.parse(decodeURIComponent(userString));
                    login(user, token); // Guardar en el contexto y localStorage
                    navigate('/main'); // Redirigir a la página principal
                } catch (error) {
                    console.error("Error al procesar los datos de autenticación:", error);
                    navigate('/login-error'); // O a una página de error
                }
            } else {
                // Manejar el caso de que no haya token o usuario
                navigate('/login-error');
            }
        }, 2000); // 2 segundos de retraso

        return () => clearTimeout(timer);
    }, [location.search, login, navigate]);

    return (
        <div style={{ height: '100vh' }} className="d-flex justify-content-center align-items-center flex-column bg-light">
            <div className="spinner-border text-danger" style={{ width: '3rem', height: '3rem' }} role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
            <h4 className="mt-3 text-dark">Procesando autenticación...</h4>
        </div>
    );
};

export default AuthCallback;
