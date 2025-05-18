import { Outlet } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import { ThemeContext } from '../contexts/ThemeContext';

const MainLayout = () => {
    const { user, logout } = useContext(AuthContext);
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleLogout = async () => {
        await logout(); // Panggil logout dengan await
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
            <header className="bg-white dark:bg-gray-800 shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-2 flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Todo App</h1>
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={() => {
                                toggleTheme();
                            }}
                            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
                        >
                            {theme === 'dark' ? '🌞' : '🌙'}
                        </button>
                        {user && (
                            <div className="flex items-center space-x-4">
                                <span className="text-gray-700 dark:text-gray-300">{user.username}</span>
                                <button
                                    onClick={handleLogout} // Gunakan handleLogout
                                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </header>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
        </div>
    );
};

export default MainLayout;