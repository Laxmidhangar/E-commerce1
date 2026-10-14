import React from 'react';
import { ShoppingBag, Search, LogIn, LogOut, User } from 'lucide-react';

export default function Navbar({ search, setSearch, cartCount, user, onAuthClick, onLogout, onCartClick }) {
  return (
    <nav className="navbar">
      <div className="brand">
        <div className="brand-logo">CM</div>
        <div className="brand-title">CODE MITRA</div>
      </div>

      <div className="search-container">
        <Search size={18} color="#94a3b8" />
        <input
          type="text"
          placeholder="Search T-Shirt, Headphones, Clothes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
        <button className="btn-add" onClick={onCartClick} style={{ padding: '8px 16px' }}>
          <ShoppingBag size={18} />
          Cart ({cartCount})
        </button>

        {user ? (
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.9rem', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <User size={16} /> {user.name}
            </span>
            <button onClick={onLogout} style={{ background: 'none', border: 'none', color: '#f87171', cursor: 'pointer' }}>
              <LogOut size={18} />
            </button>
          </div>
        ) : (
          <button className="btn-add" onClick={onAuthClick} style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <LogIn size={18} /> Login
          </button>
        )}
      </div>
    </nav>
  );
}