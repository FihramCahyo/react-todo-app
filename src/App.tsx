import './App.css'
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import AppRouter from './router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useContext } from 'react';

function ToastWithTheme() {
  const { theme } = useContext(ThemeContext);

  return (
    <ToastContainer
      position="top-right"
      autoClose={10000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme={theme}
    />
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppRouter />
        <ToastWithTheme />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;