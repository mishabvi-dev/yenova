import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Footer from './components/Footer';
import { initialEvents } from './data/mockData';
import type { ClubEvent, Registration } from './data/mockData';
import { db } from './lib/firebase';
import { collection, onSnapshot, doc, setDoc } from 'firebase/firestore';
import './index.css';

function App() {
  const [events, setEvents] = useState<ClubEvent[]>([]);
  const [registrations, setRegistrations] = useState<Registration[]>([]);

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

  return (
    <BrowserRouter>
      <div className="app-container">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home events={events} registrations={registrations} />} />
          <Route path="/learn" element={<div style={{padding: '150px 20px', textAlign: 'center', color: 'white'}}><h1>LMS Dashboard Coming Soon</h1></div>} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
