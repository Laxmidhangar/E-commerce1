require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const JWT_SECRET = process.env.JWT_SECRET;

// MongoDB Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('MongoDB Connected via .env configuration'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// Database Schemas
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  imageUrl: String
});

const orderSchema = new mongoose.Schema({
  userId: String,
  items: Array,
  totalAmount: Number,
  date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);

// AUTH ROUTES

// 1. REGISTER
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log("Registration Request:", { name, email });

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Registration failed: User already exists");
      return res.status(400).json({ message: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword });

    console.log("User Registered Successfully:", newUser._id);
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error("Register Error:", err);
    res.status(500).json({ message: 'Registration failed' });
  }
});

// 2. LOGIN
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login Attempt for:", email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log("Login Failed: User email not found in DB");
      return res.status(400).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password Comparison Match:", isMatch);

    if (!isMatch) {
      console.log("Login Failed: Incorrect Password");
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    console.log("Login Successful for:", user.name);

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: 'Login failed' });
  }
});

// PRODUCT & ORDER ROUTES

// Get Products (with Search & Category Filter)
app.get('/api/products', async (req, res) => {
  try {
    const { search, category } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search,$options: 'i' };
    }
    if (category) {
      query.category = category;
    }

    const products = await Product.find(query);
    res.json(products);
  } catch (err) {
    console.error("Fetch Products Error:", err);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
});

// Create Order
app.post('/api/orders', async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;
    const newOrder = await Order.create({ userId, items, totalAmount });
    console.log("New Order Created:", newOrder._id);
    res.status(201).json(newOrder);
  } catch (err) {
    console.error("Create Order Error:", err);
    res.status(500).json({ message: 'Order creation failed' });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));