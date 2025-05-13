import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard({ product }) {
  return (
    <div className="max-w-sm mx-auto"> 
      <Link to={`/products/${product._id}`} className="group">
        <div className="w-full h-64 overflow-hidden rounded-lg bg-gray-200">
          <img
            alt={product.title}
            src={`${product.image.url}?w=300&h=300&c=fill&q=80`} 
            className="w-full h-full object-cover object-center group-hover:opacity-75"
          />
        </div>
        <h3 className="mt-4 text-sm text-gray-700">{product.title}</h3>
        <div className="flex justify-between mt-1">
          <p className="text-lg font-medium text-gray-900">₹{product.price}</p>
        </div>
      </Link>
    </div>
  );
}

export default ProductCard;
