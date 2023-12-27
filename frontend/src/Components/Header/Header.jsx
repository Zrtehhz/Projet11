import React from 'react';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { setAuthenticated } from '../../redux/reducers/authSlice'; // Assurez-vous que le chemin d'importation est correct
import logo from "../../Assets/Images/argentBankLogo.png";
import '../../Styles/Components/Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem('token');
    dispatch(setAuthenticated(false)); // Déconnexion de l'utilisateur
    navigate('/login');
  };

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        </Link>
        <div>
          {isAuthenticated ? (
            <>
              <FontAwesomeIcon icon={faUser} />
              <Link className='main-nav-item' to={`/profile/${userId}`}>
                {userName}
              </Link>
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

export default Header;
