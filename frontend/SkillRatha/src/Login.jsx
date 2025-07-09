import { useState } from 'react';
import './Login.css';

export default function Login({ onClose, onLogin, onRegister, loginError, setLoginError }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setLoginError && setLoginError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError && setLoginError('');
    if (isLogin) {
      const success = onLogin(formData.email, formData.password);
      if (success) {
        onClose();
      }
    } else {
      if (formData.password !== formData.confirmPassword) {
        setLoginError && setLoginError('Passwords do not match!');
        return;
      }
      const userData = {
        email: formData.email,
        name: formData.name,
        password: formData.password,
        id: Date.now()
      };
      const success = onRegister(userData);
      if (success) {
        onClose();
      }
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: '',
      password: '',
      confirmPassword: '',
      name: ''
    });
    setLoginError && setLoginError('');
  };

  return (
    <div className="login-overlay">
      <div className="login-container">
        <button className="close-btn" onClick={onClose}>×</button>
        
        <div className="login-header">
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to continue your journey' : 'Join SkillRatha to start your career path'}</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {!isLogin && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required={!isLogin}
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {!isLogin && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required={!isLogin}
              />
            </div>
          )}

          {loginError && (
            <div className="form-group error-message" style={{ color: '#dc3545', marginBottom: 10 }}>
              {loginError}
            </div>
          )}

          <button type="submit" className="submit-btn">
            {isLogin ? 'Sign In' : 'Create Account'}
          </button>
        </form>

        <div className="login-footer">
          <p>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button 
              type="button" 
              className="toggle-btn"
              onClick={toggleMode}
            >
              {isLogin ? 'Register' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
} 