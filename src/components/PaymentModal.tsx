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
  const [formData, setFormData] = useState({ name: '', course: '', regNo: '', campusId: '', lh: '' });
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!formData.name || !formData.course || !formData.regNo || !formData.campusId || !formData.lh) {
      setError('Please fill in all the registration fields.');
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
    if (overrideMethod !== 'FREE' && !transactionId) {
       setError('Please enter the Transaction ID after scanning the QR code.');
       return;
    }
    setError('');
    const finalMethod = typeof overrideMethod === 'string' ? overrideMethod : 'UPI';
    setStep(3);
    setTimeout(() => {
      const newReg: Registration = {
        id: 'YEN-' + Math.floor(1000 + Math.random() * 9000),
        name: formData.name,
        course: formData.course,
        regNo: formData.regNo,
        campusId: formData.campusId,
        lh: formData.lh,
        event: event.title,
        amount: event.fee,
        method: finalMethod === 'FREE' ? 'N/A' : finalMethod.toUpperCase(),
        time: new Date().toLocaleString(),
        transactionId: transactionId || undefined
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
            <div className="form-grid">
              <div className="field">
                <label>Course</label>
                <input 
                  value={formData.course} 
                  onChange={e => setFormData({...formData, course: e.target.value})} 
                  placeholder="e.g. BCA, BTech" 
                />
              </div>
              <div className="field">
                <label>Register No.</label>
                <input 
                  value={formData.regNo} 
                  onChange={e => setFormData({...formData, regNo: e.target.value})} 
                  placeholder="e.g. 21BCA102" 
                />
              </div>
            </div>
            <div className="form-grid">
              <div className="field">
                <label>Campus ID</label>
                <input 
                  value={formData.campusId} 
                  onChange={e => setFormData({...formData, campusId: e.target.value})} 
                  placeholder="e.g. YEN123" 
                />
              </div>
              <div className="field">
                <label>LH (Lecture Hall)</label>
                <input 
                  value={formData.lh} 
                  onChange={e => setFormData({...formData, lh: e.target.value})} 
                  placeholder="e.g. LH 4" 
                />
              </div>
            </div>
            
            {error && <p className="error-text" style={{display: 'block'}}>{error}</p>}
            
            <button className="btn btn-amber btn-block mt-4" onClick={handleNext}>
              {event.fee === 0 ? 'Register for free →' : 'Continue to payment →'}
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="step-content fade-in center-text">
            <h4>Scan to Pay ₹{event.fee}</h4>
            <p style={{fontSize: '14px', color: 'var(--text-muted)', marginBottom: '16px'}}>Use GPay, PhonePe, or Paytm</p>
            <div className="qr-box" style={{background: 'white', padding: '16px', borderRadius: '12px', display: 'inline-block', marginBottom: '20px'}}>
              <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=upi://pay?pa=yenova@ybl&pn=Yenova%20Club&cu=INR" alt="UPI QR Code" style={{width: '150px', height: '150px', display: 'block'}} />
            </div>
            <div className="field" style={{textAlign: 'left'}}>
              <label>Transaction ID (after paying)</label>
              <input 
                value={transactionId} 
                onChange={e => setTransactionId(e.target.value)} 
                placeholder="e.g. T23081912345" 
              />
            </div>
            
            {error && <p className="error-text" style={{display: 'block', textAlign: 'left'}}>{error}</p>}
            
            <button className="btn btn-teal btn-block mt-4" onClick={() => processPayment()}>
              Verify & Confirm
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="step-content center-text fade-in">
            <Loader2 size={36} className="spinner" />
            <p className="processing-text">Verifying transaction…</p>
          </div>
        )}

        {step === 4 && (
          <div className="step-content fade-in">
            <div className="center-text">
              <div className="success-icon"><Check size={28} /></div>
              <h3>You're registered!</h3>
              <p style={{color: 'var(--text-muted)', fontSize: '14px', marginTop: '8px'}}>Your seat has been confirmed.</p>
            </div>
            <div className="receipt">
              <div><span>Name</span><b>{formData.name}</b></div>
              <div><span>Reg No.</span><b>{formData.regNo}</b></div>
              <div><span>Event</span><b>{event.title}</b></div>
              <div><span>Amount</span><b>{event.fee === 0 ? 'Free' : `₹${event.fee}`}</b></div>
              {event.fee > 0 && <div><span>Method</span><b>UPI</b></div>}
            </div>
            <button className="btn btn-ghost btn-block" onClick={onClose}>Done</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
