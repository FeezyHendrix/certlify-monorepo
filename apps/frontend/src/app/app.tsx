import React from "react";
import { Route, Routes } from 'react-router-dom';
import UnauthenticatedLayout from "../layout/Unauthenticated";
import ForgottenPassword from "../pages/ForgottenPassword";
import LandingPage from "../pages/LandingPage";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import OTP from "../pages/OTP";
import Welcome from "../pages/Welcome";
import "./index.css"


const App: React.FC = () => {
  return (
    <Routes>
      <Route element={<UnauthenticatedLayout/>}>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/welcome" element={<Welcome/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/otp" element={<OTP/>} />
        <Route path="/forgotten-password" element={<ForgottenPassword/>} />
      </Route>
    </Routes>
  )
}

export default App;
