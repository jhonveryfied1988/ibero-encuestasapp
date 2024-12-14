import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const CreateSurvey = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([
    { text: '', type: 'open', options: '' },
  ]);
  const navigate = useNavigate();

  const handleAddQuestion = () => {
    setQuestions([...questions, { text: '', type: 'open', options: '' }]);
  };

  const handleQuestionChange = (index: number, field: string, value: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
    setQuestions(updatedQuestions);
  };

  const validateQuestions = () => {
    for (const question of questions) {
      if (!question.text.trim()) {
        alert('Todas las preguntas deben tener un texto.');
        return false;
      }
      if (
        (question.type === 'single_choice' || question.type === 'multiple_choice') &&
        (!question.options || question.options.split(',').length < 2)
      ) {
        alert('Las preguntas de selección deben tener al menos dos opciones.');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateQuestions()) {
      return;
    }

    const formattedQuestions = questions.map((question) => ({
      text: question.text,
      type: question.type,
      options:
        question.type === 'single_choice' || question.type === 'multiple_choice'
          ? question.options.split(',').map((opt) => opt.trim())
          : undefined,
    }));

    const surveyData = {
      userId: '122a6530-c88c-4c50-af6c-3ce96a95f3a1', // Usuario predeterminado
      title,
      questions: formattedQuestions,
    };

    try {
      const response = await api.post('/survey/create', surveyData);
      console.log('Encuesta creada:', response.data);
      alert('¡Encuesta creada satisfactoriamente!');
      navigate('/admin/surveys');
    } catch (error) {
      console.error('Error al crear la encuesta:', error);
      alert('Ocurrió un error al crear la encuesta. Por favor, inténtalo de nuevo.');
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Crear Nueva Encuesta</h2>
      <form onSubmit={handleSubmit} className="w-100 bg-white p-4 rounded shadow-lg">
        {/* Campo Título */}
        <div className="form-group mb-4">
          <label htmlFor="title" className="form-label">
            Título de la Encuesta
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            placeholder="Ingresa el título de la encuesta"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        {/* Preguntas */}
        <fieldset className="border p-3 rounded">
          <legend className="w-auto px-2 text-primary font-weight-bold">Preguntas</legend>
          {questions.map((question, index) => (
            <div key={index} className="mb-4 border-bottom pb-3">
              {/* Campo Texto de la Pregunta */}
              <div className="form-group">
                <label htmlFor={`question-text-${index}`} className="form-label">
                  Pregunta {index + 1}
                </label>
                <input
                  type="text"
                  id={`question-text-${index}`}
                  className="form-control"
                  placeholder="Ingresa el texto de la pregunta"
                  value={question.text}
                  onChange={(e) =>
                    handleQuestionChange(index, 'text', e.target.value)
                  }
                  required
                />
              </div>

              {/* Selector Tipo de Pregunta */}
              <div className="form-group">
                <label htmlFor={`question-type-${index}`} className="form-label">
                  Tipo de Pregunta
                </label>
                <select
                  id={`question-type-${index}`}
                  className="form-control"
                  value={question.type}
                  onChange={(e) =>
                    handleQuestionChange(index, 'type', e.target.value)
                  }
                  required
                >
                  <option value="open">Respuesta Abierta</option>
                  <option value="single_choice">Selección Única</option>
                  <option value="multiple_choice">Selección Múltiple</option>
                  <option value="true_false">Verdadero/Falso</option>
                </select>
              </div>

              {/* Campo Opciones (Solo para Single o Multiple Choice) */}
              {(question.type === 'single_choice' || question.type === 'multiple_choice') && (
                <div className="form-group">
                  <label htmlFor={`question-options-${index}`} className="form-label">
                    Opciones (Separadas por coma)
                  </label>
                  <input
                    type="text"
                    id={`question-options-${index}`}
                    className="form-control"
                    placeholder="Opción 1, Opción 2, Opción 3"
                    value={question.options}
                    onChange={(e) =>
                      handleQuestionChange(index, 'options', e.target.value)
                    }
                  />
                </div>
              )}
            </div>
          ))}

          {/* Botón para Agregar Pregunta */}
          <button
            type="button"
            className="btn btn-secondary w-100"
            onClick={handleAddQuestion}
          >
            Añadir Pregunta
          </button>
        </fieldset>

        {/* Botón Enviar */}
        <button type="submit" className="btn btn-primary w-100 mt-4">
          Crear Encuesta
        </button>
      </form>
    </div>
  );
};

export default CreateSurvey;
