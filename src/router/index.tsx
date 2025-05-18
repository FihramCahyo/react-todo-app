import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { useContext, type JSX } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import MainLayout from '../layouts/MainLayout';
import TodosPage from '../pages/TodosPage';
import LoginPage from '../pages/LoginPage';

// Protected route component
const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: (
                    <ProtectedRoute>
                        <TodosPage />
                    </ProtectedRoute>
                ),
            },
            {
                path: 'login',
                element: <LoginPage />,
            },
        ],
    },
]);

const AppRouter = () => {
    return <RouterProvider router={router} />;
};

export default AppRouter;