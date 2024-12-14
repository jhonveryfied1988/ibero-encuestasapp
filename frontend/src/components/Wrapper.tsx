import React from 'react';
import { useNavigate } from 'react-router-dom';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Header */}
      <header className="bg-dark py-3">
        <div className="container d-flex justify-content-between align-items-center">
          <h1 className="text-white m-0">Plataforma de Encuestas - Analisis y diseño de sistemas - Act 3.</h1>
        </div>
      </header>

      {/* Contenedor Principal Centrado */}
      <div className="flex-grow-1 d-flex justify-content-center align-items-center position-relative">
        {/* Botón Volver al Inicio */}
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary position-absolute"
          style={{ top: '10px', right: '10px' }}
        >
          Volver al Inicio
        </button>

        {/* Contenido Principal */}
        <main className="bg-white shadow p-4 rounded w-100" style={{ maxWidth: '1000px' }}>
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-dark py-3 text-center text-white">
        <p className="mb-0">© 2024 Plataforma de Encuestas Jhon Alexander Perez Ramirez. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Wrapper;
