import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './components/HomePage'
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import SettingsPage from './components/SettingsPage';
import ProfilePage from './components/ProfilePage';

function App() {

  return (
    <div className="h-[100vh]">
      <Router>
          <Routes>
              <Route path="/" element={<Navigate to="/signup" />} />
              <Route path="/login" element={<SignupPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/home" element={<SettingsPage />} />
              <Route path="/home" element={<ProfilePage />} />
          </Routes>
      </Router>
  </div>
  )
}

export default App
