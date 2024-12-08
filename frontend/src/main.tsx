import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Componente principal da aplicação
import './css/style.css'; // Estilos principais
import './css/satoshi.css'; // Estilos adicionais
import 'flatpickr/dist/flatpickr.min.css'; // Estilos para o flatpickr

// Criação da raiz da aplicação
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Router>
        <App /> {/* Componente principal que contém as rotas */}
      </Router>
  </React.StrictMode>
);
