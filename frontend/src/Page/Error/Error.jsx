import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/reducers/authSlice';
import './Error.css'; 
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

function Error() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  const clearTokens = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('sessionToken');
  };

  useEffect(() => {
    // Décompte seulement de 3 jusqu'à 0
    const timer = setInterval(() => {
      setCountdown(prevCountdown => prevCountdown - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Gérer la déconnexion et la navigation lorsque countdown atteint "strictement" la valeur 0
    if (countdown === 0) {
      dispatch(logout());
      clearTokens();
      navigate('/login');
    }
  }, [countdown, dispatch, navigate]);
  return (
    <>
      <Header />
      <div className="error-container">
        <h1>Erreur</h1>
        <h3>Page non existant</h3>
        <p>Redirection vers la page de connexion dans {countdown}...</p>
      </div>
      <Footer />
    </>
  );
}

export default Error;
