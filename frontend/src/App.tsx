import {Routes, Route, Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import {Toaster} from "react-hot-toast";
import {ThreeDot} from "react-loading-indicators"

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
      <div className='h-screen w-full flex flex-col gap-y-4 items-center justify-center'>
        <ThreeDot color="#94aeba" size="medium" text="" textColor="" />
        <p className=''>Getting things ready for you... Please hold on for a moment.</p>
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
