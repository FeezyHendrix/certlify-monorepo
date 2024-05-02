import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ForgottenPassword from '../pages/ForgottenPassword';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import OTP from '../pages/OTP';
import Welcome from '../pages/Welcome';
import ProfileInformation from '../pages/ProfileInformation';
import './index.css';

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/forgotten-password" element={<ForgottenPassword />} />
      <Route path="/otp" element={<OTP />} />
      <Route path="/profile-form" element={<ProfileInformation />} />
    </Routes>
  );
};

export default App;
