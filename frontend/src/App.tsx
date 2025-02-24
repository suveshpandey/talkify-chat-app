import {Routes, Route, Navigate } from 'react-router-dom';
import { Commet } from 'react-loading-indicators';

import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';
import { useAuthStore } from './store/useAuthStore';
import { useEffect } from 'react';
import {Toaster} from "react-hot-toast";
import Navbar from './components/Navbar';


function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth && !authUser){
    return(
      <div className='h-screen w-full flex items-center justify-center'>
        <Commet color="#3137cc" size="medium" text="" textColor="" />
      </div>
    )
  }

  return (
    <div data-theme="" className="h-[100vh] w-[100%] bg-[#edf2fb] dark:bg-gray-900 ">
      <Navbar />
      <>
          <Routes>
              <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
              <Route path="/signup" element={ !authUser ? <SignupPage /> : <Navigate to="/" /> } />
              <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to="/" /> } />
              <Route path="/settings-page" element={ <SettingsPage />} />
              <Route path="/profile-page" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          </Routes>

          <Toaster />
      </>
  </div>
  )
}

export default App
