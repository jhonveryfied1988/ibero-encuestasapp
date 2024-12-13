import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/api';

interface Question {
  id: string;
  text: string;
  type: 'true_false' | 'single_choice' | 'multiple_choice' | 'open';
  options?: { id: string; text: string }[];
}

interface Survey {
  id: string;
  title: string;
  questions: Question[];
}

const FillSurvey = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [answers, setAnswers] = useState<Record<string, string | boolean | string[]>>({});
  const [userInfo, setUserInfo] = useState({ name: '', email: '', phone: '' });

  const fetchSurvey = async () => {
    try {
      const response = await api.get<Survey>(`/survey/${id}`);
      setSurvey(response.data);
    } catch (error) {
      console.error('Error al cargar la encuesta:', error);
    }
  };

  useEffect(() => {
    fetchSurvey();
  }, [id]);

  const handleAnswerChange = (questionId: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post('/response/create', {
        surveyId: id,
        userInfo,
        answers,
      });
      navigate('/confirmation');
    } catch (error) {
      console.error('Error al enviar las respuestas:', error);
    }
  };

  if (!survey) return <div>Cargando encuesta...</div>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">{survey.title}</h1>
      <form onSubmit={handleSubmit}>
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Información del Usuario</h5>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                value={userInfo.name}
                onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Correo Electrónico</label>
              <input
                type="email"
                value={userInfo.email}
                onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                className="form-control"
                required
              />
            </div>
            <div className="form-group">
              <label>Teléfono</label>
              <input
                type="text"
                value={userInfo.phone}
                onChange={(e) => setUserInfo({ ...userInfo, phone: e.target.value })}
                className="form-control"
                required
              />
            </div>
          </div>
        </div>
        {survey.questions.map((question) => (
          <div key={question.id} className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">{question.text}</h5>
              {question.type === 'true_false' && (
                <div className="form-check">
                  <input
                    type="radio"
                    name={question.id}
                    value="true"
                    className="form-check-input"
                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                  />
                  <label className="form-check-label">Verdadero</label>
                </div>
              )}
            </div>
          </div>
        ))}
        <button type="submit" className="btn btn-primary btn-block">
          Enviar Respuestas
        </button>
      </form>
    </div>
  );
};

export default FillSurvey;
