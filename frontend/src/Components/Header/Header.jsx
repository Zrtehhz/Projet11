import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation  } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout, setCredentials } from '../../redux/reducers/authSlice';
import logo from "../../Assets/Images/argentBankLogo.png";
import '../../Styles/Components/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function Header({ userName, userId }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  useEffect(() => {
    const localStorageToken = localStorage.getItem('token');
    const sessionStorageToken = sessionStorage.getItem('sessionToken');

    if (localStorageToken) {
      dispatch(setCredentials({ user: {}, token: localStorageToken, rememberMe: true }));
    } else if (sessionStorageToken) {
      dispatch(setCredentials({ user: {}, token: sessionStorageToken, rememberMe: false }));
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('sessionToken');
    dispatch(logout());
    navigate('/login');
  };

  const handleLogoClick = () => {
    if (userId) {
      navigate(`/profile`);
    }
  };

  const location = useLocation();

  useEffect(() => {
    let timer;

    // Déclenche la déconnexion avec un délai de 3 secondes environ si l'URL affiche '/error'
    if (location.pathname === '/error') {
      timer = setTimeout(() => {
        handleSignOut();
      }, 3000);
    }

    // reset du timer
    return () => clearTimeout(timer);
  }, [location, handleSignOut]);

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/" onClick={handleLogoClick}>
          <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        </Link>
  
        <div>
          {isAuthenticated ? (
            <>
              <FontAwesomeIcon icon={faUser} />
              {userName ? (
                <Link className='main-nav-item' to={`/profile`}>
                  {userName}
                </Link>
              ) : (
                <span className='main-nav-item'></span>
              )}
              <Link className="main-nav-item" to="/" onClick={handleSignOut}>
                <FontAwesomeIcon icon={faRightFromBracket} />
                Sign Out
              </Link>
            </>
          ) : (
            <Link className="main-nav-item" to="/login">
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
