import { useState, useEffect } from 'react';

const INTERESTS = [
  'Web Development',
  'AI/ML',
  'UI/UX',
  'Data Science',
  'Cybersecurity',
  'Cloud Computing',
];

const MODULES = {
  'Web Development': [
    'HTML & CSS Basics',
    'JavaScript Fundamentals',
    'React or Angular',
    'Backend (Node.js, Express)',
    'Deploying Web Apps',
  ],
  'AI/ML': [
    'Python Basics',
    'Math for ML',
    'Machine Learning Algorithms',
    'Deep Learning',
    'AI Projects',
  ],
  'UI/UX': [
    'Design Principles',
    'Wireframing',
    'Prototyping Tools',
    'User Testing',
    'Portfolio Project',
  ],
  'Data Science': [
    'Python/R Basics',
    'Data Analysis',
    'Visualization',
    'Statistics',
    'Data Science Project',
  ],
  'Cybersecurity': [
    'Security Basics',
    'Network Security',
    'Ethical Hacking',
    'Vulnerability Assessment',
    'Security Tools',
  ],
  'Cloud Computing': [
    'Cloud Fundamentals',
    'AWS/Azure/GCP Basics',
    'Deploying to Cloud',
    'Serverless',
    'Cloud Security',
  ],
};

const LS_KEY = 'learning_pathways_data';

export default function LearningPathways() {
  const [selected, setSelected] = useState([]);
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      const { selected, progress } = JSON.parse(saved);
      setSelected(selected || []);
      setProgress(progress || {});
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ selected, progress }));
  }, [selected, progress]);

  const handleInterestChange = (interest) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleModuleToggle = (interest, idx) => {
    setProgress((prev) => {
      const arr = prev[interest] || Array(MODULES[interest].length).fill(false);
      const newArr = arr.map((done, i) => (i === idx ? !done : done));
      return { ...prev, [interest]: newArr };
    });
  };

  // Calculate progress
  const totalModules = selected.reduce((sum, interest) => sum + MODULES[interest].length, 0);
  const completedModules = selected.reduce(
    (sum, interest) =>
      sum + (progress[interest]?.filter(Boolean).length || 0),
    0
  );
  const percent = totalModules ? Math.round((completedModules / totalModules) * 100) : 0;

  return (
    <div className="learning-pathways-container">
      <h2>🌱 Interest-Based Learning Pathways</h2>
      <div className="interests-section">
        <h4>Select Your Interests:</h4>
        <div className="interests-list">
          {INTERESTS.map((interest) => (
            <label key={interest} className="interest-checkbox">
              <input
                type="checkbox"
                checked={selected.includes(interest)}
                onChange={() => handleInterestChange(interest)}
              />
              {interest}
            </label>
          ))}
        </div>
      </div>

      {selected.length > 0 && (
        <div className="modules-section">
          <div className="progress-bar-outer">
            <div className="progress-bar-inner" style={{ width: percent + '%' }} />
          </div>
          <div className="progress-label">Progress: {percent}%</div>
          {selected.map((interest) => (
            <div key={interest} className="modules-group">
              <h5>{interest} Modules</h5>
              <ul>
                {MODULES[interest].map((mod, idx) => (
                  <li key={mod} className={progress[interest]?.[idx] ? 'done' : ''}>
                    <label>
                      <input
                        type="checkbox"
                        checked={progress[interest]?.[idx] || false}
                        onChange={() => handleModuleToggle(interest, idx)}
                      />
                      {mod}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 