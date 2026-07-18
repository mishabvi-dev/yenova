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
            Yenova is a dynamic and forward-thinking student club at Yenepoya University, dedicated to fostering innovation, collaboration, and excellence in the field of Information Technology. With a diverse and passionate membership, Yenova serves as a catalyst for creativity, knowledge sharing, and professional growth. Through a range of activities, events, and initiatives, Yenova empowers students to explore emerging technologies, expand their skill sets, and connect with industry professionals. Join us in our mission to ignite innovation and shape the future of IT at Yenepoya University and beyond.
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
