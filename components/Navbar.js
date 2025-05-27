"use client";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
    // Listen for storage changes to update login status
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    // Also listen for custom events if login/logout happens without page reload
    window.addEventListener('authChange', handleStorageChange); 

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('authChange', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userData');
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    // Dispatch a custom event to notify other components (like Navbar)
    window.dispatchEvent(new CustomEvent('authChange')); 
    router.push('/login');
  };

  return (
    <nav className="bg-gray-50 border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-2 flex justify-between items-center">
        <div className="text-2xl font-bold text-gray-800">Jubili</div>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden p-2 rounded text-gray-700 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6 text-sm items-center">
          <a href="/" className="text-gray-500 hover:text-blue-600">Tracking Package</a>
          <a href="/faq" className="text-gray-500 hover:text-blue-600">FAQ</a>
          <a href="/about" className="text-gray-500 hover:text-blue-600">About Us</a>
          <a href="/contact" className="text-gray-500 hover:text-blue-600">Contact</a>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-3 py-1.5 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <a href="/login" className="text-gray-500 hover:text-blue-600">Login</a>
              <a href="/signup" className="text-gray-500 hover:text-blue-600">Signup</a>
            </>
          )}
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-2 space-y-2">
          <a href="/" className="block text-gray-500 hover:text-blue-600">Tracking Package</a>
          <a href="/faq" className="block text-gray-500 hover:text-blue-600">FAQ</a>
          <a href="/about" className="block text-gray-500 hover:text-blue-600">About Us</a>
          <a href="/contact" className="block text-gray-500 hover:text-blue-600">Contact</a>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full text-left bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          ) : (
            <>
              <a href="/login" className="block text-gray-500 hover:text-blue-600">Login</a>
              <a href="/signup" className="block text-gray-500 hover:text-blue-600">Signup</a>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
