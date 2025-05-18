import type { LoginCredentials, LoginResponse } from '../types';
import api from './api';

export const login = async (credentials: LoginCredentials): Promise<LoginResponse> => {
    try {
        const response = await api.post<LoginResponse>('/users/login', credentials);
        return response.data;
    } catch (error: any) {
        // Tangani error dari API dan teruskan ke komponen
        if (error.response) {
            // Server merespons dengan status code di luar range 2xx
            throw error;
        } else if (error.request) {
            // Permintaan dibuat tetapi tidak ada respons
            throw new Error('Tidak dapat terhubung ke server');
        } else {
            // Terjadi kesalahan saat menyiapkan permintaan
            throw new Error('Terjadi kesalahan saat login');
        }
    }
};

export const logout = (): void => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('token');
};