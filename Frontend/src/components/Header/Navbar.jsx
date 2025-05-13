import React, { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  // Load cart count from localStorage
  useEffect(() => {
    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const count = cart.reduce((total, item) => total + item.quantity, 0);
      setCartCount(count);
    };

    // Initial load
    updateCartCount();

    // Listen for storage events to update when cart changes in other tabs/windows
    window.addEventListener('storage', updateCartCount);

    // Cleanup
    return () => {
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <NavLink to="/" className="flex">
                <img
                  className="w-36 hover:opacity-90 transition-opacity"
                  src="https://res.cloudinary.com/dglakn1aw/image/upload/v1742204920/dineview/iptuuz9mo3d3r0ecnsvi.jpg"
                  alt="Restaurant Logo"
                />
              </NavLink>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-10">
            <NavLink
              to="/"
              className={({ isActive }) => 
                `text-base font-medium transition-all duration-200 px-3 py-2 rounded-md ${
                  isActive 
                    ? "bg-blue-100 text-blue-600" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) => 
                `text-base font-medium transition-all duration-200 px-3 py-2 rounded-md ${
                  isActive 
                    ? "bg-blue-100 text-blue-600" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`
              }
            >
              Menu
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => 
                `text-base font-medium transition-all duration-200 px-3 py-2 rounded-md ${
                  isActive 
                    ? "bg-blue-100 text-blue-600" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/support"
              className={({ isActive }) => 
                `text-base font-medium transition-all duration-200 px-3 py-2 rounded-md ${
                  isActive 
                    ? "bg-blue-100 text-blue-600" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`
              }
            >
              Support
            </NavLink>
            <NavLink
              to="/admin"
              className={({ isActive }) => 
                `text-base font-medium transition-all duration-200 px-3 py-2 rounded-md ${
                  isActive 
                    ? "bg-blue-100 text-blue-600" 
                    : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                }`
              }
            >
              Dashboard
            </NavLink>
          </div>

          {/* Right Side - Cart and Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* Cart Button */}
            <NavLink 
              to="/cart" 
              className="relative p-2 text-gray-700 rounded-full hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              <FaShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              type="button"
              onClick={toggleMenu}
              className="inline-flex p-2 text-gray-700 rounded-md lg:hidden hover:bg-gray-100 focus:outline-none transition-colors"
            >
              {isMenuOpen ? (
                <FiX className="w-6 h-6" />
              ) : (
                <FiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg rounded-md mt-2">
              <NavLink
                to="/"
                onClick={closeMenu}
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive 
                      ? "bg-blue-100 text-blue-600" 
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/products"
                onClick={closeMenu}
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive 
                      ? "bg-blue-100 text-blue-600" 
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`
                }
              >
                Menu
              </NavLink>
              <NavLink
                to="/about"
                onClick={closeMenu}
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive 
                      ? "bg-blue-100 text-blue-600" 
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`
                }
              >
                About
              </NavLink>
              <NavLink
                to="/support"
                onClick={closeMenu}
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive 
                      ? "bg-blue-100 text-blue-600" 
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`
                }
              >
                Support
              </NavLink>
              <NavLink
                to="/admin"
                onClick={closeMenu}
                className={({ isActive }) => 
                  `block px-3 py-2 rounded-md text-base font-medium ${
                    isActive 
                      ? "bg-blue-100 text-blue-600" 
                      : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
                  }`
                }
              >
                Dashboard
              </NavLink>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;