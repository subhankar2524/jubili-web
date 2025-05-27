"use client";
import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

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
        <div className="hidden md:flex space-x-6 text-sm">
          <a href="/" className="text-gray-500 hover:text-blue-600">Tracking Package</a>
          <a href="/faq" className="text-gray-500 hover:text-blue-600">FAQ</a>
          <a href="/about" className="text-gray-500 hover:text-blue-600">About Us</a>
          <a href="/contact" className="text-gray-500 hover:text-blue-600">Contact</a>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-2 space-y-2">
          <a href="/" className="block text-gray-500 hover:text-blue-600">Tracking Package</a>
          <a href="/faq" className="block text-gray-500 hover:text-blue-600">FAQ</a>
          <a href="/about" className="block text-gray-500 hover:text-blue-600">About Us</a>
          <a href="/contact" className="block text-gray-500 hover:text-blue-600">Contact</a>
        </div>
      )}
    </nav>
  );
}
