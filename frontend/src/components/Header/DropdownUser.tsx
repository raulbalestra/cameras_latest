import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClickOutside from '../ClickOutside';
import { api } from '../../hooks/api'; // Importa a função de API

interface DropdownUserProps {
  onLogout: () => void; // Função para logout
}

const DropdownUser: React.FC<DropdownUserProps> = ({ onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [storedFullName, setStoredFullName] = useState<string>(''); // Estado para o nome completo do usuário

  useEffect(() => {
    const fetchFullName = async () => {
      try {
        const response = await api('/auth/me', 'GET'); // Rota no backend
        setStoredFullName(response.fullName);
      } catch (error) {
        console.error('Erro ao buscar o nome completo do usuário:', error);
      }
    };

    fetchFullName();
  }, []);

  return (
    <ClickOutside onClick={() => setDropdownOpen(false)} className="relative">
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4 cursor-pointer"
      >
        {/* Informações do usuário */}
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-gray-800 dark:text-white transition-colors duration-300">
            <span className="block text-sm font-medium text-gray-800 dark:text-white transition-colors duration-300">
              {storedFullName}
            </span>
          </span>
        </span>

        {/* Avatar do usuário */}
        <span className="flex items-center justify-center h-12 w-12 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden transition-transform duration-300 transform hover:scale-105">
          <span className="text-lg font-semibold text-white">
            {storedFullName?.charAt(0).toUpperCase() || '?'}
          </span>
        </span>
      </button>

      {/* Menu dropdown */}
      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-gray-800 transition-transform transform duration-200 ease-in-out scale-95 origin-top-right animate-fadeIn">
          <ul className="py-3">
            {/* Link para o perfil */}
            <li>
              <Link
                to="/profile"
                className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                </svg>
                Meu Perfil
              </Link>
            </li>

            {/* Link para configurações */}
            <li>
              <Link
                to="/settings"
                className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-300 dark:hover:text-blue-400 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm6 0h2V4h-2v4zM4 4v4H2V4h2zm8-4v2h-4V0h4zm0 22v2h-4v-2h4zm9.04-13.78L20 8.38l-2.04 2.04-1.42-1.42L18.38 7l-2.04-2.04 1.42-1.42L20 5.62l2.04-2.04 1.42 1.42L21.62 7l2.04 2.04-1.42 1.42zM5.62 20l-1.42-1.42L4.38 18l2.04-2.04L7.82 18l2.04 2.04-1.42 1.42L6 20z" />
                </svg>
                Configurações da Conta
              </Link>
            </li>
          </ul>
          <div className="border-t border-gray-200 dark:border-gray-700"></div>
          {/* Botão de logout */}
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-6 py-3 text-sm font-medium text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 transition-colors duration-200"
          >
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M16 13v-2H7V8l-5 4 5 4v-3h9zm1 7H7v-1h10v1zm0-14H7V5h10v1z" />
            </svg>
            Sair
          </button>
        </div>
      )}
    </ClickOutside>
  );
};

export default DropdownUser;
