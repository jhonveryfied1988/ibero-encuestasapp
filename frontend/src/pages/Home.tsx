import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="text-center">
        <h1 className="mb-4">Bienvenido a la Plataforma de Encuestas</h1>
        <p className="mb-4">Por favor selecciona cómo deseas ingresar:</p>
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-primary btn-lg"
            onClick={() => navigate('/admin')}
          >
            Módulo de Administrador
          </button>
          <button
            className="btn btn-secondary btn-lg"
            onClick={() => navigate('/user')}
          >
            Módulo de Usuario
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
