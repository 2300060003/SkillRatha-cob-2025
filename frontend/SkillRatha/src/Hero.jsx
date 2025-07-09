import { useState } from 'react';
import './Hero.css';
import Login from './Login';

export default function Hero({ onLogin, onRegister, loginError, setLoginError }) {
  const [showLogin, setShowLogin] = useState(false);

  const handleGetStarted = () => {
    // Handle get started logic - could redirect to features or signup
    console.log('Get Started clicked');
  };

  const handleLogin = () => {
    setShowLogin(true);
  };

  const handleCloseLogin = () => {
    setShowLogin(false);
  };

  return (
    <>
      <section className="hero">
        <h2>Bridging the Career Confusion Gap</h2>
        <p>A personalized learning and career pathway platform empowering BTech students with clarity and confidence.</p>
        <div className="hero-buttons">
          <button className="btn-primary" onClick={handleGetStarted}>Get Started</button>
          <button className="btn-secondary" onClick={handleLogin}>Login</button>
        </div>
      </section>
      
      {showLogin && <Login onClose={handleCloseLogin} onLogin={onLogin} onRegister={onRegister} loginError={loginError} setLoginError={setLoginError} />}
    </>
  );
}
