import { Code, Terminal, Users } from 'lucide-react';
import { teamMembers, teamColors } from '../data/mockData';
import './AboutSection.css';

const AboutSection = () => {
  return (
    <section id="about" className="about-section">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">// about</div>
          <h2>Three years of shipping, breaking, and learning together</h2>
          <p>
            We're a student-run community of developers, designers and tinkerers at YIASCM. 
            No gatekeeping, no prerequisites — just people who want to build things and get better at it, together.
          </p>
        </div>

        <div className="pillars">
          <div className="pillar hover-lift glass-panel">
            <div className="icon">
              <Code size={20} />
            </div>
            <h3>Build</h3>
            <p>Hackathons, project labs and open-source sprints where ideas turn into repos with actual commits.</p>
          </div>
          
          <div className="pillar hover-lift glass-panel">
            <div className="icon">
              <Terminal size={20} />
            </div>
            <h3>Learn</h3>
            <p>Hands-on workshops on the stuff courses skip — cloud, DevOps, security, and whatever's shipping this year.</p>
          </div>
          
          <div className="pillar hover-lift glass-panel">
            <div className="icon">
              <Users size={20} />
            </div>
            <h3>Connect</h3>
            <p>Industry speaker sessions, alumni mixers and a Discord that's actually active at 1am before a deadline.</p>
          </div>
        </div>

        <div className="eyebrow" style={{ marginBottom: '20px', marginTop: '64px' }}>// core team</div>
        
        <div className="team-grid">
          {teamMembers.map((member, index) => {
            const color = teamColors[index % teamColors.length];
            const initials = member.name.split(' ').map(n => n[0]).join('');
            
            return (
              <div key={index} className="team-card glass-panel hover-lift">
                <div 
                  className="avatar" 
                  style={{ 
                    background: color, 
                    boxShadow: `0 0 20px ${color}40` 
                  }}
                >
                  {initials}
                </div>
                <h4>{member.name}</h4>
                <span>{member.role}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
