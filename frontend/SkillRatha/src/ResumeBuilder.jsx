import { useState, useEffect, useRef } from 'react';

const emptyResume = {
  name: '',
  email: '',
  education: [{ school: '', degree: '', year: '' }],
  experience: [{ company: '', role: '', duration: '' }],
  skills: [''],
  projects: [{ title: '', description: '' }],
};

const LS_KEY = 'resume_builder_data';

export default function ResumeBuilder() {
  const [resume, setResume] = useState(() => {
    const saved = localStorage.getItem(LS_KEY);
    return saved ? JSON.parse(saved) : emptyResume;
  });
  const previewRef = useRef();

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(resume));
  }, [resume]);

  // Handlers for dynamic fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setResume((prev) => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (section, idx, field, value) => {
    setResume((prev) => ({
      ...prev,
      [section]: prev[section].map((item, i) =>
        i === idx ? { ...item, [field]: value } : item
      ),
    }));
  };

  const handleSkillChange = (idx, value) => {
    setResume((prev) => ({
      ...prev,
      skills: prev.skills.map((s, i) => (i === idx ? value : s)),
    }));
  };

  const addArrayItem = (section, emptyObj) => {
    setResume((prev) => ({
      ...prev,
      [section]: [...prev[section], emptyObj],
    }));
  };

  const removeArrayItem = (section, idx) => {
    setResume((prev) => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== idx),
    }));
  };

  const addSkill = () => {
    setResume((prev) => ({ ...prev, skills: [...prev.skills, ''] }));
  };
  const removeSkill = (idx) => {
    setResume((prev) => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }));
  };

  // Section resets
  const resetName = () => setResume(prev => ({ ...prev, name: '' }));
  const resetEmail = () => setResume(prev => ({ ...prev, email: '' }));
  const resetEducation = () => setResume(prev => ({ ...prev, education: [{ school: '', degree: '', year: '' }] }));
  const resetExperience = () => setResume(prev => ({ ...prev, experience: [{ company: '', role: '', duration: '' }] }));
  const resetSkills = () => setResume(prev => ({ ...prev, skills: [''] }));
  const resetProjects = () => setResume(prev => ({ ...prev, projects: [{ title: '', description: '' }] }));
  const resetAll = () => setResume(emptyResume);

  // Download PDF (html2pdf.js integration placeholder)
  const handleDownloadPDF = () => {
    if (window.html2pdf) {
      window.html2pdf(previewRef.current, { margin: 0.5, filename: 'resume.pdf' });
    } else {
      alert('html2pdf.js not loaded.');
    }
  };

  return (
    <div className="resume-builder-container">
      <h2>📝 Smart Resume Builder</h2>
      <div className="resume-builder-flex">
        <form className="resume-form">
          <div className="resume-form-row">
            <label>
              Name:
              <input name="name" value={resume.name} onChange={handleChange} />
            </label>
            <button type="button" className="section-reset-btn" onClick={resetName}>Reset</button>
          </div>
          <div className="resume-form-row">
            <label>
              Email:
              <input name="email" value={resume.email} onChange={handleChange} />
            </label>
            <button type="button" className="section-reset-btn" onClick={resetEmail}>Reset</button>
          </div>

          <section>
            <div className="resume-form-row">
              <h4>Education</h4>
              <button type="button" className="section-reset-btn" onClick={resetEducation}>Reset</button>
            </div>
            {resume.education.map((ed, idx) => (
              <div key={idx} className="resume-section-group">
                <input
                  placeholder="School"
                  value={ed.school}
                  onChange={e => handleArrayChange('education', idx, 'school', e.target.value)}
                />
                <input
                  placeholder="Degree"
                  value={ed.degree}
                  onChange={e => handleArrayChange('education', idx, 'degree', e.target.value)}
                />
                <input
                  placeholder="Year"
                  value={ed.year}
                  onChange={e => handleArrayChange('education', idx, 'year', e.target.value)}
                />
                {resume.education.length > 1 && (
                  <button type="button" onClick={() => removeArrayItem('education', idx)}>-</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem('education', { school: '', degree: '', year: '' })}>+ Add Education</button>
          </section>

          <section>
            <div className="resume-form-row">
              <h4>Work Experience</h4>
              <button type="button" className="section-reset-btn" onClick={resetExperience}>Reset</button>
            </div>
            {resume.experience.map((ex, idx) => (
              <div key={idx} className="resume-section-group">
                <input
                  placeholder="Company"
                  value={ex.company}
                  onChange={e => handleArrayChange('experience', idx, 'company', e.target.value)}
                />
                <input
                  placeholder="Role"
                  value={ex.role}
                  onChange={e => handleArrayChange('experience', idx, 'role', e.target.value)}
                />
                <input
                  placeholder="Duration"
                  value={ex.duration}
                  onChange={e => handleArrayChange('experience', idx, 'duration', e.target.value)}
                />
                {resume.experience.length > 1 && (
                  <button type="button" onClick={() => removeArrayItem('experience', idx)}>-</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem('experience', { company: '', role: '', duration: '' })}>+ Add Experience</button>
          </section>

          <section>
            <div className="resume-form-row">
              <h4>Skills</h4>
              <button type="button" className="section-reset-btn" onClick={resetSkills}>Reset</button>
            </div>
            {resume.skills.map((skill, idx) => (
              <div key={idx} className="resume-section-group">
                <input
                  placeholder="Skill"
                  value={skill}
                  onChange={e => handleSkillChange(idx, e.target.value)}
                />
                {resume.skills.length > 1 && (
                  <button type="button" onClick={() => removeSkill(idx)}>-</button>
                )}
              </div>
            ))}
            <button type="button" onClick={addSkill}>+ Add Skill</button>
          </section>

          <section>
            <div className="resume-form-row">
              <h4>Projects</h4>
              <button type="button" className="section-reset-btn" onClick={resetProjects}>Reset</button>
            </div>
            {resume.projects.map((pr, idx) => (
              <div key={idx} className="resume-section-group">
                <input
                  placeholder="Title"
                  value={pr.title}
                  onChange={e => handleArrayChange('projects', idx, 'title', e.target.value)}
                />
                <input
                  placeholder="Description"
                  value={pr.description}
                  onChange={e => handleArrayChange('projects', idx, 'description', e.target.value)}
                />
                {resume.projects.length > 1 && (
                  <button type="button" onClick={() => removeArrayItem('projects', idx)}>-</button>
                )}
              </div>
            ))}
            <button type="button" onClick={() => addArrayItem('projects', { title: '', description: '' })}>+ Add Project</button>
          </section>
          <button type="button" className="overall-reset-btn" onClick={resetAll}>Reset Entire Resume</button>
        </form>

        <div className="resume-preview-section">
          <h3>Live Resume Preview</h3>
          <div className="resume-preview" ref={previewRef}>
            <h2>{resume.name}</h2>
            <p>{resume.email}</p>
            {resume.education.some(ed => ed.school || ed.degree || ed.year) && (
              <>
                <h4>Education</h4>
                <ul>
                  {resume.education.filter(ed => ed.school || ed.degree || ed.year).map((ed, idx) => (
                    <li key={idx}>
                      {ed.degree && <>{ed.degree}</>}
                      {ed.degree && ed.school && ' at '}
                      {ed.school && <>{ed.school}</>}
                      {(ed.degree || ed.school) && ed.year && <> ({ed.year})</>}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {resume.experience.some(ex => ex.company || ex.role || ex.duration) && (
              <>
                <h4>Work Experience</h4>
                <ul>
                  {resume.experience.filter(ex => ex.company || ex.role || ex.duration).map((ex, idx) => (
                    <li key={idx}>
                      {ex.role && <>{ex.role} </>}
                      {ex.company && <>at {ex.company} </>}
                      {ex.duration && <>({ex.duration})</>}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {resume.skills.some(s => s) && (
              <>
                <h4>Skills</h4>
                <ul>
                  {resume.skills.filter(s => s).map((s, idx) => (
                    <li key={idx}>{s}</li>
                  ))}
                </ul>
              </>
            )}
            {resume.projects.some(pr => pr.title || pr.description) && (
              <>
                <h4>Projects</h4>
                <ul>
                  {resume.projects.filter(pr => pr.title || pr.description).map((pr, idx) => (
                    <li key={idx}>
                      {pr.title && <strong>{pr.title}</strong>}
                      {pr.title && pr.description && ': '}
                      {pr.description}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
          <button className="download-btn" onClick={handleDownloadPDF}>Download PDF</button>
        </div>
      </div>
    </div>
  );
} 