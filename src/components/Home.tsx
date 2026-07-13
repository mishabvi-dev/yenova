import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ProjectsSection from './ProjectsSection';
import EventLog from './EventLog';
import AdminPanel from './AdminPanel';
import PaymentModal from './PaymentModal';
import type { ClubEvent, Registration } from '../data/mockData';
import { useState } from 'react';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface HomeProps {
  events: ClubEvent[];
  registrations: Registration[];
}

const Home = ({ events, registrations }: HomeProps) => {
  const [selectedEventId, setSelectedEventId] = useState<number | null>(null);

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
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <EventLog events={events} onRegister={handleRegister} />
      <AdminPanel 
        events={events} 
        registrations={registrations} 
      />

      {selectedEvent && (
        <PaymentModal 
          event={selectedEvent} 
          onClose={() => setSelectedEventId(null)} 
          onSuccess={handlePaymentSuccess} 
        />
      )}
    </main>
  );
};

export default Home;
