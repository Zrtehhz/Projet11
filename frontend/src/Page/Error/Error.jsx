import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/reducers/authSlice';
import './Error.css'; 
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

function Error() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate('/login');
  }, [dispatch, navigate]);
  return (
<>
    <Header />
    <div className="error-container">
      <h1>Erreur</h1>
    </div>
    <Footer />

</>
  );
}

export default Error;
