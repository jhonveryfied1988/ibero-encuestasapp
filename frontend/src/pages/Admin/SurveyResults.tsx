import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

const SurveyResults = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [surveyTitle, setSurveyTitle] = useState('');
  const [results, setResults] = useState<SurveyResult[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await api.get(`/survey/results/${id}`);
        const { title, responses } = response.data;

        setSurveyTitle(title);
        setResults(responses);
      } catch (err) {
        console.error('Error fetching survey results:', err);
        setError('No se pudieron cargar los resultados. Inténtalo más tarde.');
      }
    };

    fetchResults();
  }, [id]);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Resultados de la Encuesta</h1>
      {error && <div className="alert alert-danger text-center">{error}</div>}

      <h2 className="text-center mb-4">{surveyTitle}</h2>

      {results.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-dark">
              <tr>
                <th>Pregunta</th>
                <th>Respuesta</th>
                <th>Email del Usuario</th>
              </tr>
            </thead>
            <tbody>
              {results.map((response, responseIndex) =>
                response.answers.map((answer: Answer, answerIndex: number) => (
                  <tr key={`${responseIndex}-${answerIndex}`}>
                    <td>{answer.questionText || 'Pregunta desconocida'}</td>
                    <td>{answer.value}</td>
                    {answerIndex === 0 && (
                      <td rowSpan={response.answers.length}>{response.userEmail}</td>
                    )}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-center">No se encontraron resultados.</p>
      )}

      <div className="text-center mt-5">
        <button className="btn btn-secondary" onClick={() => navigate('/admin/surveys')}>
          Volver a la Lista de Encuestas
        </button>
      </div>
    </div>
  );
};

export default SurveyResults;
