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
  const navigate = useNavigate();

  const fetchSurveys = async () => {
    try {
      const response = await api.get<Survey[]>('/survey/list');
      setSurveys(response.data);
    } catch (error) {
      console.error('Error al obtener las encuestas:', error);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Encuestas Disponibles</h1>
      <div className="row">
        {surveys.map((survey) => (
          <div key={survey.id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{survey.title}</h5>
                <button
                  onClick={() => navigate(`/survey/${survey.id}`)}
                  className="btn btn-primary btn-block"
                >
                  Responder Encuesta
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SurveyList;
