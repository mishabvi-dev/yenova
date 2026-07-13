import './ProjectsSection.css';
import { ExternalLink, Github } from 'lucide-react';

const projects = [
  {
    title: 'Campus CTF Platform',
    desc: 'An open-source Capture The Flag platform built for university cybersecurity tournaments.',
    tags: ['Next.js', 'PostgreSQL', 'Docker'],
    github: '#',
    live: '#',
    color: 'var(--teal)'
  },
  {
    title: 'AI Study Assistant',
    desc: 'A Discord bot that summarizes lecture notes and generates quizzes using the Gemini API.',
    tags: ['Node.js', 'Python', 'Gemini AI'],
    github: '#',
    live: '#',
    color: 'var(--amber)'
  },
  {
    title: 'YENOVA OS',
    desc: 'A lightweight, Linux-based custom distribution tailored for computer science students.',
    tags: ['C', 'Bash', 'Linux Kernel'],
    github: '#',
    live: '#',
    color: 'var(--pink)'
  }
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="projects-section">
      <div className="wrap">
        <div className="section-head center-text">
          <div className="eyebrow">// showcase</div>
          <h2>What we build</h2>
          <p>Check out some of the open-source projects developed by our club members.</p>
        </div>

        <div className="projects-grid">
          {projects.map((proj, i) => (
            <div className="project-card glass-panel hover-lift fade-in" key={i} style={{'--accent': proj.color} as React.CSSProperties}>
              <div className="proj-top">
                <h3>{proj.title}</h3>
                <div className="proj-links">
                  <a href={proj.github} className="icon-link"><Github size={18} /></a>
                  <a href={proj.live} className="icon-link"><ExternalLink size={18} /></a>
                </div>
              </div>
              <p className="proj-desc">{proj.desc}</p>
              <div className="proj-tags">
                {proj.tags.map((tag, j) => (
                  <span className="tag" key={j}>{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
