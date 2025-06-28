"use client";

import { useState } from "react";
import { FaMapMarkerAlt, FaSearch } from "react-icons/fa";

interface MapSelectorProps {
  onLocationSelect: (location: { lat: number; lng: number; address: string }) => void;
  selectedLocation?: { lat: number; lng: number; address: string };
}

export default function MapSelector({ onLocationSelect, selectedLocation }: MapSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = () => {
    // In a real implementation, this would use a geocoding service
    // For now, we'll simulate finding a location
    const mockLocation = {
      lat: 28.6139 + (Math.random() - 0.5) * 0.1,
      lng: 77.2090 + (Math.random() - 0.5) * 0.1,
      address: searchQuery || "123 Main Street, New Delhi, Delhi 110001"
    };
    onLocationSelect(mockLocation);
    setIsOpen(false);
  };

  const handleMapClick = () => {
    // In a real implementation, this would open a map modal
    // For now, we'll simulate selecting a random location
    const mockLocation = {
      lat: 28.6139 + (Math.random() - 0.5) * 0.1,
      lng: 77.2090 + (Math.random() - 0.5) * 0.1,
      address: "Selected Location, New Delhi, Delhi"
    };
    onLocationSelect(mockLocation);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-blue-600" />
            <span className="font-semibold">Choose Location</span>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isOpen ? "Close" : "Select on Map"}
          </button>
        </div>

        {selectedLocation?.address && (
          <div className="bg-white rounded-lg p-3 border border-gray-200 mb-4">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <FaMapMarkerAlt className="text-green-600" />
              <span>{selectedLocation.address}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Lat: {selectedLocation.lat.toFixed(4)}, Lng: {selectedLocation.lng.toFixed(4)}
            </div>
          </div>
        )}

        {isOpen && (
          <div className="bg-white rounded-lg border border-gray-200 p-4">
            <div className="mb-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Search for an address..."
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  <FaSearch />
                </button>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center border-2 border-dashed border-gray-300 mb-4">
              <div className="text-center">
                <FaMapMarkerAlt className="text-4xl text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Interactive Map</p>
                <p className="text-sm text-gray-400">Click to select location</p>
                <button
                  onClick={handleMapClick}
                  className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Select This Location
                </button>
              </div>
            </div>

            <div className="text-xs text-gray-500">
              <p>💡 Tip: In a real implementation, this would integrate with:</p>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Google Maps API</li>
                <li>Mapbox</li>
                <li>OpenStreetMap</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 