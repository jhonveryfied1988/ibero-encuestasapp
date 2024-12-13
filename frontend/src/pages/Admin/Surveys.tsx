import React, { useEffect, useState } from 'react';
import api from '../../services/api';

interface Survey {
  id: string;
  title: string;
  createdAt: string;
  isActive: boolean;
}

const Surveys = () => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [selectedSurvey, setSelectedSurvey] = useState<Survey | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState('');

  // Fetch surveys from the backend
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

  // Open the edit modal
  const handleEdit = (survey: Survey) => {
    setSelectedSurvey(survey);
    setEditedTitle(survey.title);
    setShowModal(true);
  };

  // Update the survey title
  const handleUpdate = async () => {
    if (!selectedSurvey) return;

    try {
      await api.put(`/survey/update/${selectedSurvey.id}`, { title: editedTitle });
      setShowModal(false);
      fetchSurveys();
    } catch (error) {
      console.error('Error al actualizar la encuesta:', error);
    }
  };

  // Delete a survey
  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar esta encuesta?')) return;

    try {
      await api.delete(`/survey/${id}`);
      fetchSurveys();
    } catch (error) {
      console.error('Error al eliminar la encuesta:', error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="mb-6 text-2xl font-bold">Gestión de Encuestas</h1>
      <table className="min-w-full bg-white border rounded">
        <thead>
          <tr>
            <th className="px-4 py-2 border">Título</th>
            <th className="px-4 py-2 border">Fecha de Creación</th>
            <th className="px-4 py-2 border">Estado</th>
            <th className="px-4 py-2 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {surveys.map((survey) => (
            <tr key={survey.id}>
              <td className="px-4 py-2 border">{survey.title}</td>
              <td className="px-4 py-2 border">{new Date(survey.createdAt).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">{survey.isActive ? 'Activa' : 'Inactiva'}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleEdit(survey)}
                  className="px-2 py-1 mr-2 text-white bg-blue-500 rounded"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(survey.id)}
                  className="px-2 py-1 text-white bg-red-500 rounded"
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for Editing */}
      {showModal && selectedSurvey && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="p-6 bg-white rounded shadow-md">
            <h2 className="mb-4 text-lg font-bold">Editar Encuesta</h2>
            <label className="block mb-2 text-sm font-medium">Título</label>
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full px-3 py-2 mb-4 border rounded"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-white bg-gray-500 rounded"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 text-white bg-blue-500 rounded"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Surveys;
