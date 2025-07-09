import { useState, useEffect } from 'react';
import './Dashboard.css';

const features = [
  '📝 Smart Resume Builder',
  '🌱 Interest-Based Learning Pathways',
  '🧠 Skill Assessments',
  '📚 Language & Communication Practice',
  '🎯 AI-Powered Recommendations'
];

export default function Dashboard({ user, onLogout }) {
  const [showUserModal, setShowUserModal] = useState(false);

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <h1>SkillRatha Dashboard</h1>
          <p className="welcome-text">
            Welcome back,{' '}
            <span
              className="user-name clickable"
              onClick={() => setShowUserModal(true)}
              title="View user details"
            >
              {user.name || user.email}
            </span>!
          </p>
        </div>
        <div className="header-right">
          <button className="logout-btn" onClick={onLogout}>
            Logout
          </button>
        </div>
      </header>

      {/* User Details Modal */}
      {showUserModal && (
        <div className="user-modal-overlay" onClick={() => setShowUserModal(false)}>
          <div className="user-modal" onClick={e => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setShowUserModal(false)}>&times;</button>
            <h2>User Details</h2>
            <div className="user-detail-row"><strong>Name:</strong> {user.name}</div>
            <div className="user-detail-row"><strong>Email:</strong> {user.email}</div>
            <div className="user-detail-row"><strong>User ID:</strong> {user.id}</div>
          </div>
        </div>
      )}

      <main className="dashboard-main">
        <section className="features-dashboard">
          <h2>Key Features</h2>
          <ul className="features-list-dashboard">
            {features.map((feature, idx) => (
              <li key={idx} className="feature-item-dashboard">{feature}</li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
} 