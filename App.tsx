import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';

import SignUpPage from './components/SignUpPage';
import Dashboard from './components/Dashboard';
import TrainingPage from './components/TrainingPage';
import TrainingDetailsPage from './components/TrainingDetailsPage';
import UserProfilePage from './components/UserProfilePage';
import AchievementsPage from './components/AchievementsPage';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/training" element={<TrainingPage />} />
        <Route path="/training/:id" element={<TrainingDetailsPage />} />
        <Route path="/profile" element={<UserProfilePage />} />
        <Route path="/achievements" element={<AchievementsPage />} />
      </Routes>
    </Router>
  );
};

export default App;