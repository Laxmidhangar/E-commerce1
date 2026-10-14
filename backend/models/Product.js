const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true }, // e.g. 'clothes', 'electronics'
  imageUrl: { type: String, required: true },
  description: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);