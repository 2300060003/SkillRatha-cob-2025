import { useState, useEffect } from 'react';

const QUESTIONS = [
  {
    q: 'What does HTML stand for?',
    options: ['Hyper Trainer Marking Language', 'Hyper Text Markup Language', 'Hyper Text Marketing Language', 'Hyper Text Markup Leveler'],
    answer: 1,
  },
  {
    q: 'Which language runs in a web browser?',
    options: ['Java', 'C', 'Python', 'JavaScript'],
    answer: 3,
  },
  {
    q: 'What is the output of 2 + 2 * 2 in JavaScript?',
    options: ['6', '8', '4', '2'],
    answer: 0,
  },
  {
    q: 'Which of these is a JavaScript framework?',
    options: ['Django', 'React', 'Laravel', 'Flask'],
    answer: 1,
  },
  {
    q: 'What does CSS stand for?',
    options: ['Cascading Style Sheets', 'Colorful Style Sheets', 'Computer Style Sheets', 'Creative Style Sheets'],
    answer: 0,
  },
];

const LS_KEY = 'skill_assessments_history';

export default function SkillAssessments() {
  const [answers, setAnswers] = useState(Array(QUESTIONS.length).fill(null));
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) setHistory(JSON.parse(saved));
  }, []);

  const handleOptionChange = (qIdx, optIdx) => {
    setAnswers((prev) => prev.map((a, i) => (i === qIdx ? optIdx : a)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let sc = 0;
    answers.forEach((a, i) => {
      if (a === QUESTIONS[i].answer) sc++;
    });
    setScore(sc);
    setSubmitted(true);
    const newHistory = [
      { date: new Date().toLocaleString(), score: sc, total: QUESTIONS.length },
      ...history,
    ];
    setHistory(newHistory);
    localStorage.setItem(LS_KEY, JSON.stringify(newHistory));
  };

  const handleRetake = () => {
    setAnswers(Array(QUESTIONS.length).fill(null));
    setSubmitted(false);
    setScore(0);
  };

  return (
    <div className="skill-assessments-container">
      <h2>🧠 Skill Assessments</h2>
      {!submitted ? (
        <form className="quiz-form" onSubmit={handleSubmit}>
          {QUESTIONS.map((q, idx) => (
            <div key={idx} className="quiz-question-block">
              <div className="quiz-question">{idx + 1}. {q.q}</div>
              <div className="quiz-options">
                {q.options.map((opt, oidx) => (
                  <label key={oidx} className="quiz-option">
                    <input
                      type="radio"
                      name={`q${idx}`}
                      checked={answers[idx] === oidx}
                      onChange={() => handleOptionChange(idx, oidx)}
                      required
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button className="quiz-submit-btn" type="submit">Submit</button>
        </form>
      ) : (
        <div className="quiz-result-block">
          <h3>Your Score: {score} / {QUESTIONS.length}</h3>
          <button className="quiz-retake-btn" onClick={handleRetake}>Retake Quiz</button>
        </div>
      )}
      <div className="quiz-history-block">
        <h4>Score History</h4>
        {history.length === 0 ? (
          <div>No attempts yet.</div>
        ) : (
          <table className="quiz-history-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, idx) => (
                <tr key={idx}>
                  <td>{h.date}</td>
                  <td>{h.score} / {h.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
} 