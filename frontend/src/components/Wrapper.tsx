import React from 'react';
import { useNavigate } from 'react-router-dom';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="w-full bg-dark py-3">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-white m-0">Plataforma de Encuestas</h1>
          <button
            onClick={() => navigate('/')}
            className="btn btn-danger"
          >
            Volver al Home
          </button>
        </div>
      </header>

      {/* Contenedor Principal con Ancho Fijo */}
      <div className="flex-grow flex items-center justify-center">
        <main className="w-full max-w-[1000px] text-center bg-white shadow-lg p-6 rounded-lg">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="w-full bg-dark py-3 text-white text-center">
        <p className="mb-0">© 2024 Plataforma de Encuestas. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Wrapper;
