import { useState } from 'react';
import './Navbar.css';
import Login from './Login';

export default function Navbar({ onLogin, onRegister, loginError, setLoginError }) {
  const [showLogin, setShowLogin] = useState(false);

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <>
      <nav className="navbar">
        <h1>SkillRatha</h1>
        <div className="navbar-links">
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
          <button className="nav-login-btn" onClick={handleLogin}>Login</button>
        </div>
      </nav>
      
      {showLogin && <Login onClose={handleCloseLogin} onLogin={onLogin} onRegister={onRegister} loginError={loginError} setLoginError={setLoginError} />}
    </>
  );
}
