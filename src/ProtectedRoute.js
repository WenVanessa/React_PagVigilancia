import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const isAuthenticated = localStorage.getItem('email'); // Comprobar si el email está en localStorage

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/'); // Redirige al Login si no está autenticado
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return null; // O puedes devolver un loader o un componente de espera mientras redirige
  }

  return children; // Si está autenticado, muestra los componentes hijos (la ruta protegida)
};

export default ProtectedRoute;
