import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

// Opciones de tipos de preguntas
const questionTypes = [
  { value: 'single_choice', label: 'Opción Única' },
  { value: 'multiple_choice', label: 'Selección Múltiple' },
  { value: 'true_false', label: 'Verdadero/Falso' },
  { value: 'open', label: 'Respuesta Abierta' },
];

const EditSurvey = () => {
  const { id } = useParams<{ id: string }>(); // ID de la encuesta desde la URL
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<
    { id?: string; text: string; type: string; options?: { id?: string; text: string }[] }[]
  >([]);

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await api.get(`/survey/${id}`);
        const { title, questions } = response.data;

        setTitle(title);
        setQuestions(
          questions.map((question: any) => ({
            id: question.id,
            text: question.text,
            type: question.type,
            options: question.options?.map((opt: any) => ({
              id: opt.id,
              text: opt.text,
            })),
          }))
        );
      } catch (error) {
        console.error('Error al cargar la encuesta:', error);
        alert('No se pudo cargar la encuesta.');
        navigate('/admin/surveys');
      }
    };

    fetchSurvey();
  }, [id, navigate]);

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index][field] = value;
    setQuestions(updatedQuestions);
  };

  const handleOptionChange = (qIndex: number, oIndex: number, value: string) => {
    const updatedQuestions = [...questions];
    if (!updatedQuestions[qIndex].options) {
      updatedQuestions[qIndex].options = [];
    }
    updatedQuestions[qIndex].options![oIndex].text = value;
    setQuestions(updatedQuestions);
  };

  const handleAddOption = (qIndex: number) => {
    const updatedQuestions = [...questions];
    if (!updatedQuestions[qIndex].options) {
      updatedQuestions[qIndex].options = [];
    }
    updatedQuestions[qIndex].options!.push({ text: '' });
    setQuestions(updatedQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', type: '', options: [] }]);
  };

  const handleUpdateSurvey = async () => {
    try {
      const updatedSurvey = {
        title,
        questions: questions.map((q) => ({
          id: q.id,
          text: q.text,
          type: q.type,
          options:
            q.type === 'multiple_choice' || q.type === 'single_choice'
              ? q.options?.map((opt) => ({
                  id: opt.id,
                  text: opt.text,
                }))
              : undefined,
        })),
      };

      await api.put(`/survey/update/${id}`, updatedSurvey);
      alert('Encuesta actualizada con éxito');
      navigate('/admin/surveys');
    } catch (error) {
      console.error('Error al actualizar la encuesta:', error);
      alert('No se pudo actualizar la encuesta.');
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Editar Encuesta</h1>
      <div className="card">
        <div className="card-body">
          {/* Campo para el título */}
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="form-control"
              placeholder="Editar título de la encuesta"
            />
          </div>

          {/* Preguntas dinámicas */}
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="form-group">
              <hr /> {/* Línea separadora */}
              <label>Pregunta {qIndex + 1}</label>
              {/* Campo oculto para el ID de la pregunta */}
              {question.id && <input type="hidden" value={question.id} />}
              {/* Campo de texto para la pregunta */}
              <input
                type="text"
                value={question.text}
                onChange={(e) => handleQuestionChange(qIndex, 'text', e.target.value)}
                className="form-control mb-2"
                placeholder={`Editar pregunta ${qIndex + 1}`}
              />
              {/* Selector para el tipo de pregunta */}
              <select
                value={question.type}
                onChange={(e) => handleQuestionChange(qIndex, 'type', e.target.value)}
                className="form-control mb-2"
              >
                <option value="" disabled>
                  Selecciona el tipo de pregunta
                </option>
                {questionTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              {/* Opciones dinámicas */}
              {(question.type === 'multiple_choice' || question.type === 'single_choice') && (
                <div>
                  <h5>Opciones</h5>
                  {question.options?.map((option, oIndex) => (
                    <div key={oIndex} className="form-group">
                      {/* Campo oculto para el ID de la opción */}
                      {option.id && <input type="hidden" value={option.id} />}
                      {/* Campo de texto para la opción */}
                      <input
                        type="text"
                        value={option.text}
                        onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                        className="form-control mb-2"
                        placeholder={`Opción ${oIndex + 1}`}
                      />
                    </div>
                  ))}
                  <button
                    onClick={() => handleAddOption(qIndex)}
                    className="btn btn-warning btn-sm mb-3"
                  >
                    Agregar Opción
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* Botón para agregar preguntas */}
          <button onClick={handleAddQuestion} className="btn btn-success btn-sm mb-3">
            Agregar Pregunta
          </button>

          {/* Botones de acción */}
          <div className="d-flex justify-content-between">
            <button onClick={() => navigate('/admin/surveys')} className="btn btn-danger">
              Volver a la Lista
            </button>
            <button onClick={handleUpdateSurvey} className="btn btn-primary">
              Guardar Cambios
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditSurvey;
