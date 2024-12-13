import Home from './pages/Home';
import Login from './pages/Admin/Login'; // Ajusta según tu estructura
import SurveyList from './pages/User/SurveyList'; // Ajusta según tu estructura
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/admin/*" element={<Login />} />
      <Route path="/user/*" element={<SurveyList />} />
    </Routes>
  );
}

export default App;
