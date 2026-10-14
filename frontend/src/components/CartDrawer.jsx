import React from 'react';
import confetti from 'canvas-confetti';
import axios from 'axios';

export default function CartDrawer({ isOpen, onClose, cart, setCart, user, onAuthClick }) {
  if (!isOpen) return null;

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const updateQty = (id, delta) => {
    setCart(cart.map(item => {
      if (item._id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const handleCheckout = async () => {
    if (!user) {
      onAuthClick();
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/orders', {
        userId: user.id,
        items: cart,
        totalAmount: total
      });

      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      alert('Order Placed Successfully! 🎉');
      setCart([]);
      onClose();
    } catch (err) {
      alert('Failed to place order');
    }
  };

  return (
    <div className="modal-overlay">
      <div className="glass-modal" style={{ maxWidth: '500px' }}>
        <h2>Shopping Cart 🛒</h2>
        <div style={{ maxHeight: '300px', overflowY: 'auto', margin: '20px 0' }}>
          {cart.length === 0 ? (
            <p style={{ color: '#94a3b8', textAlign: 'center' }}>Your cart is empty.</p>
          ) : (
            cart.map(item => (
              <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', background: 'rgba(255,255,255,0.05)', padding: '10px 14px', borderRadius: '12px' }}>
                <div>
                  <h4 style={{ fontSize: '0.95rem' }}>{item.name}</h4>
                  <span style={{ color: '#34d399', fontWeight: 'bold' }}>₹{item.price}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <button onClick={() => updateQty(item._id, -1)} style={{ padding: '2px 8px' }}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => updateQty(item._id, 1)} style={{ padding: '2px 8px' }}>+</button>
                </div>
              </div>
            ))
          )}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '20px' }}>
          <span>Total:</span>
          <span style={{ color: '#34d399' }}>₹{total}</span>
        </div>

        <button className="btn-primary" onClick={handleCheckout} disabled={cart.length === 0}>
          Pay & Place Order
        </button>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#94a3b8', width: '100%', marginTop: '12px', cursor: 'pointer' }}>Close</button>
      </div>
    </div>
  );
}