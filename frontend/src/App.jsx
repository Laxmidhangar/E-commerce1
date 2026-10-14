import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './components/Navbar';
import LoginModal from './components/LoginModal';
import CartDrawer from './components/CartDrawer';
import ProductCard from './components/ProductCard';
import PaymentModal from './components/PaymentModal';
import './index.css';

export default function App() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);

  // Fetch products when user is logged in or search/category changes
  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user, search, category]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/products?search=${search}&category=${category}`);
      setProducts(res.data);
    } catch (err) {
      console.error('Failed to fetch products');
    }
  };

  const addToCart = (product) => {
    const existing = cart.find(item => item._id === product._id);
    if (existing) {
      setCart(cart.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const handlePaymentSuccess = async () => {
    try {
      const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      await axios.post('http://localhost:5000/api/orders', {
        userId: user.id,
        items: cart,
        totalAmount
      });

      setCart([]);
      setIsPaymentOpen(false);
      alert('Order Placed Successfully! 🎉');
    } catch (err) {
      alert('Failed to save order');
    }
  };

  // 1. GUARANTEED UNAUTHENTICATED FLOW (Login/Register Landing Screen)
  if (!user) {
    return (
      <div className="login-page-wrapper">
        <div className="login-brand-header">
          <div className="brand-logo" style={{ fontSize: '1.5rem', padding: '10px 20px' }}>CM</div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', marginTop: '12px' }}>CODE MITRA</h1>
          <p style={{ color: '#94a3b8', marginTop: '6px' }}>Please login or register to access the store</p>
        </div>
        <LoginModal
          isOpen={true}
          isStandalone={true}
          onLoginSuccess={(data) => setUser(data.user)}
        />
      </div>
    );
  }

  // 2. STOREFRONT FLOW (Shown only after successful login)
  return (
    <div>
      <Navbar
        search={search}
        setSearch={setSearch}
        cartCount={cart.reduce((a, b) => a + b.quantity, 0)}
        user={user}
        onLogout={() => {
          setUser(null);
          setCart([]);
        }}
        onCartClick={() => setIsCartOpen(true)}
      />

      <div className="container">
        <div style={{ marginBottom: '20px' }}>
          <h2>Welcome back, <span style={{ color: '#a855f7' }}>{user.name}</span> 👋</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.95rem' }}>Explore products and place your orders.</p>
        </div>

        <div className="category-chips">
          <button className={`chip ${category === '' ? 'active' : ''}`} onClick={() => setCategory('')}>All Products</button>
          <button className={`chip ${category === 'clothes' ? 'active' : ''}`} onClick={() => setCategory('clothes')}>Clothes</button>
          <button className={`chip ${category === 'electronics' ? 'active' : ''}`} onClick={() => setCategory('electronics')}>Electronics</button>
        </div>

        {products.length === 0 ? (
          <div style={{ textAlign: 'center', margin: '40px 0', color: '#94a3b8' }}>
            No products found matching your search.
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} addToCart={addToCart} />
            ))}
          </div>
        )}
      </div>

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        setCart={setCart}
        user={user}
        onProceedToPayment={() => { setIsCartOpen(false); setIsPaymentOpen(true); }}
      />

      <PaymentModal
        isOpen={isPaymentOpen}
        onClose={() => setIsPaymentOpen(false)}
        totalAmount={cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
}