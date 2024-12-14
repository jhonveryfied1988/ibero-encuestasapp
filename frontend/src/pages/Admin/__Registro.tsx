import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      await api.post('/auth/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      setSuccess('Registro exitoso. Redirigiendo al inicio de sesión...');
      setTimeout(() => navigate('/admin/login'), 2000);
    } catch (err) {
      console.error(err);
      setError('Hubo un error al registrarse. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg" style={{ width: '100%', maxWidth: '500px' }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Registro</h2>

          {error && <div className="alert alert-danger text-center">{error}</div>}
          {success && <div className="alert alert-success text-center">{success}</div>}

          <form onSubmit={handleSubmit}>
            {/* Campo Nombre */}
            <div className="form-group">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Ingresa tu nombre"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Campo Correo */}
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                placeholder="ejemplo@correo.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Campo Contraseña */}
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-control"
                placeholder="Crea una contraseña"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Campo Confirmar Contraseña */}
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirmar Contraseña</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className="form-control"
                placeholder="Repite tu contraseña"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block">
              Registrarse
            </button>
          </form>

          {/* Botón para volver */}
          <button
            onClick={() => navigate('/')}
            className="btn btn-secondary btn-block mt-3"
          >
            Volver al Inicio
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
