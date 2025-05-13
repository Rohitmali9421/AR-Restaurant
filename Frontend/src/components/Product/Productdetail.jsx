import React, { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { MdReviews } from 'react-icons/md';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loader, setLoader] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/products?_id=${id}`);
      setProduct(response.data?.[0]);
    } catch (error) {
      console.error('Failed to fetch product info:', error);
      alert('Failed to load product details');
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleARClick = () => {
    const modelViewer = document.getElementById('ar-model-viewer');
    if (modelViewer) {
      modelViewer.activateAR(); 
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    // Get existing cart items from localStorage
    const existingCart = JSON.parse(localStorage.getItem('cart') || []);
    
    // Check if item already exists in cart
    const existingItemIndex = existingCart.findIndex(item => item.id === product._id);

    let updatedCart;
    if (existingItemIndex >= 0) {
      // Item already in cart, update quantity
      updatedCart = existingCart.map((item, index) => 
        index === existingItemIndex 
          ? { ...item, quantity: item.quantity + quantity } 
          : item
      );
      alert(`Updated quantity of ${product.title} in your cart!`);
    } else {
      // Add new item to cart
      updatedCart = [
        ...existingCart,
        {
          id: product._id,
          name: product.title,
          price: product.price,
          image: product.image.url,
          quantity: quantity
        }
      ];
      alert(`${product.title} added to cart!`);
    }

    // Save to localStorage
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
  };

  if (loader) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="w-24 h-24 border-8 border-dashed rounded-full animate-spin border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold text-gray-700">Product not found</h2>
        <p className="text-gray-500 mt-2">The product you're looking for doesn't exist or may have been removed.</p>
        <button 
          onClick={() => navigate('/')}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div>
      <section className="py-8 bg-white md:py-16 antialiased">
        <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
            <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
              <img
                className="w-full rounded-lg"
                src={product.image.url}
                alt={product.title}
              />
              <model-viewer
                id="ar-model-viewer"
                src={product.image3d?.url || ''} 
                ar
                ar-modes="scene-viewer quick-look webxr"
                camera-controls
                auto-rotate
                style={{ display: 'none'}} 
              ></model-viewer>
            </div>

            <div className="mt-6 sm:mt-8 lg:mt-0">
              <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
                {product.title}
              </h1>
              <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
                <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                  ₹{product.price}
                </p>

                <div className="flex items-center gap-2 mt-2 sm:mt-0">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, index) => (
                      <FaStar key={index} className="w-4 h-4 text-yellow-300" />
                    ))}
                  </div>
                  <p className="text-sm font-medium leading-none text-gray-500">(5.0)</p>
                  <a
                    href="#reviews"
                    className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline flex items-center"
                  >
                    <MdReviews className="w-4 h-4 mr-1" />
                    345 Reviews
                  </a>
                </div>
              </div>

              <div className="mt-6 sm:items-center sm:gap-4 sm:flex">
                <div className="flex items-center border rounded-md w-fit">
                  <button
                    onClick={() => handleQuantityChange(quantity - 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <span className="px-3 py-1">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(quantity + 1)}
                    className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="mt-6 sm:gap-4 sm:items-center flex flex-wrap gap-4 sm:mt-8">
                <button
                  onClick={handleARClick} 
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                >
                  View in AR
                </button>
                <button
                  onClick={handleAddToCart} 
                  className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Add to Cart
                </button>
                
              </div>

              <hr className="my-6 md:my-8 border-gray-200" />

              <p className="mb-6 text-gray-500">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductDetail;