import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './Login';
import SurveyList from './Surveys';

const Admin = () => {
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <h1 className="m-0 text-dark">Administrador</h1>
        </div>
      </div>
      <Routes>
        {/* Redirección predeterminada desde /admin */}
        <Route path="/" element={<Navigate to="login" />} />

        {/* Subrutas para Admin */}
        <Route path="login" element={<Login />} />
        <Route path="surveys" element={<SurveyList />} />
      </Routes>
    </div>
  );
};

export default Admin;
