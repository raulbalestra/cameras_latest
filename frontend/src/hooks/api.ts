// src/utils/api.ts

const BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000';

// Função para obter os cabeçalhos de autenticação
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.warn('Token não encontrado no localStorage.');
  } else {
    console.log('Token encontrado:', token);
  }
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

// Função genérica de chamada de API
export const api = async (endpoint: string, method = 'GET', body?: any) => {
  const headers = getAuthHeaders();
  console.log('Headers enviados:', headers);

  const config: RequestInit = {
    method,
    headers,
    ...(body && method !== 'GET' ? { body: JSON.stringify(body) } : {}),
  };

  try {
    const response = await fetch(
      `${BASE_URL}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`,
      config,
    );

    if (!response.ok) {
      if (response.status === 401) {
        logout();
        throw new Error('Token inválido ou expirado. Faça login novamente.');
      }
      const errorData = await response.json();
      throw new Error(
        errorData.message || `Erro: ${response.status} ${response.statusText}`,
      );
    }

    return response.json();
  } catch (error: any) {
    console.error('Erro ao fazer a requisição:', error.message);
    throw error;
  }
};

// Funções para manipulação dos usuários
export const fetchUsers = async () => {
  return api('/admin/users');
};

export const addUser = async (
  username: string,
  fullName: string,
  email: string,
  password: string,
  isAdmin: boolean
): Promise<any> => {
  return api('/admin/add_user', 'POST', { username, fullName, email, password, isAdmin });
};


export const blockUser = async (email: string, block: boolean) => {
  return api('/admin/block_user', 'PUT', { email, block });
};

export const removeUser = async (email: string) => {
  return api('/admin/remove_user', 'DELETE', { email });
};
// Função para buscar o nome completo do usuário logado
export const fetchUserFullName = async (): Promise<string> => {
  try {
    const response = await api('/auth/me', 'GET'); // Verifica se `/auth/me` está correto
    console.log('Resposta do perfil:', response);
    return response.fullName; // Certifique-se de que `fullName` é retornado pelo backend
  } catch (error: any) {
    console.error('Erro ao buscar o nome completo do usuário:', error.message);
    throw error;
  }
};
// Função de logout
export const logout = () => {
  localStorage.removeItem('token');
  console.log('Usuário desconectado e token removido do localStorage');
};
