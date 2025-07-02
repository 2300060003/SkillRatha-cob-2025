import './Features.css';

export default function Features() {
  const featureList = [
    '📝 Smart Resume Builder',
    '🌱 Interest-Based Learning Pathways',
    '🧠 Skill Assessments',
    '📚 Language & Communication Practice',
    '🎯 AI-Powered Recommendations'
  ];

  return (
    <section id="features" className="features">
      <h3>Key Features</h3>
      <div className="features-grid">
        {featureList.map((feature, index) => (
          <div key={index} className="feature-card">
            {feature}
          </div>
        ))}
      </div>
    </section>
  );
}
