import React, { createContext, useState, useEffect, type ReactNode } from "react";
import {
    login as loginService,
    logout as logoutService,
} from "../services/auth";
import { toast } from 'react-toastify'; // Impor toast
import type { LoginCredentials, User } from "../types";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => Promise<void>; // Ubah ke Promise<void> karena logout mungkin asinkronus
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false,
    error: null,
    login: async () => { },
    logout: async () => { }, // Ubah ke async
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check if user is stored in localStorage
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const login = async (credentials: LoginCredentials) => {
        setLoading(true);
        setError(null);

        try {
            const response = await loginService(credentials);

            if (response && response.success) {
                setUser(response);
                localStorage.setItem("user", JSON.stringify(response));
                localStorage.setItem("token", response.token);
                toast.success('Login successful!', { // Tambahkan toast untuk login
                    position: 'top-right',
                    autoClose: 3000,
                });
            } else {
                setError(response?.message || "Email atau password salah");
                toast.error(response?.message || "Email atau password salah", {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } catch (err: any) {
            console.error("Login error:", err);

            if (err.response) {
                setError(err.response.data?.message || "Email atau password salah");
            } else if (err.request) {
                setError("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
                toast.error("Tidak dapat terhubung ke server.", {
                    position: 'top-right',
                    autoClose: 3000,
                });
            } else {
                setError(err.message || "Terjadi kesalahan saat login");
                toast.error(err.message || "Terjadi kesalahan saat login", {
                    position: 'top-right',
                    autoClose: 3000,
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => { // Ubah ke async
        setLoading(true); // Optional: tambahkan loading state
        try {
            await logoutService(); // Panggil logoutService yang mungkin asinkronus
            setUser(null);
            localStorage.removeItem("user");
            localStorage.removeItem("token");
            toast.info('You have logged out', { // Tambahkan toast untuk logout
                position: 'top-right',
                autoClose: 3000,
            });
        } catch (err: any) {
            console.error("Logout error:", err);
            toast.error('Gagal logout: ' + (err.message || 'Terjadi kesalahan'), {
                position: 'top-right',
                autoClose: 3000,
            });
        } finally {
            setLoading(false); // Optional: reset loading state
        }
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};