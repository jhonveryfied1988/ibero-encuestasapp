import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin/Admin';
import User from './pages/User/User';
import Wrapper from './components/Wrapper';

function App() {
  return (
    <Wrapper>
      <Routes>
        {/* Ruta principal */}
        <Route path="/" element={<Home />} />

        {/* Rutas base para Admin y User */}
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/user/*" element={<User />} />

        {/* Ruta por defecto para errores */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Wrapper>
  );
}

export default App;
