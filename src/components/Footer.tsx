import './Footer.css';
import { Code, Camera, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer>
      <div className="wrap">
        <div className="foot-inner">
          <div className="logo" style={{ display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="YENOVA Logo" style={{ height: '48px', objectFit: 'contain' }} onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }} />
            <div className="fallback-text hidden" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold', fontSize: '18px' }}>
              <span className="dot" style={{ width: '8px', height: '8px', background: 'var(--amber)', borderRadius: '2px', transform: 'rotate(45deg)' }}></span> YENOVA
            </div>
          </div>
          <div className="foot-links">
            <a href="#about">About</a>
            <a href="#events">Events</a>
            <a href="#projects">Projects</a>
            <a href="mailto:yenova@yiascm.edu"><Mail size={16} className="inline-icon" /> yenova@yiascm.edu</a>
            <a href="https://github.com/mishabvi-dev/yenova" target="_blank" rel="noreferrer"><Code size={16} className="inline-icon" /> GitHub</a>
            <a href="https://www.instagram.com/yenova.it" target="_blank" rel="noreferrer"><Camera size={16} className="inline-icon" /> Instagram</a>
          </div>
        </div>
        <div className="copy">
          $ echo "© 2026 YENOVA — IT Club, YIASCM. Built by the club, for the club."
        </div>
      </div>
    </footer>
  );
};

export default Footer;
