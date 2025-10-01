
import apiClient from './api';

export const getProductos = async () => {
    const response = await apiClient.get('/productos');
    return response.data;
};

export const getCategorias = async () => {
    const response = await apiClient.get('/categorias');
    return response.data;
};

export const createProducto = async (productoData) => {
    const response = await apiClient.post('/productos', productoData);
    return response.data;
};
