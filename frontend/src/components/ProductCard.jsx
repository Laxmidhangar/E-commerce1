import React from 'react';
import { ShoppingBag, Tag } from 'lucide-react';

export default function ProductCard({ product, addToCart }) {
  return (
    <div className="product-card">
      <div className="card-badge">
        <Tag size={12} /> {product.category}
      </div>
      <img src={product.imageUrl} alt={product.name} className="product-img" />
      <h3>{product.name}</h3>
      <div className="price">₹{product.price}</div>
      <button className="btn-add" onClick={() => addToCart(product)}>
        <ShoppingBag size={16} /> Add to Cart
      </button>
    </div>
  );
}