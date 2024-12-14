import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';

const Login = () => {
  const [email, setEmail] = useState('johndoe@example.com');
  const [password, setPassword] = useState('password123');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const response = await api.post('/auth/login', { email, password });
      console.log('Login successful:', response.data);

      // Redirige al listado de encuestas tras un login correcto
      navigate('/admin/surveys');
    } catch (error: any) {
      console.error('Login failed:', error);
      if (error.response?.status === 401) {
        setErrorMessage('Credenciales incorrectas. Por favor, intenta nuevamente.');
      } else {
        setErrorMessage('Ocurrió un error en el servidor. Intenta más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Imagen en formato Base64
  const base64Image =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHJlY3Qgd2lkdGg9IjEwMCIgaGVpZ2h0PSIxMDAiIGZpbGw9IiMzYjNkM2UiLz48dGV4dCB4PSI1MCIgeT0iNTUiIGR5PSIuM2VtIiBmb250LXNpemU9IjI1IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5Mb2dpbjwvdGV4dD48L3N2Zz4=';

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg border border-gray-200"
      >
        {/* Header con Imagen */}
        <div className="flex flex-col items-center mb-6">
          <img
            src={base64Image}
            alt="Login Illustration"
            className="w-24 h-24 mb-4"
          />
          <h2 className="text-xl font-bold text-center text-gray-800">
            Iniciar Sesión
          </h2>
          <p className="text-sm text-gray-500 text-center">
            Accede con tus credenciales para gestionar las encuestas.
          </p>
        </div>

        {/* Mensaje de Error */}
        {errorMessage && (
          <p className="mb-4 text-sm text-red-500">{errorMessage}</p>
        )}

        {/* Agrupación con Fieldset */}
        <fieldset className="border border-gray-300 p-4 rounded-lg">
          <legend className="text-blue-500 font-semibold px-3 text-base">
            Credenciales
          </legend>

          {/* Campo Email */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Correo Electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="ejemplo@correo.com"
              aria-label="Correo Electrónico"
              required
            />
          </div>

          {/* Campo Contraseña */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-1 text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="********"
              aria-label="Contraseña"
              required
            />
          </div>

          {/* Botón de Inicio de Sesión */}
          <button
            type="submit"
            className={`w-full px-4 py-2 rounded-lg text-white ${
              loading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600 focus:ring-2 focus:ring-blue-400'
            }`}
            disabled={loading}
          >
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </fieldset>
      </form>

      {/* Botón para Volver al Home */}
      <button
        onClick={() => navigate('/')}
        className="px-4 py-2 mt-4 text-red-500 bg-transparent border border-red-500 rounded-lg hover:bg-red-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-400"
      >
        Volver al Home
      </button>
    </div>
  );
};

export default Login;
