import { useEffect, useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Loader from './common/Loader';
import SignIn from './pages/Authentication/SignIn';
import Chart from './pages/Chart';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import DefaultLayout from './layout/DefaultLayout';
import AdminLayout from './layout/AdminLayout';
import AdminPanel from './pages/Admin/AdminPanel';

// Importando os componentes de câmeras
import Cascavel from './pages/Cameras/Cascavel';
import Guarapuava from './pages/Cameras/Guarapuava';
import Londrina from './pages/Cameras/Londrina';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [username, setUsername] = useState<string | null>(null);
  const [fullName, setFullName] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    const storedUsername = localStorage.getItem('username');
    const storedFullName = localStorage.getItem('fullName'); // Obtém o nome completo do localStorage

    if (token) {
      setIsAuthenticated(true);
      setIsAdmin(adminStatus);
      setUsername(storedUsername);
      setFullName(storedFullName); // Atualiza o nome completo no estado
    }

    setLoading(false); // Finaliza o carregamento
  }, []);

  // Agora `handleLogin` aceita `loggedFullName` como parâmetro
  const handleLogin = (
    adminStatus: boolean,
    loggedUsername: string,
    loggedFullName: string
  ) => {
    setIsAuthenticated(true);
    setIsAdmin(adminStatus);
    setUsername(loggedUsername);
    setFullName(loggedFullName); // Atualiza o nome completo no estado
    localStorage.setItem('isAdmin', adminStatus.toString());
    localStorage.setItem('username', loggedUsername);
    localStorage.setItem('fullName', loggedFullName); // Salva o nome completo no localStorage
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setIsAdmin(false);
    setUsername(null);
    setFullName(null); // Limpa o nome completo
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('fullName'); // Remove o nome completo do localStorage
  };

  // Wrapper para proteger rotas
  const RequireAuth = ({ children }: { children: JSX.Element }) => {
    if (!isAuthenticated) {
      return <Navigate to="/auth/signin" replace />;
    }
    return children;
  };

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      {/* Rotas de autenticação */}
      <Route
        path="/auth/signin"
        element={
          !isAuthenticated ? (
            <SignIn onLogin={handleLogin} />
          ) : (
            <Navigate to={isAdmin ? '/AdminPanel' : `/${username}`} replace />
          )
        }
      />

      {/* Rota protegida para o layout do Admin */}
      {isAuthenticated && isAdmin && (
        <Route
          path="/AdminPanel"
          element={
            <RequireAuth>
              <AdminLayout onLogout={handleLogout} />
            </RequireAuth>
          }
        >
          <Route index element={<AdminPanel />} />
        </Route>
      )}

      {/* Rotas protegidas para o layout padrão dos usuários */}
      {isAuthenticated && !isAdmin && username && (
        <Route
          path={`/${username}`}
          element={
            <RequireAuth>
              <DefaultLayout onLogout={handleLogout} username={username} fullName={fullName} />
            </RequireAuth>
          }
        >
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="chart" element={<Chart />} />
          <Route path="cameras/cascavel" element={<Cascavel />} />
          <Route path="cameras/guarapuava" element={<Guarapuava />} />
          <Route path="cameras/londrina" element={<Londrina />} />
        </Route>
      )}

      {/* Redireciona para o login se nenhuma outra rota for encontrada */}
      <Route path="*" element={<Navigate to="/auth/signin" replace />} />
    </Routes>
  );
}

export default App;
