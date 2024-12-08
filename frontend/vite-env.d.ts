/// <reference types="vite/client" />

// Declaração de tipos para variáveis de ambiente do Vite
interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string; // Declara a variável de ambiente
    // Adicione outras variáveis de ambiente aqui, se necessário
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
  