import React, { useEffect, useState } from 'react';
import api from '../../services/api';

interface Response {
  id: string;
  userId: string;
  surveyId: string;
  answers: Record<string, string>;
  createdAt: string;
}

const Responses = () => {
  const [responses, setResponses] = useState<Response[]>([]);

  const fetchResponses = async () => {
    try {
      const response = await api.get<Response[]>('/responses/list');
      setResponses(response.data);
    } catch (error) {
      console.error('Error al obtener las respuestas:', error);
    }
  };

  useEffect(() => {
    fetchResponses();
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="mb-6 text-2xl font-bold">Respuestas de Encuestas</h1>
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr>
            <th className="px-4 py-2 border">ID</th>
            <th className="px-4 py-2 border">Usuario</th>
            <th className="px-4 py-2 border">Encuesta</th>
            <th className="px-4 py-2 border">Fecha</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response) => (
            <tr key={response.id}>
              <td className="px-4 py-2 border">{response.id}</td>
              <td className="px-4 py-2 border">{response.userId}</td>
              <td className="px-4 py-2 border">{response.surveyId}</td>
              <td className="px-4 py-2 border">{new Date(response.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">
                <button className="px-2 py-1 text-white bg-blue-500 rounded">
                  Ver Detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Responses;
