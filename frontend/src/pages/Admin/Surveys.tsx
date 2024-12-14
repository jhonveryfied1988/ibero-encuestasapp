import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Surveys = () => {
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Cargar las encuestas desde el backend
  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await api.get('/survey/list');
        setSurveys(response.data);
      } catch (err) {
        console.error('Error fetching surveys:', err);
        setError('No se pudieron cargar las encuestas. Inténtalo más tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchSurveys();
  }, []);

  const handleEdit = (id: string) => {
    navigate(`/admin/edit-survey/${id}`);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta encuesta?')) {
      try {
        await api.delete(`/survey/${id}`);
        setSurveys((prev) => prev.filter((survey) => survey.id !== id));
        alert('Encuesta eliminada correctamente.');
      } catch (err) {
        console.error('Error deleting survey:', err);
        alert('No se pudo eliminar la encuesta. Inténtalo de nuevo.');
      }
    }
  };

  const handleResults = (id: string) => {
    navigate(`/admin/surveys/results/${id}`);
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Lista de Encuestas</h1>

      {/* Mensaje de Error */}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* Loading */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">Cargando...</span>
          </div>
        </div>
      ) : surveys.length === 0 ? (
        <div className="alert alert-info text-center">
          No hay encuestas disponibles en este momento.
        </div>
      ) : (
        <table className="table table-hover table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Título</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {surveys.map((survey, index) => (
              <tr key={survey.id}>
                <th scope="row">{index + 1}</th>
                <td>{survey.title}</td>
                <td className="text-center">
                  {survey.isActive ? (
                    <span className="text-success">✔ Activa</span>
                  ) : (
                    <span className="text-danger">Inactiva</span>
                  )}
                </td>
                <td>
                  <div className="btn-group" role="group">
                    {/* Botón Ver Resultados */}
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handleResults(survey.id)}
                    >
                      Resultados
                    </button>
                    {/* Botón Editar */}
                    <button
                      className="btn btn-sm btn-info"
                      onClick={() => handleEdit(survey.id)}
                    >
                      Editar
                    </button>
                    {/* Botón Eliminar */}
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(survey.id)}
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Botón para Crear Nueva Encuesta */}
      <div className="text-center mt-4">
        <button
          onClick={() => navigate('/admin/create-survey')}
          className="btn btn-success"
        >
          Crear Nueva Encuesta
        </button>
      </div>
    </div>
  );
};

export default Surveys;
