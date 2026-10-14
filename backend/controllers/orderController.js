const Order = require('../models/Order');

// Create New Order (Checkout)
exports.createOrder = async (req, res) => {
  try {
    const { userId, items, totalAmount } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ message: 'No items in cart' });
    }

    const newOrder = new Order({
      userId,
      items,
      totalAmount,
      paymentStatus: 'Success'
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully! 🎉', order: savedOrder });
  } catch (err) {
    res.status(500).json({ message: 'Failed to place order', error: err.message });
  }
};

// Get User Orders
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ orderDate: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch orders', error: err.message });
  }
};