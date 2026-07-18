import { useEffect, useRef } from 'react';
import './HeroSection.css';

const HeroSection = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let w: number, h: number, nodes: {x: number, y: number, vx: number, vy: number}[] = [];
    let animationFrameId: number;

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        w = parent.offsetWidth;
        h = parent.offsetHeight;
        canvas.width = w;
        canvas.height = h;
      }
    };

    const initNodes = () => {
      nodes = [];
      const count = Math.max(18, Math.floor(w / 70));
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25
        });
      }
    };

    resize();
    initNodes();

    window.addEventListener('resize', () => {
      resize();
      initNodes();
    });

    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
        }
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 130) {
            ctx.strokeStyle = `rgba(94, 234, 212, ${(1 - dist / 130) * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      for (const n of nodes) {
        ctx.fillStyle = 'rgba(94, 234, 212, 0.55)';
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.8, 0, Math.PI * 2);
        ctx.fill();
        
        // Add a soft glow to the nodes
        ctx.shadowBlur = 10;
        ctx.shadowColor = 'rgba(94, 234, 212, 0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      if (!reduced) {
        animationFrameId = requestAnimationFrame(frame);
      }
    };

    frame();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="hero">
      <div className="hero-gradient-overlay"></div>
      <canvas id="netcanvas" ref={canvasRef}></canvas>
      
      <div className="wrap hero-inner">
        <div className="terminal hover-lift">
          <span className="prompt">yenova@yiascm</span>:~$ whoami<span className="caret"></span>
        </div>
        
        <h1>Where code meets<br/><span className="accent">community.</span></h1>
        
        <p className="lead">
          Yenova is the official IT club of YIASCM — hackathons, workshops, open-source sprints and a room full of people who'd rather debug together than alone.
        </p>
        
        <div className="hero-ctas">
          <a href="#events" className="btn btn-teal">View upcoming events →</a>
          <a href="#about" className="btn btn-ghost">What we're about</a>
        </div>
        
        <div className="stat-row glass-panel">
          <div className="stat">
            <div className="num">50+</div>
            <div className="label">ACTIVE MEMBERS</div>
          </div>
          <div className="stat">
            <div className="num">42</div>
            <div className="label">EVENTS HOSTED</div>
          </div>
          <div className="stat">
            <div className="num">15</div>
            <div className="label">LIVE PROJECTS</div>
          </div>
          <div className="stat">
            <div className="num">3</div>
            <div className="label">YEARS RUNNING</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
