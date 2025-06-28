"use client";

import Navbar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { getUser } from "@/utils/storage";
import { getCartItems } from "@/lib/api/products";
import { FaMapMarkerAlt, FaCreditCard, FaLock, FaCheckCircle } from "react-icons/fa";
import { MdLocationOn, MdPayment, MdSecurity } from "react-icons/md";
import MapSelector from "@/components/MapSelector";

export default function PaymentPage() {
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'address' | 'payment'>('address');
  
  // Address form state
  const [addressForm, setAddressForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India'
  });

  // Payment form state
  const [paymentForm, setPaymentForm] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    saveCard: false
  });

  // Map location state
  const [mapLocation, setMapLocation] = useState({
    lat: 40.7128,
    lng: -74.0060,
    address: ''
  });

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const user = getUser();
        if (!user || !user.userId) {
          setError("User not found. Please login.");
          setLoading(false);
          return;
        }
        const data = await getCartItems(user.userId);
        setCartData(data);
      } catch (err: any) {
        setError(err.message || "Unknown error");
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const handleAddressChange = (field: string, value: string) => {
    setAddressForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePaymentChange = (field: string, value: string) => {
    setPaymentForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async () => {
    // Handle payment submission
    console.log('Payment submitted:', { addressForm, paymentForm, cartData });
  };

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-4">
        <div className="py-4 text-4xl font-bold">
          Complete Your Purchase
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-300 p-6 mb-6">
              {/* Tab Navigation */}
              <div className="flex mb-6 border-b border-gray-200">
                <button
                  className={`flex items-center gap-2 px-6 py-3 font-semibold transition ${
                    activeTab === 'address'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('address')}
                >
                  <MdLocationOn className="text-lg" />
                  Shipping Address
                </button>
                <button
                  className={`flex items-center gap-2 px-6 py-3 font-semibold transition ${
                    activeTab === 'payment'
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setActiveTab('payment')}
                >
                  <MdPayment className="text-lg" />
                  Payment Method
                </button>
              </div>

              {/* Address Tab */}
              {activeTab === 'address' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={addressForm.fullName}
                        onChange={(e) => handleAddressChange('fullName', e.target.value)}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={addressForm.email}
                        onChange={(e) => handleAddressChange('email', e.target.value)}
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={addressForm.phone}
                      onChange={(e) => handleAddressChange('phone', e.target.value)}
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Map Location Selection */}
                  <MapSelector
                    onLocationSelect={(location) => {
                      setMapLocation(location);
                      // Parse Indian address format: "Street, City, State PIN"
                      const addressParts = location.address.split(', ');
                      setAddressForm(prev => ({
                        ...prev,
                        address: addressParts[0] || '',
                        city: addressParts[1] || '',
                        state: addressParts[2] || '',
                        zipCode: addressParts[3] || ''
                      }));
                    }}
                    selectedLocation={mapLocation}
                  />

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Street Address *
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={addressForm.address}
                      onChange={(e) => handleAddressChange('address', e.target.value)}
                      placeholder="Enter your street address"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={addressForm.city}
                        onChange={(e) => handleAddressChange('city', e.target.value)}
                        placeholder="City"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={addressForm.state}
                        onChange={(e) => handleAddressChange('state', e.target.value)}
                        placeholder="State"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ZIP Code *
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={addressForm.zipCode}
                        onChange={(e) => handleAddressChange('zipCode', e.target.value)}
                        placeholder="ZIP Code"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={addressForm.country}
                      readOnly
                      disabled
                    />
                    <p className="text-xs text-gray-500 mt-1">Currently serving India only</p>
                  </div>
                </div>
              )}

              {/* Payment Tab */}
              {activeTab === 'payment' && (
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-blue-800">
                      <MdSecurity className="text-lg" />
                      <span className="font-semibold">Secure Payment</span>
                    </div>
                    <p className="text-sm text-blue-700 mt-1">
                      Your payment information is encrypted and secure
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Card Number *
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={paymentForm.cardNumber}
                        onChange={(e) => handlePaymentChange('cardNumber', formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                      />
                      <FaCreditCard className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                      value={paymentForm.cardHolder}
                      onChange={(e) => handlePaymentChange('cardHolder', e.target.value)}
                      placeholder="Name on card"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={paymentForm.expiryDate}
                        onChange={(e) => handlePaymentChange('expiryDate', e.target.value)}
                        placeholder="MM/YY"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV *
                      </label>
                      <input
                        type="text"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        value={paymentForm.cvv}
                        onChange={(e) => handlePaymentChange('cvv', e.target.value)}
                        placeholder="123"
                        maxLength={4}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="saveCard"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={paymentForm.saveCard}
                      onChange={(e) => setPaymentForm(prev => ({ ...prev, saveCard: e.target.checked }))}
                    />
                    <label htmlFor="saveCard" className="text-sm text-gray-700">
                      Save this card for future purchases
                    </label>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                {activeTab === 'payment' && (
                  <button
                    onClick={() => setActiveTab('address')}
                    className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Back to Address
                  </button>
                )}
                {activeTab === 'address' && (
                  <button
                    onClick={() => setActiveTab('payment')}
                    className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Continue to Payment
                  </button>
                )}
                {activeTab === 'payment' && (
                  <button
                    onClick={handleSubmit}
                    className="ml-auto px-8 py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition font-semibold"
                  >
                    Pay Now
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-300 p-6 mb-6">
              <div className="font-semibold mb-4">Order Summary</div>
              
              {loading && <div className="text-gray-500">Loading...</div>}
              {error && <div className="text-red-500">{error}</div>}
              
              {cartData && (
                <>
                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Sub Total</span>
                      <span>₹{cartData.totalOriginalPrice?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Discount (10%)</span>
                      <span className="text-green-700">-₹{cartData.totalDiscount?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Delivery fee</span>
                      <span>₹{cartData.shippingCharge?.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total</span>
                      <span>₹{cartData.finalTotal?.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="space-y-3 text-xs text-gray-500">
                    <div className="flex items-start gap-2">
                      <FaCheckCircle className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>90 Day Limited Warranty against manufacturer's defects</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <FaLock className="text-blue-600 mt-0.5 flex-shrink-0" />
                      <span>Secure payment processing</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <FaMapMarkerAlt className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span>Free shipping on orders over $50</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
