import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="nav glass-panel">
      <div className="nav-inner wrap">
        <div className="logo">
          <img src="/logo.png" alt="YENOVA Logo" className="logo-img" onError={(e) => {
            // Fallback if image is not found
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling?.classList.remove('hidden');
          }} />
          <div className="fallback-text hidden">
            <span className="dot"></span> YENOVA <span className="sub">/ IT CLUB</span>
          </div>
        </div>
        
        <nav className={`links ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a>
          <a href="#gallery" onClick={() => setMobileMenuOpen(false)}>Gallery</a>
          <a href="#events" onClick={() => setMobileMenuOpen(false)}>Events</a>
          <a href="#admin" onClick={() => setMobileMenuOpen(false)}>Admin</a>
          <a href="#events" className="btn btn-amber btn-sm" onClick={() => setMobileMenuOpen(false)}>Join a session</a>
        </nav>

        <button 
          className="hamburger" 
          aria-label="Menu" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Navbar;
