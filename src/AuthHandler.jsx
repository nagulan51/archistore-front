// src/utils/AuthHandler.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const AUTO_LOGOUT_TIME = 30 * 60 * 1000; // 30 minutes

const AuthHandler = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleActivity = () => {
      localStorage.setItem('lastActivity', Date.now());
    };

    // Detect user activity (mouse move, key press)
    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    const checkInactivity = () => {
      const lastActivity = localStorage.getItem('lastActivity');
      const loginTimestamp = localStorage.getItem('loginTimestamp');

      if (!lastActivity || !loginTimestamp) return;

      const currentTime = Date.now();
      if (currentTime - lastActivity > AUTO_LOGOUT_TIME) {
        localStorage.removeItem('token');
        localStorage.removeItem('loginTimestamp');
        localStorage.removeItem('lastActivity');
        toast.warning('Session expired due to inactivity.');
        navigate('/login');
      }
    };

    // Check inactivity every minute
    const interval = setInterval(checkInactivity, 60 * 1000);

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      clearInterval(interval);
    };
  }, [navigate]);

  return null;
};

export default AuthHandler;