import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Canvas from './componets/Canvas';
import PersonPage from './pages/PersonPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Canvas />} />
        <Route path="/person/:id" element={<PersonPage />} />
      </Routes>
    </Router>
  );
};

export default App;