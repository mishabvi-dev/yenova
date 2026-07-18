import { useState } from 'react';
import type { ClubEvent } from '../data/mockData';
import { Filter, Calendar } from 'lucide-react';
import './EventLog.css';

interface EventLogProps {
  events: ClubEvent[];
  onRegister: (eventId: number) => void;
}

const EventLog = ({ events, onRegister }: EventLogProps) => {
  const [filter, setFilter] = useState<'all' | 'free' | 'paid'>('all');

  const filteredEvents = events.filter(e => {
    if (filter === 'free') return e.fee === 0;
    if (filter === 'paid') return e.fee > 0;
    return true;
  });

  return (
    <section id="events" className="events-section">
      <div className="wrap">
        <div className="section-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <div className="eyebrow">// upcoming_events</div>
            <h2>The event log</h2>
            <p>Every session, indexed like a commit history — because that's honestly how we plan them.</p>
          </div>
          
          <div className="filter-group glass-panel">
            <Filter size={16} className="filter-icon" />
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >All</button>
            <button 
              className={`filter-btn ${filter === 'free' ? 'active' : ''}`}
              onClick={() => setFilter('free')}
            >Free</button>
            <button 
              className={`filter-btn ${filter === 'paid' ? 'active' : ''}`}
              onClick={() => setFilter('paid')}
            >Paid</button>
          </div>
        </div>

        <div className="log glass-panel">
          {filteredEvents.map(e => {
            const pct = Math.min(100, Math.round((e.seatsTaken / e.seatsTotal) * 100));
            const soldOut = e.seatsTaken >= e.seatsTotal;
            
            return (
              <div className="log-row hover-lift" key={e.id}>
                <div className="log-date-col">
                  <div className="log-hash">#{e.hash}</div>
                  <div className="log-date"><Calendar size={12} className="inline-icon"/> {e.date}</div>
                </div>
                
                <div className="log-main">
                  <h3>{e.title}</h3>
                  <p>{e.desc}</p>
                  
                  {e.posterUrl && (
                    <div className="event-poster">
                      <img src={e.posterUrl.includes('drive.google.com/file/d/') ? `https://drive.google.com/uc?export=view&id=${e.posterUrl.match(/\/d\/([a-zA-Z0-9_-]+)/)?.[1] || ''}` : e.posterUrl} alt={`${e.title} poster`} />
                    </div>
                  )}

                  <div className="log-meta">
                    <span><b>{e.seatsTotal - e.seatsTaken}</b> seats left</span>
                    <span>{e.seatsTaken}/{e.seatsTotal} filled</span>
                  </div>
                  <div className="seat-bar">
                    <div className="seat-fill" style={{ width: `${pct}%`, background: soldOut ? 'var(--danger)' : 'var(--teal)' }}></div>
                  </div>
                </div>
                
                <div className="log-cta">
                  {e.fee === 0 ? (
                    <span className="fee-tag free">FREE</span>
                  ) : (
                    <span className="fee-tag">₹{e.fee}</span>
                  )}
                  <button 
                    className={`btn ${soldOut ? 'btn-ghost' : 'btn-amber'} btn-sm`} 
                    disabled={soldOut} 
                    onClick={() => onRegister(e.id)}
                  >
                    {soldOut ? 'Sold out' : 'Register →'}
                  </button>
                </div>
              </div>
            );
          })}
          
          {filteredEvents.length === 0 && (
            <div className="empty-log">
              No events found for this filter.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventLog;
