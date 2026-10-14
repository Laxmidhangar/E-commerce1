require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to code-mitra database for seeding...'))
  .catch((err) => console.error('Connection Error:', err));

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  imageUrl: String
});

const Product = mongoose.model('Product', productSchema);

const sampleProducts = [
  // CLOTHES
  {
    name: 'Classic Denim Jacket',
    price: 2499,
    category: 'clothes',
    imageUrl: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?w=500&q=80'
  },
  {
    name: 'Cotton Casual T-Shirt',
    price: 799,
    category: 'clothes',
    imageUrl: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=500&q=80'
  },
  {
    name: 'Slim Fit Chino Pants',
    price: 1899,
    category: 'clothes',
    imageUrl: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&q=80'
  },
  {
    name: 'Oversized Streetwear Hoodie',
    price: 2199,
    category: 'clothes',
    imageUrl: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=500&q=80'
  },
  {
    name: 'Urban Leather Biker Jacket',
    price: 4999,
    category: 'clothes',
    imageUrl: 'https://images.unsplash.com/photo-1520975954732-35dd22299614?w=500&q=80'
  },
  {
    name: 'Formal Checkered Shirt',
    price: 1499,
    category: 'clothes',
    imageUrl: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80'
  },
  {
    name: 'Athletic Jogger Pants',
    price: 1299,
    category: 'clothes',
    imageUrl: 'https://images.unsplash.com/photo-1552902865-b72c031ac5ea?w=500&q=80'
  },
  {
    name: 'Summer Floral Dress',
    price: 2299,
    category: 'clothes',
    imageUrl: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&q=80'
  },

  // ELECTRONICS
  {
    name: 'Wireless ANC Headphones',
    price: 4999,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80'
  },
  {
    name: 'Smartwatch Series 8 Ultra',
    price: 3499,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80'
  },
  {
    name: 'Gaming Earbuds Pro',
    price: 1999,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80'
  },
  {
    name: 'Portable Bluetooth Speaker',
    price: 2999,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80'
  },
  {
    name: 'Mechanical RGB Keyboard',
    price: 3899,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80'
  },
  {
    name: 'Wireless Ergonomic Mouse',
    price: 1499,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80'
  },
  {
    name: '4K Ultra HD Action Camera',
    price: 7999,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80'
  },
  {
    name: 'Smart Fitness Tracker Band',
    price: 1799,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=500&q=80'
  },

  // ACCESSORIES / FOOTWEAR
  {
    name: 'Retro Sunglasses UV400',
    price: 999,
    category: 'electronics',
    imageUrl: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80'
  },
  {
    name: 'Minimalist Leather Wallet',
    price: 899,
    category: 'clothes',
    imageUrl: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=500&q=80'
  },
  {
    name: 'Urban Running Sneakers',
    price: 3299,
    category: 'clothes',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&q=80'
  },
  {
    name: 'Canvas Travel Backpack',
    price: 2199,
    category: 'clothes',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80'
  }
];

const seedDB = async () => {
  try {
    await Product.deleteMany({});
    await Product.insertMany(sampleProducts);
    console.log('✅ 20 Premium Products successfully added to code-mitra database!');
  } catch (err) {
    console.error('Seeding Error:', err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();