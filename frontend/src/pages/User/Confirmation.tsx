import React from 'react';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-6 bg-white rounded shadow-md text-center">
        <h1 className="mb-4 text-2xl font-bold text-green-600">¡Gracias por responder!</h1>
        <p className="mb-6 text-gray-700">
          Hemos recibido tus respuestas. ¡Gracias por participar en nuestra encuesta!
        </p>
        <button
          onClick={() => navigate('/')}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
