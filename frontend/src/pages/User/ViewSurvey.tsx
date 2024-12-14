import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../../services/api';

const ViewSurvey = () => {
  const { id } = useParams<{ id: string }>(); // Extraer el ID de la encuesta de la URL
  const [survey, setSurvey] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await api.get(`/survey/${id}`); // Llamada al backend para obtener la encuesta
        setSurvey(response.data);
      } catch (err) {
        setError('No se pudo cargar la encuesta. Intenta nuevamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchSurvey();
  }, [id]);

  if (loading) {
    return <p className="text-center">Cargando encuesta...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold text-center">{survey?.title}</h1>
      <div className="mt-6">
        {survey?.questions.map((question: any, index: number) => (
          <div key={question.id} className="mb-4">
            <h2 className="text-lg font-medium">
              {index + 1}. {question.text}
            </h2>
            <ul className="mt-2">
              {question.options.map((option: any) => (
                <li key={option.id} className="py-1">
                  {option.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ViewSurvey;
