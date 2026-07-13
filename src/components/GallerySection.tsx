import './GallerySection.css';

const galleryImages = [
  "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
];

const GallerySection = () => {
  return (
    <section id="gallery" className="gallery-section">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">// gallery</div>
          <h2>Moments from past events</h2>
          <p>A glimpse into our hackathons, speaker sessions, and late-night coding sprints.</p>
        </div>
        
        <div className="gallery-grid">
          {galleryImages.map((src, idx) => (
            <div className="gallery-item glass-panel" key={idx}>
              <img src={src} alt={`Event moment ${idx + 1}`} loading="lazy" />
              <div className="gallery-overlay">
                <span>View full size</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
