import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Chart as ChartJS, Tooltip, Legend, ArcElement } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import api from '../../services/api';

ChartJS.register(ArcElement, Tooltip, Legend);

const SurveyResults = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const [surveyTitle, setSurveyTitle] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      if (!id) {
        setError('ID de encuesta no proporcionado.');
        return;
      }

      try {
        const response = await api.get(`/survey/results/${id}`);
        const { title, responses } = response.data;

        setSurveyTitle(title || 'Encuesta sin título');
        setResults(responses || []);
      } catch (err) {
        console.error('Error fetching survey results:', err);
        setError('No se pudieron cargar los resultados. Inténtalo más tarde.');
      }
    };

    fetchResults();
  }, [id]);

  // Agrupar respuestas por pregunta
  const groupedResults = results.reduce((acc: any, response: any) => {
    response.answers.forEach((answer: any) => {
      if (!acc[answer.questionText]) {
        acc[answer.questionText] = [];
      }
      acc[answer.questionText].push({
        value: answer.value,
        user: response.user.email,
      });
    });
    return acc;
  }, {});

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Resultados de la Encuesta</h1>
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {/* Título de la Encuesta */}
      <h2 className="text-center mb-4">{surveyTitle}</h2>

      {/* Tabla de Resultados */}
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Pregunta</th>
              <th scope="col">Respuesta</th>
              <th scope="col">Usuario</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(groupedResults).map((question) =>
              groupedResults[question].map((result: any, index: number) => (
                <tr key={`${question}-${index}`}>
                  <td>{question}</td>
                  <td>{result.value}</td>
                  <td>{result.user}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Botón Volver */}
      <div className="text-center mt-5">
        <button className="btn btn-secondary" onClick={() => navigate('/admin/surveys')}>
          Volver a la Lista de Encuestas
        </button>
      </div>
    </div>
  );
};

export default SurveyResults;
