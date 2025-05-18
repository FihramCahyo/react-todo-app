import React, { createContext, useState, useEffect, type ReactNode } from "react";
import {
    login as loginService,
    logout as logoutService,
} from "../services/auth";
import type { LoginCredentials, User } from "../types";

interface AuthContextType {
    user: User | null;
    loading: boolean;
    error: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: false,
    error: null,
    login: async () => { },
    logout: () => { },
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
        setError(null); // Reset error sebelum mencoba login baru
        
        try {
            const response = await loginService(credentials);
            
            // Periksa apakah login berhasil
            if (response && response.success) {
                const userData: User = {
                    userId: response.userId,
                    username: response.username,
                    token: response.token
                };
                setUser(userData);
                localStorage.setItem("user", JSON.stringify(userData));
                localStorage.setItem("token", response.token);
            } else {
                // Tangani kasus ketika respons ada tetapi login gagal
                setError(response?.message || "Email atau password salah");
            }
        } catch (err: any) {
            console.error("Login error:", err);
            
            // Tangani error dari API dengan lebih baik
            if (err.response) {
                // Error dari respons server (status code bukan 2xx)
                setError(err.response.data?.message || "Email atau password salah");
            } else if (err.request) {
                // Error karena tidak ada respons dari server
                setError("Tidak dapat terhubung ke server. Periksa koneksi internet Anda.");
            } else {
                // Error lainnya
                setError(err.message || "Terjadi kesalahan saat login");
            }
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        logoutService();
        setUser(null);
        // Also remove items from localStorage when logging out
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    return (
        <AuthContext.Provider value={{ user, loading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};