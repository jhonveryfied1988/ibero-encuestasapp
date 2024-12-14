import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('Login exitoso:', response.data);
      navigate('/admin/surveys'); // Redirige al dashboard tras iniciar sesión
    } catch (err) {
      console.error('Error al iniciar sesión:', err);
      setError('Credenciales incorrectas. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg" style={{ width: '100%', maxWidth: '400px' }}>
        <div className="card-body">
          <h2 className="text-center mb-4">Bienvenido</h2>

          {error && <div className="alert alert-danger text-center">{error}</div>}

          <form onSubmit={handleLogin}>
            {/* Campo Email */}
            <div className="form-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                className="form-control"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Campo Contraseña */}
            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                className="form-control"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {/* Botón para iniciar sesión */}
            <div className="d-grid">
              <button type="submit" className="btn btn-primary btn-block mb-3">
                Iniciar Sesión
              </button>
            </div>
          </form>

          {/* Botonera para Login y Registro */}
          <div className="d-flex justify-content-between">
            <button
              onClick={() => navigate('/admin/register')}
              className="btn btn-secondary"
            >
              Crear Cuenta
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn btn-light"
            >
              Volver al Inicio
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
