import { useState, useRef } from 'react';
import type { ClubEvent, Registration } from '../data/mockData';
import { LayoutDashboard, Users, CalendarDays, LogOut, Plus, Share2, Trash2 } from 'lucide-react';
import './AdminPanel.css';

interface AdminPanelProps {
  events: ClubEvent[];
  setEvents: React.Dispatch<React.SetStateAction<ClubEvent[]>>;
  registrations: Registration[];
}

const AdminPanel = ({ events, setEvents, registrations }: AdminPanelProps) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [addError, setAddError] = useState('');
  const [activeTab, setActiveTab] = useState('dash');
  
  // New event form state
  const [neTitle, setNeTitle] = useState('');
  const [neDate, setNeDate] = useState('');
  const [neFee, setNeFee] = useState('');
  const [neSeats, setNeSeats] = useState('');
  const [neDesc, setNeDesc] = useState('');
  const [nePoster, setNePoster] = useState('');

  const tryLogin = () => {
    if (password === 'yenova2026') {
      setIsAdmin(true);
      setError('');
    } else {
      setError('Incorrect password. Try again.');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setPassword('');
    setActiveTab('dash');
  };

  const addEvent = () => {
    if (!neTitle || !neDate) {
      setAddError('Title and Date are required to add an event.');
      return;
    }
    
    setAddError('');
    const newEvent: ClubEvent = {
      id: Date.now(),
      hash: Math.random().toString(16).slice(2, 9),
      title: neTitle,
      date: neDate,
      fee: parseInt(neFee) || 0,
      seatsTotal: parseInt(neSeats) || 30,
      seatsTaken: 0,
      desc: neDesc || 'Details coming soon.',
      posterUrl: nePoster || undefined
    };

    setEvents([...events, newEvent]);
    setNeTitle(''); setNeDate(''); setNeFee(''); setNeSeats(''); setNeDesc(''); setNePoster('');
  };

  const removeEvent = (id: number) => {
    setEvents(events.filter(e => e.id !== id));
  };

  const generatePosterLink = (event: ClubEvent) => {
    // Mock poster generation URL
    const baseUrl = window.location.origin;
    const text = `Join us for ${event.title} on ${event.date}!`;
    alert(`Share this link on your socials:\n\n${baseUrl}?event=${event.hash}\n\n${text}`);
  };

  const revenue = registrations.reduce((sum, r) => sum + r.amount, 0);
  const recentRegs = [...registrations].reverse().slice(0, 5);

  return (
    <section id="admin" className="admin-section">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">// admin</div>
          <h2>Club admin panel</h2>
          <p>Manage events and view registrations collected through the payment flow.</p>
        </div>

        {!isAdmin ? (
          <div className="admin-gate glass-panel hover-lift">
            <h3>Restricted access</h3>
            <p className="hint">demo password: yenova2026</p>
            <div className="field">
              <label>Admin password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && tryLogin()}
                placeholder="••••••••" 
              />
            </div>
            {error && <p className="error-text" style={{display: 'block'}}>{error}</p>}
            <button className="btn btn-amber btn-block mt-4" onClick={tryLogin}>
              Unlock dashboard
            </button>
          </div>
        ) : (
          <div className="admin-shell glass-panel fade-in">
            <div className="admin-side">
              <div className="who">
                Signed in as <b style={{color: 'var(--teal)'}}>admin</b>
              </div>
              <div className={`admin-tab ${activeTab === 'dash' ? 'active' : ''}`} onClick={() => setActiveTab('dash')}>
                <LayoutDashboard size={16}/> Dashboard
              </div>
              <div className={`admin-tab ${activeTab === 'regs' ? 'active' : ''}`} onClick={() => setActiveTab('regs')}>
                <Users size={16}/> Registrations
              </div>
              <div className={`admin-tab ${activeTab === 'evts' ? 'active' : ''}`} onClick={() => setActiveTab('evts')}>
                <CalendarDays size={16}/> Manage events
              </div>
              <div className="admin-tab logout-btn" onClick={handleLogout}>
                <LogOut size={16}/> Log out
              </div>
            </div>
            
            <div className="admin-main">
              {activeTab === 'dash' && (
                <div className="admin-view fade-in">
                  <div className="admin-stats">
                    <div className="astat glass-panel hover-lift">
                      <div className="num">{registrations.length}</div>
                      <div className="label">TOTAL REGISTRATIONS</div>
                    </div>
                    <div className="astat glass-panel hover-lift">
                      <div className="num">₹{revenue}</div>
                      <div className="label">REVENUE COLLECTED</div>
                    </div>
                    <div className="astat glass-panel hover-lift">
                      <div className="num">{events.length}</div>
                      <div className="label">ACTIVE EVENTS</div>
                    </div>
                    <div className="astat glass-panel hover-lift">
                      <div className="num">520+</div>
                      <div className="label">CLUB MEMBERS</div>
                    </div>
                  </div>
                  
                  <h3>Recent registrations</h3>
                  <div className="table-responsive">
                    <table>
                      <thead><tr><th>Name</th><th>Event</th><th>Amount</th><th>Time</th></tr></thead>
                      <tbody>
                        {recentRegs.length > 0 ? recentRegs.map((r, i) => (
                          <tr key={i}>
                            <td className="strong">{r.name}</td>
                            <td>{r.event}</td>
                            <td>{r.amount === 0 ? 'Free' : `₹${r.amount}`}</td>
                            <td>{r.time}</td>
                          </tr>
                        )) : (
                          <tr><td colSpan={4} className="empty-row">No registrations yet.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'regs' && (
                <div className="admin-view fade-in">
                  <h3>All registrations</h3>
                  <div className="table-responsive">
                    <table>
                      <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Event</th><th>Amount</th></tr></thead>
                      <tbody>
                        {registrations.length > 0 ? [...registrations].reverse().map((r, i) => (
                          <tr key={i}>
                            <td>{r.id}</td>
                            <td className="strong">{r.name}</td>
                            <td>{r.email}</td>
                            <td>{r.event}</td>
                            <td>{r.amount === 0 ? 'Free' : `₹${r.amount}`}</td>
                          </tr>
                        )) : (
                          <tr><td colSpan={5} className="empty-row">Nothing here yet.</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {activeTab === 'evts' && (
                <div className="admin-view fade-in">
                  <h3>Add a new event</h3>
                  <div className="form-grid">
                    <div className="field"><label>Title</label><input value={neTitle} onChange={e=>setNeTitle(e.target.value)} placeholder="e.g. AI Agents Workshop"/></div>
                    <div className="field"><label>Date</label><input value={neDate} onChange={e=>setNeDate(e.target.value)} placeholder="e.g. Sep 12, 2026"/></div>
                    <div className="field"><label>Fee (₹, 0 = free)</label><input type="number" value={neFee} onChange={e=>setNeFee(e.target.value)} placeholder="0"/></div>
                    <div className="field"><label>Total seats</label><input type="number" value={neSeats} onChange={e=>setNeSeats(e.target.value)} placeholder="60"/></div>
                  </div>
                  <div className="field"><label>Description</label><textarea rows={2} value={neDesc} onChange={e=>setNeDesc(e.target.value)} placeholder="One line about the session"></textarea></div>
                  <div className="field"><label>Poster URL (Optional)</label><input value={nePoster} onChange={e=>setNePoster(e.target.value)} placeholder="https://example.com/poster.jpg"/></div>
                  
                  {addError && <p className="error-text" style={{display: 'block'}}>{addError}</p>}
                  
                  <button className="btn btn-teal mt-4" onClick={addEvent}>
                    <Plus size={16} /> Add to event log
                  </button>
                  
                  <h3 style={{marginTop: '40px'}}>Current events</h3>
                  <div className="table-responsive">
                    <table>
                      <thead><tr><th>Title</th><th>Date</th><th>Seats</th><th>Actions</th></tr></thead>
                      <tbody>
                        {events.map(e => (
                          <tr key={e.id}>
                            <td className="strong">{e.title}</td>
                            <td>{e.date}</td>
                            <td>{e.seatsTaken}/{e.seatsTotal}</td>
                            <td>
                              <div style={{display: 'flex', gap: '8px'}}>
                                <button className="mini-btn share-btn" onClick={() => generatePosterLink(e)} title="Share Poster">
                                  <Share2 size={14} /> Share
                                </button>
                                <button className="mini-btn delete-btn" onClick={() => removeEvent(e.id)} title="Remove Event">
                                  <Trash2 size={14} /> Remove
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default AdminPanel;
