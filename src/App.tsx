import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EventLog from './components/EventLog';
import AdminPanel from './components/AdminPanel';
import PaymentModal from './components/PaymentModal';
import GallerySection from './components/GallerySection';
import Footer from './components/Footer';
import { initialEvents } from './data/mockData';
import type { ClubEvent, Registration } from './data/mockData';
import './index.css';

function App() {
  // Global State using localStorage for persistence
  const [events, setEvents] = useState<ClubEvent[]>(() => {
    const saved = localStorage.getItem('yenova_events');
    return saved ? JSON.parse(saved) : initialEvents;
  });
  
  const [registrations, setRegistrations] = useState<Registration[]>(() => {
    const saved = localStorage.getItem('yenova_regs');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  useEffect(() => {
    localStorage.setItem('yenova_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('yenova_regs', JSON.stringify(registrations));
  }, [registrations]);

  const handleRegister = (eventId: number) => {
    setSelectedEventId(eventId);
  };

  const handlePaymentSuccess = (reg: Registration) => {
    setRegistrations(prev => [...prev, reg]);
    setEvents(prev => prev.map(e => {
      if (e.id === selectedEventId) {
        return { ...e, seatsTaken: Math.min(e.seatsTotal, e.seatsTaken + 1) };
      }
      return e;
    }));
  };

  const selectedEvent = events.find(e => e.id === selectedEventId) || null;

  return (
    <div className="app-container">
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <GallerySection />
        <EventLog events={events} onRegister={handleRegister} />
        <AdminPanel 
          events={events} 
          setEvents={setEvents} 
          registrations={registrations} 
        />
      </main>

      <Footer />

      {selectedEvent && (
        <PaymentModal 
          event={selectedEvent} 
          onClose={() => setSelectedEventId(null)} 
          onSuccess={handlePaymentSuccess} 
        />
      )}
    </div>
  );
}

export default App;
