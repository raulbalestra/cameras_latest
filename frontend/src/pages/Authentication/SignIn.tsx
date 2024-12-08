import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../hooks/api';
import FullSizeImage from '../../images/logo/logo_nova.png'; // altere para o caminho da imagem que deseja

interface SignInProps {
  onLogin: (isAdmin: boolean, username: string,fullName: string) => void;
}

const SignIn: React.FC<SignInProps> = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignIn = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');

    try {
      const data = await api('/auth/login', 'POST', { email, password });
      const { user, token } = data;

      // Armazena o token, status de admin e username no localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('isAdmin', JSON.stringify(user.isAdmin));
      localStorage.setItem('username', user.username);
      localStorage.setItem('fullName', user.fullName); 

      // Redireciona para a página do AdminPanel se for admin; caso contrário, adiciona o nome de usuário à URL
      if (user.isAdmin) {
        navigate('/AdminPanel');
      } else {
        navigate(`/${user.username}`);
      }

      onLogin(user.isAdmin, user.username,user.fullName);
    } catch (error: any) {
      console.error('Erro ao conectar ao servidor:', error);
      setError(error.message || 'Erro ao se conectar ao servidor');
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-r from-blue-500 to-purple-600">
      {/* Left Side - Full-Size Image */}
      <div className="flex-1 hidden lg:flex relative">
        <img
          src={FullSizeImage}
          alt="Illustration"
          className="w-full h-full object-cover opacity-90 transform scale-105 transition-all duration-500 hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-30"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex flex-1 items-center justify-center p-8 bg-gradient-to-r from-gray-100 to-gray-300 dark:from-gray-800 dark:to-gray-900">
        <div className="w-full max-w-md p-10 bg-white/80 dark:bg-gray-800/70 backdrop-blur-md rounded-3xl border border-gray-200 dark:border-gray-700 shadow-2xl transform transition-all duration-300 hover:shadow-3xl hover:scale-105">
          <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-6">Bem-vindo ao MoniGuard</h2>

          {error && <div className="text-red-500 text-center mb-4">{error}</div>}

          <form className="space-y-6" onSubmit={handleSignIn}>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full px-4 py-3 mt-1 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full px-4 py-3 mt-1 text-gray-800 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100 transition-all duration-300"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 transition-all duration-300 shadow-lg transform hover:scale-105"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
