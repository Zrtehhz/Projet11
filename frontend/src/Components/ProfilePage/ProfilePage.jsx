import React, { useEffect, useState } from 'react';
import {  useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/reducers/authSlice';
import EditButton from '../EditButton/EditButton';
import Account from '../Account/Account';
import Header from '../../Components/Header/Header';

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({ id: '', email: '', userName: '' });

  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');
    const sessionStorageToken = sessionStorage.getItem('sessionToken');
    
    if (sessionStorageToken) {
      fetchData(sessionStorageToken);

      const timer = setTimeout(() => {
        sessionStorage.removeItem('sessionToken');
        dispatch(logout());
        navigate('/login');
      }, 1800); // 1800000 ms 30 minutes

      return () => clearTimeout(timer);
    }
    else if (localStorageToken) {
      fetchData(localStorageToken);
      
    } 
    else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  const fetchData = async (token) => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/user/profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Erreur: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.status === 200) {
        setProfileData({
          id: data.body.id,
          email: data.body.email,
          userName: data.body.userName
        });
        navigate(`/profile/${data.body.id}`); // Redirige après la connexion réussie
      } else {
        throw new Error(`Erreur avec le statut: ${data.status}`);
      }
    } catch (error) {
      console.error('Erreur:', error);
      clearTokens();
      dispatch(logout());
      navigate('/login');
    }
  };

  const clearTokens = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('sessionToken');
  };

  const handleProfileUpdate = (updatedData) => {
    setProfileData(prevData => ({
      ...prevData,
      ...updatedData
    }));
  };

  return (
    <>
      <Header userName={profileData.userName} userId={profileData.id} />
      <main className="main bg-dark">
        {profileData.id ? (
          <div className="header">
            <h1>Welcome back<br />{profileData.userName || profileData.id}!</h1>
            <EditButton onProfileUpdate={handleProfileUpdate} />
          </div>
        ) : null}
        <h2 className="sr-only">Comptes</h2>
        <Account id="1" title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Solde Disponible" />
        <Account id="2" title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Solde Disponible" />
        <Account id="3" title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Solde Actuel" />
      </main>
    </>
  );
}

export default ProfilePage;
