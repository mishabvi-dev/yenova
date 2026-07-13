import { useState } from 'react';
import type { ClubEvent, Registration } from '../data/mockData';
import { X, Check, Loader2 } from 'lucide-react';
import './PaymentModal.css';

interface PaymentModalProps {
  event: ClubEvent;
  onClose: () => void;
  onSuccess: (reg: Registration) => void;
}

const PaymentModal = ({ event, onClose, onSuccess }: PaymentModalProps) => {
  const [step, setStep] = useState(1);
  const [method, setMethod] = useState('card');
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', roll: '' });
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!formData.name || !formData.email.includes('@')) {
      setError('Please fill in your name and a valid email.');
      return;
    }
    setError('');
    
    if (event.fee === 0) {
      processPayment('FREE');
    } else {
      setStep(2);
    }
  };

  const processPayment = (overrideMethod?: string) => {
    const finalMethod = typeof overrideMethod === 'string' ? overrideMethod : method;
    setStep(3);
    setTimeout(() => {
      const newReg: Registration = {
        id: 'YEN-' + Math.floor(1000 + Math.random() * 9000),
        name: formData.name,
        email: formData.email,
        event: event.title,
        amount: event.fee,
        method: finalMethod === 'FREE' ? 'N/A' : finalMethod.toUpperCase(),
        time: new Date().toLocaleString()
      };
      onSuccess(newReg);
      setStep(4);
    }, 1500);
  };

  return (
    <div className="overlay active">
      <div className="modal glass-panel">
        <div className="modal-head">
          <h3>Register</h3>
          <button className="close" onClick={onClose}><X size={20} /></button>
        </div>
        
        <div className="ev-summary">
          {event.title} · {event.date} · {event.fee === 0 ? 'Free' : `₹${event.fee}`}
        </div>
        
        <div className="steps-track">
          <div className={`step-dot ${step >= 1 ? 'done' : ''}`}></div>
          <div className={`step-dot ${step >= 2 ? 'done' : ''}`}></div>
          <div className={`step-dot ${step >= 4 ? 'done' : ''}`}></div>
        </div>

        {step === 1 && (
          <div className="step-content fade-in">
            <div className="field">
              <label>Full name</label>
              <input 
                value={formData.name} 
                onChange={e => setFormData({...formData, name: e.target.value})} 
                placeholder="Your name" 
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input 
                value={formData.email} 
                onChange={e => setFormData({...formData, email: e.target.value})} 
                placeholder="you@example.com" 
              />
            </div>
            <div className="field">
              <label>Phone</label>
              <input placeholder="10-digit number" />
            </div>
            <div className="field">
              <label>College ID / roll no.</label>
              <input placeholder="Optional" />
            </div>
            
            {error && <p className="error-text" style={{display: 'block'}}>{error}</p>}
            
            <button className="btn btn-amber btn-block mt-4" onClick={handleNext}>
              {event.fee === 0 ? 'Register for free →' : 'Continue to payment →'}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step-content fade-in">
            <div className="radio-row">
              <div 
                className={`radio-opt ${method === 'card' ? 'sel' : ''}`} 
                onClick={() => setMethod('card')}
              >Card</div>
              <div 
                className={`radio-opt ${method === 'upi' ? 'sel' : ''}`} 
                onClick={() => setMethod('upi')}
              >UPI</div>
            </div>
            
            {method === 'card' ? (
              <div className="fade-in">
                <div className="field"><label>Card number</label><input placeholder="4242 4242 4242 4242" maxLength={19} /></div>
                <div className="form-grid">
                  <div className="field"><label>Expiry</label><input placeholder="MM/YY" /></div>
                  <div className="field"><label>CVV</label><input placeholder="123" maxLength={3} /></div>
                </div>
              </div>
            ) : (
              <div className="fade-in">
                <div className="field"><label>UPI ID</label><input placeholder="yourname@upi" /></div>
              </div>
            )}
            
            <button className="btn btn-teal btn-block mt-4" onClick={processPayment}>
              Pay & confirm
            </button>
            <p className="mock-notice">🔒 simulated gateway — no real charge is made</p>
          </div>
        )}

        {step === 3 && (
          <div className="step-content center-text fade-in">
            <Loader2 size={36} className="spinner" />
            <p className="processing-text">Processing payment…</p>
          </div>
        )}

        {step === 4 && (
          <div className="step-content fade-in">
            <div className="center-text">
              <div className="success-icon"><Check size={28} /></div>
              <h3>You're in!</h3>
              <p style={{color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px'}}>A confirmation has been "sent" to your email.</p>
            </div>
            <div className="receipt">
              <div><span>Event</span><b>{event.title}</b></div>
              <div><span>Amount</span><b>{event.fee === 0 ? 'Free' : `₹${event.fee}`}</b></div>
              {event.fee > 0 && <div><span>Method</span><b>{method.toUpperCase()}</b></div>}
            </div>
            <button className="btn btn-ghost btn-block" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
