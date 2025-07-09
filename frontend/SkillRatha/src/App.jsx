import { useState, useEffect } from 'react'
import './App.css'
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import Footer from './Footer';
import Dashboard from './Dashboard';
import Sidebar from './Sidebar';
import ResumeBuilder from './ResumeBuilder';
import LearningPathways from './LearningPathways';
import SkillAssessments from './SkillAssessments';
import LanguagePractice from './LanguagePractice';
import './ResumeBuilder.css';
import './LearningPathways.css';
import './SkillAssessments.css';
import './LanguagePractice.css';

function Contact() {
  return (
    <div className="contact-main">
      <h2>Contact</h2>
      <ul className="contact-list">
        <li>2300060003aidshte@gmail.com <span className="contact-name">- Indu Harshitha</span></li>
        <li>2300033237cseh@gmail.com <span className="contact-name">- Akshaya</span></li>
        <li>2300033040cseh@gmail.com <span className="contact-name">- Vishnu Prabhakar</span></li>
      </ul>
      <div className="contact-note">Feel free to reach out to us for communication!</div>
    </div>
  );
}

function AIRecommendations() {
  return (
    <div className="module-main ai-coming-soon">
      <h2>🎯 AI-Powered Recommendations</h2>
      <div className="coming-soon-message">Coming Soon!</div>
    </div>
  );
}

const moduleComponents = {
  resume: ResumeBuilder,
  learning: LearningPathways,
  quiz: SkillAssessments,
  language: LanguagePractice,
  ai: AIRecommendations,
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const saved = localStorage.getItem('registered_users');
    return saved ? JSON.parse(saved) : [];
  }); // {email, name, password, id}
  const [loginError, setLoginError] = useState('');
  const [activeModule, setActiveModule] = useState('resume');
  const [activeSection, setActiveSection] = useState('features'); // 'features' or 'contact'

  // Save registered users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('registered_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  // Register a new user
  const handleRegister = (userData) => {
    // Check if email already exists
    const exists = registeredUsers.some(u => u.email === userData.email);
    if (exists) {
      setLoginError('User already registered. Please login.');
      return false;
    }
    setRegisteredUsers(prev => [...prev, userData]);
    setCurrentUser(userData);
    setIsLoggedIn(true);
    setLoginError('');
    return true;
  };

  // Login an existing user
  const handleLogin = (email, password) => {
    const user = registeredUsers.find(u => u.email === email);
    if (!user) {
      setLoginError('User not found.');
      return false;
    }
    if (user.password !== password) {
      setLoginError('Invalid credentials.');
      return false;
    }
    setCurrentUser(user);
    setIsLoggedIn(true);
    setLoginError('');
    return true;
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    setLoginError('');
  };

  if (isLoggedIn && currentUser) {
    let mainContent;
    if (activeSection === 'features') {
      const Module = moduleComponents[activeModule];
      mainContent = <Module user={currentUser} />;
    } else if (activeSection === 'contact') {
      mainContent = <Contact />;
    }
    return (
      <div style={{ display: 'flex' }}>
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} user={currentUser} onLogout={handleLogout} />
        <main style={{ marginLeft: 220, width: '100%' }}>
          {activeSection === 'features' && (
            <div className="modules-nav-bar">
              {/* Module navigation bar */}
              {Object.entries(moduleComponents).map(([key, Comp]) => (
                <button
                  key={key}
                  className={`modules-nav-btn${activeModule === key ? ' active' : ''}`}
                  onClick={() => setActiveModule(key)}
                >
                  {key === 'resume' && '📝 Resume Builder'}
                  {key === 'learning' && '🌱 Learning Pathways'}
                  {key === 'quiz' && '🧠 Skill Assessments'}
                  {key === 'language' && '📚 Language Practice'}
                  {key === 'ai' && '🎯 AI Recommendations'}
                </button>
              ))}
            </div>
          )}
          {mainContent}
        </main>
      </div>
    );
  }

  return (
    <div>
      <Navbar 
        onLogin={handleLogin} 
        onRegister={handleRegister} 
        loginError={loginError}
        setLoginError={setLoginError}
      />
      <Hero 
        onLogin={handleLogin} 
        onRegister={handleRegister} 
        loginError={loginError}
        setLoginError={setLoginError}
      />
      <Features />
      <Footer />
    </div>
  );
}

export default App;
