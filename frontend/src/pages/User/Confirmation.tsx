import React from 'react';
import { useNavigate } from 'react-router-dom';

const Confirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="text-center">
        {/* Icono de confirmación */}
        <div className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="96"
            height="96"
            fill="currentColor"
            className="bi bi-check-circle text-success"
            viewBox="0 0 16 16"
          >
            <path d="M15.854 4.146a.5.5 0 0 0-.708-.708L7.5 11.293 4.354 8.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l8-8z" />
            <path d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 1 8 0a8 8 0 0 1 0 16z" />
          </svg>
        </div>

        {/* Mensaje de confirmación */}
        <h1 className="mb-3 text-success">¡Encuesta enviada con éxito!</h1>
        <p className="mb-4 text-muted">
          Gracias por completar la encuesta. Tus respuestas han sido registradas correctamente.
        </p>

        {/* Botón para regresar a las encuestas */}
        <button
          className="btn btn-primary"
          onClick={() => navigate('/user/surveys')}
        >
          Volver a las Encuestas
        </button>
      </div>
    </div>
  );
};

export default Confirmation;
