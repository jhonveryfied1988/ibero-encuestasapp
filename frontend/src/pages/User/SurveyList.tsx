import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

interface Survey {
  id: string;
  title: string;
  isActive: boolean;
}

const SurveyList = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Obtener encuestas disponibles
  const fetchSurveys = async () => {
    try {
      const response = await api.get<Survey[]>('/survey/list');
      const activeSurveys = response.data.filter((survey) => survey.isActive); // Filtrar solo encuestas activas
      setSurveys(activeSurveys);
    } catch (error) {
      console.error('Error al obtener las encuestas:', error);
      setError('No se pudieron cargar las encuestas. Inténtalo más tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Encuestas Disponibles</h1>

      {/* Mensaje de Error */}
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* Loader mientras carga */}
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
        <div className="row">
          {surveys.map((survey) => (
            <div key={survey.id} className="col-md-4 mb-4">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-truncate" title={survey.title}>
                    {survey.title}
                  </h5>
                  <button
                    onClick={() => navigate(`/user/fill-survey/${survey.id}`)}
                    className="btn btn-primary btn-block"
                  >
                    Responder Encuesta
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SurveyList;
