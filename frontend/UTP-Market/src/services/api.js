
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:8080/api', // Adjust this to your backend URL
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add a request interceptor to include the token in headers
apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const loginUser = async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data; // { token: "..." }
};

export const getUserProfile = async () => {
    const response = await apiClient.get('/usuarios/perfil');
    return response.data; // { nombre: "...", email: "...", ... }
};

export default apiClient;
