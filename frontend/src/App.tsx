import {Routes, Route, Navigate } from 'react-router-dom';
import { Commet } from 'react-loading-indicators';
import { useEffect } from 'react';
import {Toaster} from "react-hot-toast";


import Navbar from './components/Navbar';

import HomePage from './pages/HomePage'
import SignupPage from './pages/SignupPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import VerifyEmailPage from './pages/VerificationPage';

import { useAuthStore } from './store/useAuthStore';
import useThemeStore from './store/useThemeStore';



function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore();
  const { isDark } = useThemeStore();

  useEffect(() => {
    checkAuth();
    if(isDark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.add('light');
  }, [checkAuth, isDark]);

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
              <Route path="/verify-email" element={<VerifyEmailPage />} />
              <Route path="/login" element={ !authUser ? <LoginPage /> : <Navigate to="/" /> } />
              <Route path="/profile-page" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
          </Routes>

          <Toaster />
      </>
  </div>
  )
}

export default App
