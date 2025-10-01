
import apiClient from './api';

export const login = async (credentials) => {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
};

export const getProfile = async () => {
    const response = await apiClient.get('/usuarios/perfil');
    return response.data;
};

export const updateProfile = async (profileData) => {
    const response = await apiClient.put('/usuarios/perfil', profileData);
    return response.data;
};
