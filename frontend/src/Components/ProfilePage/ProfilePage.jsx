import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { logout, checkRememberMe } from '../../redux/reducers/authSlice';
import EditButton from '../EditButton/EditButton';
import Account from '../Account/Account';
import Header from '../../Components/Header/Header';

function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const reduxToken = useSelector(state => state.auth.token);

  // Déterminer si l'utilisateur a choisi l'option "Remember me"
  const isRemembered = localStorage.getItem('isRemembered') === 'true';

  // Récupérer le token approprié selon l'option "Remember me"
  const token = reduxToken || (isRemembered ? localStorage.getItem('token') : sessionStorage.getItem('sessionToken'));

  const [profileData, setProfileData] = useState({ id: '', email: '', userName: '' });
  const [isLoading, setIsLoading] = useState(true);

  const { userId } = useParams();

  useEffect(() => {
    if (userId) {
      setProfileData(prevState => ({ ...prevState, id: userId }));
    }
  }, [userId]);

  useEffect(() => {
    if (!token) {
      dispatch(logout());
      navigate('/login');
    } else {
      dispatch(checkRememberMe());
      fetchData();
    }

    const sessionTimeout = 5 * 60 * 1000; // 5 minutes
    let timeoutId;

    const resetSessionTimeout = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        clearTokens();
        dispatch(logout());
        navigate('/login');
      }, sessionTimeout);
    };

    window.addEventListener('mousemove', resetSessionTimeout);
    window.addEventListener('keydown', resetSessionTimeout);

    return () => {
      window.removeEventListener('mousemove', resetSessionTimeout);
      window.removeEventListener('keydown', resetSessionTimeout);
    };
  }, [token, dispatch, navigate]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/v1/user/profile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      if (data.status === 200) {
        setProfileData({
          id: data.body.id,
          email: data.body.email,
          userName: data.body.userName
        });
        navigate(`/profile/${data.body.id}`);

      } else {
        console.log('Error with status:', data.status);
        clearTokens();
        dispatch(logout());
        navigate('/login');
      }
    } catch (error) {
      console.error('Error:', error);
      clearTokens();
      dispatch(logout());
      navigate('/login');
    } finally {
      setIsLoading(false);
    }
  };

  const clearTokens = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('sessionToken');
    localStorage.removeItem('isRemembered'); 
  };

  return (
    <>
      <Header userName={profileData.userName} /> 
      <main className="main bg-dark">
        <div className="header">
            <h1>Welcome back<br />{profileData.userName || profileData.id}!</h1>
          <EditButton onProfileUpdate={setProfileData} />
        </div>
        <h2 className="sr-only">Accounts</h2>
        <Account id="1" title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
        <Account id="2" title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
        <Account id="3" title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
      </main>
    </>
  );
}

export default ProfilePage;
