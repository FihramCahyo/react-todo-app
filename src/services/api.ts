import axios from 'axios';

const baseURL = 'https://squirrel-fitting-wasp.ngrok-free.app/test-todo-api';

const api = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Menambahkan interseptor permintaan untuk menambahkan token autentikasi ke permintaan
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            // Tambahkan prefix 'Bearer ' ke token
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Menambahkan interseptor respons untuk menangani respons dengan kode status 401 (Unauthorized)
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Hapus token dari localStorage
            localStorage.removeItem('token');
            localStorage.removeItem('user');

            // Redirect ke halaman login
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;
