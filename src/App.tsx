import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import EventLog from './components/EventLog';
import AdminPanel from './components/AdminPanel';
import PaymentModal from './components/PaymentModal';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import { initialEvents } from './data/mockData';
import type { ClubEvent, Registration } from './data/mockData';
import { db } from './lib/firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import './index.css';

function App() {
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

  useEffect(() => {
    // Listen to events
    const unsubEvents = onSnapshot(collection(db, 'events'), (snapshot) => {
      if (snapshot.empty) {
        // Seed initial events if database is totally empty
        initialEvents.forEach((ev) => {
          setDoc(doc(db, 'events', ev.id.toString()), ev);
        });
      } else {
        const evts = snapshot.docs.map(d => d.data() as ClubEvent);
        setEvents(evts.sort((a, b) => b.id - a.id));
      }
    });

    // Listen to registrations
    const unsubRegs = onSnapshot(collection(db, 'registrations'), (snapshot) => {
      const regs = snapshot.docs.map(d => d.data() as Registration);
      setRegistrations(regs);
    });

    return () => {
      unsubEvents();
      unsubRegs();
    };
  }, []);

  const handleRegister = (eventId: number) => {
    setSelectedEventId(eventId);
  };

  const handlePaymentSuccess = async (reg: Registration) => {
    try {
      await setDoc(doc(db, 'registrations', reg.id), reg);
      const event = events.find(e => e.id === selectedEventId);
      if (event) {
        await setDoc(doc(db, 'events', event.id.toString()), {
          ...event,
          seatsTaken: Math.min(event.seatsTotal, event.seatsTaken + 1)
        });
      }
    } catch (e) {
      console.error("Error saving registration to Firestore:", e);
    }
  };

  const selectedEvent = events.find(e => e.id === selectedEventId) || null;

  return (
    <div className="app-container">
      <Navbar />
      
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <EventLog events={events} onRegister={handleRegister} />
        <AdminPanel 
          events={events} 
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
