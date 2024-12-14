import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

// Tipos definidos para evitar el uso de "any"
interface Question {
  id: string;
  text: string;
  type: 'multiple_choice' | 'single_choice' | 'open' | 'true_false';
  options: Option[];
}

interface Option {
  id: string;
  text: string;
}

interface Survey {
  id: string;
  title: string;
  questions: Question[];
}

interface User {
  id: string;
  name: string;
  email: string;
}

const FillSurvey = () => {
  const { id } = useParams<{ id: string }>(); // Parámetro de la URL
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<Survey | null>(null); // Encuesta seleccionada
  const [users, setUsers] = useState<User[]>([]); // Lista de usuarios
  const [selectedUserId, setSelectedUserId] = useState<string>(''); // Usuario seleccionado
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({}); // Respuestas del usuario
  const [error, setError] = useState<string | null>(null); // Mensaje de error

  // Obtener encuesta y usuarios desde el backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const surveyResponse = await api.get<Survey>(`/survey/${id}`);
        setSurvey(surveyResponse.data);

        const usersResponse = await api.get<User[]>('/users/list'); // Endpoint para obtener usuarios
        setUsers(usersResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('No se pudo cargar la encuesta o la lista de usuarios.');
      }
    };

    fetchData();
  }, [id]);

  // Manejar cambios en las respuestas
  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  // Enviar respuestas
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUserId) {
      alert('Por favor, selecciona un usuario para responder la encuesta.');
      return;
    }

    try {
      await api.post('/response/submit', {
        surveyId: id,
        userId: selectedUserId,
        answers: Object.entries(answers).map(([questionId, value]) => ({
          questionId,
          value,
        })),
      });
      navigate('/user/confirmation');
    } catch (err) {
      console.error('Error submitting survey:', err);
      setError('No se pudo enviar la encuesta. Inténtalo más tarde.');
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4">Rellenar Encuesta</h1>
      {error && <div className="alert alert-danger text-center">{error}</div>}

      {survey ? (
        <form onSubmit={handleSubmit}>
          <h2 className="mb-4">{survey.title}</h2>

          {/* Seleccionar Usuario */}
          <div className="mb-4">
            <label className="form-label font-weight-bold">Seleccionar Usuario</label>
            <select
              className="form-control"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              required
            >
              <option value="">Selecciona un usuario...</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} - {user.email}
                </option>
              ))}
            </select>
          </div>

          {/* Preguntas */}
          {survey.questions.map((question) => (
            <div className="mb-4" key={question.id}>
              <label className="form-label font-weight-bold">{question.text}</label>

              {question.type === 'multiple_choice' && (
                <div>
                  {question.options.map((option) => (
                    <div className="form-check" key={option.id}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`question-${question.id}-option-${option.id}`}
                        value={option.text}
                        onChange={(e) => {
                          const currentAnswers = answers[question.id] as string[] || [];
                          if (e.target.checked) {
                            handleAnswerChange(question.id, [...currentAnswers, option.text]);
                          } else {
                            handleAnswerChange(
                              question.id,
                              currentAnswers.filter((answer) => answer !== option.text),
                            );
                          }
                        }}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`question-${question.id}-option-${option.id}`}
                      >
                        {option.text}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {question.type === 'single_choice' && (
                <div>
                  {question.options.map((option) => (
                    <div className="form-check" key={option.id}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`question-${question.id}`}
                        id={`question-${question.id}-option-${option.id}`}
                        value={option.text}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        required
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`question-${question.id}-option-${option.id}`}
                      >
                        {option.text}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {question.type === 'open' && (
                <textarea
                  className="form-control"
                  rows={3}
                  placeholder="Escribe tu respuesta aquí..."
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  required
                />
              )}

              {question.type === 'true_false' && (
                <div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`question-${question.id}`}
                      id={`question-${question.id}-true`}
                      value="true"
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      required
                    />
                    <label className="form-check-label" htmlFor={`question-${question.id}-true`}>
                      Verdadero
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name={`question-${question.id}`}
                      id={`question-${question.id}-false`}
                      value="false"
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      required
                    />
                    <label className="form-check-label" htmlFor={`question-${question.id}-false`}>
                      Falso
                    </label>
                  </div>
                </div>
              )}
            </div>
          ))}

          <button type="submit" className="btn btn-primary btn-block mt-4">
            Enviar Encuesta
          </button>
        </form>
      ) : (
        <p className="text-center">Cargando encuesta...</p>
      )}

      <div className="text-center mt-4">
        <button className="btn btn-secondary" onClick={() => navigate('/user/surveys')}>
          Volver a las Encuestas
        </button>
      </div>
    </div>
  );
};

export default FillSurvey;
