import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import GlobalStyle from './styles/Global';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoginPage from './pages/Login';
import ClientPage from './pages/Client';
import AdminPage from './pages/Admin';
import LandingPage from './pages/Home';

const App = () => {
  const location = useLocation();

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <AnimatePresence wait>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/client" element={<ClientPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
};

export default App;