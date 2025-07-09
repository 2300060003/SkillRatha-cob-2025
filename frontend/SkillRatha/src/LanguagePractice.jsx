import { useState, useEffect } from 'react';

const LS_KEY = 'cpp_practice_data';
const DEFAULT_CODE = `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello, SkillRatha!" << endl;\n    return 0;\n}`;

export default function LanguagePractice() {
  const [code, setCode] = useState(DEFAULT_CODE);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem(LS_KEY);
    if (saved) {
      const { code, output } = JSON.parse(saved);
      if (code) setCode(code);
      if (output) setOutput(output);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify({ code, output }));
  }, [code, output]);

  const runCpp = async () => {
    setLoading(true);
    setError('');
    setOutput('');
    try {
      const res = await fetch('https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': 'fcc7dfcf9cmshde06f060d4d8ec5p14531ajsnd6a3de94a259', // Inserted user RapidAPI key
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
        },
        body: JSON.stringify({
          source_code: code,
          language_id: 54, // C++ (GCC 9.2.0)
          stdin: '',
        }),
      });
      if (res.status === 403 || res.status === 429) {
        setError('C++ online compiler is temporarily unavailable (quota exceeded or API error). Please try again later.');
        setLoading(false);
        return;
      }
      const data = await res.json();
      if (data.stderr) {
        setOutput(data.stderr);
      } else if (data.compile_output) {
        setOutput(data.compile_output);
      } else {
        setOutput(data.stdout || '');
      }
    } catch (e) {
      setError('Error running code. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="language-practice-container">
      <h2>📚 Language & Communication Practice</h2>
      <div className="cpp-compiler-block">
        <h4>C++ Online Compiler</h4>
        <textarea
          className="cpp-editor"
          value={code}
          onChange={e => setCode(e.target.value)}
          rows={12}
          spellCheck={false}
        />
        <button className="cpp-run-btn" onClick={runCpp} disabled={loading}>
          {loading ? 'Running...' : 'Run Code'}
        </button>
        <div className="cpp-output-block">
          <h5>Output:</h5>
          <pre className="cpp-output">{output}</pre>
          {error && <div className="cpp-error">{error}</div>}
        </div>
      </div>
    </div>
  );
} 