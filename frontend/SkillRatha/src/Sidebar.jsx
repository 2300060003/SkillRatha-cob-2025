import './Sidebar.css';

export default function Sidebar({ activeSection, setActiveSection, user, onLogout }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-welcome">
        Welcome, <span className="sidebar-username">{user?.name || user?.email || 'User'}</span>
      </div>
      <div className="sidebar-title">SkillRatha</div>
      <nav className="sidebar-nav">
        <button
          className={`sidebar-link${activeSection === 'features' ? ' active' : ''}`}
          onClick={() => setActiveSection('features')}
        >
          <span className="sidebar-icon">⭐</span>
          <span className="sidebar-label">Key Features</span>
        </button>
        <button
          className={`sidebar-link${activeSection === 'contact' ? ' active' : ''}`}
          onClick={() => setActiveSection('contact')}
        >
          <span className="sidebar-icon">📧</span>
          <span className="sidebar-label">Contact</span>
        </button>
      </nav>
      <button className="sidebar-logout-btn" onClick={onLogout}>Logout</button>
    </aside>
  );
} 