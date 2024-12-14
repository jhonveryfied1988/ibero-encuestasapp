import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import SurveyList from './SurveyList';
import FillSurvey from './FillSurvey';
import ViewSurvey from './ViewSurvey';

const User = () => {
  return (
    <div className="content-wrapper">
      <div className="content-header">
        <div className="container-fluid">
          <h1 className="m-0 text-dark">Usuario</h1>
        </div>
      </div>
      <Routes>
        {/* Redirección predeterminada desde /user */}
        <Route path="/" element={<Navigate to="surveys" />} />

        {/* Subrutas para User */}
        <Route path="surveys" element={<SurveyList />} />
        <Route path="fill-survey" element={<FillSurvey />} />
        <Route path="view-survey/:id" element={<ViewSurvey />} />
      </Routes>
    </div>
  );
};

export default User;
