import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

function Productlist() {
  const [products, setProducts] = useState([]); // Initialize products as an empty array
  const [loader, setLoader] = useState(false); // Add loader state

  const fetchProducts = async () => {
    try {
      setLoader(true); // Set loader to true while fetching data
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products`);
      setProducts(response.data);
    } catch (error) {
      console.error('Failed to fetch Products info:', error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loader) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-24 h-24 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} /> // Added key prop
          ))}
        </div>
      </div>
    </div>
  );
}

export default Productlist;
