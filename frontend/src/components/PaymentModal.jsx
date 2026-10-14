import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PaymentModal({ isOpen, onClose, totalAmount, onPaymentSuccess }) {
  const [paymentMethod, setPaymentMethod] = useState('upi');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handlePay = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      onPaymentSuccess();
    }, 1500);
  };

  return (
    <div className="modal-overlay">
      <div className="glass-modal">
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <ShieldCheck size={40} color="#a855f7" style={{ marginBottom: '8px' }} />
          <h2>Secure Checkout</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Amount to Pay: <strong style={{ color: '#34d399', fontSize: '1.2rem' }}>₹{totalAmount}</strong></p>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <button
            className={`chip ${paymentMethod === 'upi' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('upi')}
            style={{ flex: 1, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            GooglePay / PhonePe (UPI)
          </button>
          <button
            className={`chip ${paymentMethod === 'card' ? 'active' : ''}`}
            onClick={() => setPaymentMethod('card')}
            style={{ flex: 1, justifyContent: 'center', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <CreditCard size={16} /> Card
          </button>
        </div>

        {paymentMethod === 'upi' ? (
          <div>
            <label style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>UPI ID</label>
            <input type="text" className="form-input" placeholder="example@upi" defaultValue="laxmi@okaxis" />
          </div>
        ) : (
          <div>
            <label style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>Card Number</label>
            <input type="text" className="form-input" placeholder="4532 •••• •••• 8921" defaultValue="4532 8921 1029 8921" />
          </div>
        )}

        <button className="btn-primary" onClick={handlePay} disabled={loading} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          {loading ? 'Processing Payment...' : <><CheckCircle2 size={18} /> Pay ₹{totalAmount}</>}
        </button>

        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', width: '100%', marginTop: '12px', cursor: 'pointer' }}>Cancel</button>
      </div>
    </div>
  );
}