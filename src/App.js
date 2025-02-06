import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import GlobalStyle from './styles/Global';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/Login';
import ClientPage from './pages/Users/Client';
import AdminPage from './pages/Users/Admin';
import LandingPage from './pages/Home';
import SignupPage from './pages/Signup';
import AuthHandler from './AuthHandler';
import BuyStorage from './pages/BuyStoragePage';
import Dashboard from './pages/Dashboard';

function App() {
  const location = useLocation();

  return (
    <>
      <AuthHandler /> {/* Keeps track of inactivity */}
      <GlobalStyle />
      <Navbar />
      <AnimatePresence wait>
      <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/buy-storage" element={<BuyStorage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
}

export default App;