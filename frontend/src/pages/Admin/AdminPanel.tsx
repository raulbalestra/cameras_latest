import React, { useState, useEffect } from 'react';
import { fetchUsers, addUser, blockUser, removeUser } from '../../hooks/api';

interface User {
  username: string;
  fullName: string;
  email: string;
  isAdmin: boolean;
  isBlocked: boolean;
}

const AdminPanel: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [username, setUsername] = useState(''); // Estado para o username
  const [fullName, setFullName] = useState(''); // Estado para o fullName
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const data = await fetchUsers();
        setUsers(data);
        setError('');
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
        setError('Erro ao buscar usuários. Verifique se você está logado e tem permissões.');
      }
    };
    loadUsers();
  }, []);

  const handleAddUser = async () => {
    setError('');
    setMessage('');

    // Valida se todos os campos estão preenchidos antes de enviar
    if (!username || !fullName || !email || !password) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      // Inclui `isAdmin` como argumento ao chamar `addUser`
      const data = await addUser(username, fullName, email, password, isAdmin);
      setMessage(data.message);
      setUsers([...users, { username, fullName, email, isAdmin, isBlocked: false }]);
      setUsername(''); // Limpa o estado do username
      setFullName(''); // Limpa o estado do fullName
      setEmail('');
      setPassword('');
      setIsAdmin(false);
    } catch (error: any) {
      console.error('Erro ao adicionar usuário:', error);
      setError(error.message || 'Erro ao adicionar usuário. Verifique as informações e tente novamente.');
    }
  };

  const handleBlockUser = async (email: string, block: boolean) => {
    setError('');
    setMessage('');
    try {
      const data = await blockUser(email, block);
      setMessage(data.message);
      setUsers(users.map((user) => (user.email === email ? { ...user, isBlocked: block } : user)));
    } catch (error: any) {
      console.error('Erro ao bloquear/desbloquear usuário:', error);
      setError(error.message || 'Erro ao bloquear/desbloquear usuário. Verifique as permissões.');
    }
  };

  const handleRemoveUser = async (email: string) => {
    setError('');
    setMessage('');
    try {
      const data = await removeUser(email);
      setMessage(data.message);
      setUsers(users.filter((user) => user.email !== email));
    } catch (error: any) {
      console.error('Erro ao remover usuário:', error);
      setError(error.message || 'Erro ao remover usuário. Verifique as permissões.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 p-6">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-extrabold text-center text-blue-700 dark:text-blue-400 mb-6">
          Painel de Administração
        </h2>

        {/* Feedback Messages */}
        {message && <p className="mb-6 text-center text-green-600 font-semibold dark:text-green-400">{message}</p>}
        {error && <p className="mb-6 text-center text-red-600 font-semibold dark:text-red-400">{error}</p>}

        {/* Add User Form */}
        <div className="mb-10">
          <h3 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Adicionar Usuário</h3>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <input
              type="text"
              placeholder="Nome de Usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Nome Completo"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)} // Atualiza o fullName
              className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:text-gray-100 border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 dark:focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center mt-4">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={() => setIsAdmin(!isAdmin)}
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600"
            />
            <label className="ml-2 text-gray-700 font-medium dark:text-gray-300">Admin</label>
          </div>
          <button
            onClick={handleAddUser}
            className="mt-4 w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
          >
            Adicionar Usuário
          </button>
        </div>

        {/* User List */}
        <h3 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">Lista de Usuários</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse rounded-lg overflow-hidden shadow">
            <thead>
              <tr className="bg-blue-200 dark:bg-blue-700 text-blue-900 dark:text-blue-200">
                <th className="w-1/5 px-4 py-3">Nome de Usuário</th>
                <th className="w-1/4 px-4 py-3">Nome Completo</th>
                <th className="w-1/4 px-4 py-3">Email</th>
                <th className="w-1/6 px-4 py-3">Admin</th>
                <th className="w-1/6 px-4 py-3">Bloqueado</th>
                <th className="w-1/4 px-4 py-3">Ações</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.email} className="bg-white dark:bg-gray-700 even:bg-blue-50 even:dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-600 transition-colors">
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{user.username}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{user.fullName}</td>
                  <td className="px-4 py-3 text-gray-700 dark:text-gray-300">{user.email}</td>
                  <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{user.isAdmin ? 'Sim' : 'Não'}</td>
                  <td className="px-4 py-3 text-center text-gray-700 dark:text-gray-300">{user.isBlocked ? 'Sim' : 'Não'}</td>
                  <td className="px-4 py-3 flex justify-center space-x-2">
                    <button
                      onClick={() => handleBlockUser(user.email, !user.isBlocked)}
                      className={`px-3 py-2 rounded-lg text-white font-semibold ${
                        user.isBlocked ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'
                      } transition-colors`}
                    >
                      {user.isBlocked ? 'Desbloquear' : 'Bloquear'}
                    </button>
                    <button
                      onClick={() => handleRemoveUser(user.email)}
                      className="px-3 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
