// src/pages/Cameras/Guarapuava.tsx
import React from 'react';
import Stream from '../../components/Stream';

const Guarapuava = () => {
  const handleOpenGate = () => {
    // Lógica para abrir o portão
    alert('Portão aberto com sucesso!');
  };
  const handleReloadPage = () => {
    // Recarregar a página
    window.location.reload();
  };

  return (
    <div className="p-5 text-center">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Mosaico de Câmeras - Guarapuava</h1>
      </div>
      <div className="flex justify-center gap-x-4 mb-6">
        <button
          onClick={handleReloadPage}
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Recarregar Câmeras
        </button>
        <button
          onClick={handleOpenGate}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Abrir Portão
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-5">
        {/* Canal 1 */}
        <div className="border border-gray-300 rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-medium mb-2">Guarapuava - Canal 1</h2>
          <Stream city="Guarapuava" channel={1} />
        </div>

        {/* Canal 2 */}
        <div className="border border-gray-300 rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-medium mb-2">Guarapuava - Canal 2</h2>
          <Stream city="Guarapuava" channel={2} />
        </div>

        {/* Canal 3 */}
        <div className="border border-gray-300 rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-medium mb-2">Guarapuava - Canal 3</h2>
          <Stream city="Guarapuava" channel={3} />
        </div>

        {/* Canal 4 */}
        <div className="border border-gray-300 rounded-lg p-4 shadow-md">
          <h2 className="text-lg font-medium mb-2">Guarapuava - Canal 4</h2>
          <Stream city="Guarapuava" channel={4} />
        </div>
      </div>
    </div>
  );
};

export default Guarapuava;
