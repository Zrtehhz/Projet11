import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/reducers/authSlice';
import logo from "../../Assets/Images/argentBankLogo.png";
import '../../Styles/Components/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

export default function Header({ userName, userId }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { user: { rememberMe } } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogoClick = () => {
    const localStorageToken = localStorage.getItem('token');
    const sessionStorageToken = sessionStorage.getItem('sessionToken');

    if ((localStorageToken && rememberMe) || sessionStorageToken) {
      navigate('/profile');
    } else {
      clearTokens();
      dispatch(logout());
      navigate('/');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('sessionToken');
    dispatch(logout());
    navigate('/login');
  };
  
  const clearTokens = () => {
    localStorage.removeItem('token');
    sessionStorage.removeItem('sessionToken');
  };

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
                <Link className='main-nav-item' to={`/profile/${userId}`}>
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
