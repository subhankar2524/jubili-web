"use client";

import Navbar from "@/components/NavBar";
import { useEffect, useState } from "react";
import { getUser } from "@/utils/storage";
import { getCartItems } from "@/lib/api/products";
import { FaMapMarkerAlt, FaLock, FaCheckCircle } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import MapSelector from "@/components/MapSelector";
import Script from "next/script";
import { useRouter } from "next/navigation";

export default function PaymentPage() {
  const [cartData, setCartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'paid' | 'failed'>('pending');
  const [orderId, setOrderId] = useState<string | null>(null);
  
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

  // Map location state
  const [mapLocation, setMapLocation] = useState({
    lat: 40.7128,
    lng: -74.0060,
    address: ''
  });

  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const router = useRouter();
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

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
        setError(err.message || "Failed to load cart items");
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

  const validateAddressForm = () => {
    const requiredFields = ['fullName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    const missingFields = requiredFields.filter(field => !addressForm);
    
    if (missingFields.length > 0) {
      alert(`Please fill in all required fields: ${missingFields.join(', ')}`);
      return false;
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(addressForm.email)) {
      alert("Please enter a valid email address");
      return false;
    }
    
    // Validate phone number (simple check for Indian numbers)
    const phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(addressForm.phone)) {
      alert("Please enter a valid 10-digit Indian phone number");
      return false;
    }
    
    return true;
  };

  const verifyPaymentWithBackend = async (paymentResponse: any, orderId: string) => {
    try {
      setPaymentStatus('processing');
      
      const verificationResponse = await fetch(`${apiBaseUrl}/api/payment/razorpay/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          razorpay_payment_id: paymentResponse.razorpay_payment_id,
          razorpay_order_id: paymentResponse.razorpay_order_id,
          razorpay_signature: paymentResponse.razorpay_signature,
          orderId: orderId
        }),
      });

      const verificationData = await verificationResponse.json();

      if (!verificationResponse.ok || !verificationData.success) {
        throw new Error(verificationData.message || 'Payment verification failed');
      }

      setPaymentStatus('paid');
      router.push(`/order-success/${orderId}`);

    } catch (error: any) {
      console.error('Payment verification error:', error);
      setPaymentStatus('failed');
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpay = async () => {
    if (!razorpayLoaded) {
      alert("Payment gateway is still loading. Please wait a moment and try again.");
      return;
    }

    if (!validateAddressForm()) {
      return;
    }

    setLoading(true);

    try {
      const item = cartData?.items?.[0];
      if (!item) {
        throw new Error("No cart item found!");
      }

      const orderRequestBody = {
        userId: getUser().userId,
        sellerId: item.sellerId,
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        productPrice: item.price,
        GST: item.GST,
        deliveryCharges: cartData.shippingCharge,
        otherCharges: 20,
        address: `${addressForm.address}, ${addressForm.city}, ${addressForm.state}, ${addressForm.zipCode}`,
        paymentMethod: "razorpay"
      };

      // 1. Create order in your DB first
      const orderRes = await fetch(`${apiBaseUrl}/api/orders/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderRequestBody),
        credentials: "include"
      });

      if (!orderRes.ok) {
        const errorData = await orderRes.json();
        throw new Error(errorData.message || "Order creation failed");
      }

      const orderData = await orderRes.json();
      const appOrderId = orderData.order.orderId;
      setOrderId(appOrderId);

      // 2. Create Razorpay order
      const totalAmount = Math.round(cartData.finalTotal * 100);
      const razorpayOrderRes = await fetch(`${apiBaseUrl}/api/payment/razorpay/order`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: totalAmount,
          receipt: appOrderId,
        }),
      });

      if (!razorpayOrderRes.ok) {
        const errorData = await razorpayOrderRes.json();
        throw new Error(errorData.message || "Failed to create Razorpay order");
      }

      const razorpayData = await razorpayOrderRes.json();

      // 3. Open Razorpay modal
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: razorpayData.order.amount,
        currency: razorpayData.order.currency,
        name: "Eden's Store",
        description: "Order Payment",
        order_id: razorpayData.order.id,
        handler: async function (response: any) {
          verifyPaymentWithBackend(response, appOrderId);
        },
        prefill: {
          name: addressForm.fullName,
          email: addressForm.email,
          contact: addressForm.phone,
        },
        notes: {
          orderId: appOrderId
        },
        theme: { color: "#0f172a" },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();
      
      rzp.on('payment.failed', function (response: any) {
        console.error("Payment failed:", response.error);
        setPaymentStatus('failed');
        setError(response.error.description);
        setLoading(false);
      });

    } catch (error: any) {
      console.error("Payment error:", error);
      setPaymentStatus('failed');
      setError(error.message);
      setLoading(false);
    }
  };

  // Check for pending payments on component mount
  useEffect(() => {
    const checkPendingPayment = async () => {
      const pendingOrderId = localStorage.getItem('pendingOrderId');
      if (pendingOrderId) {
        try {
          const statusRes = await fetch(`${apiBaseUrl}/api/payment/status/${pendingOrderId}`);
          const statusData = await statusRes.json();
          
          if (statusData.paymentStatus === 'paid') {
            router.push(`/order-success/${pendingOrderId}`);
          } else {
            localStorage.removeItem('pendingOrderId');
          }
        } catch (error) {
          console.error('Error checking pending payment:', error);
          localStorage.removeItem('pendingOrderId');
        }
      }
    };

    checkPendingPayment();
  }, [router]);

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
              <div className="flex mb-6 border-b border-gray-200">
                <button
                  className="flex items-center gap-2 px-6 py-3 font-semibold text-blue-600 border-b-2 border-blue-600 transition"
                  disabled
                >
                  <MdLocationOn className="text-lg" />
                  Shipping Address
                </button>
              </div>

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

                <MapSelector
                  onLocationSelect={(location) => {
                    setMapLocation(location);
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

              <div className="flex justify-end mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleRazorpay}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold disabled:opacity-50"
                  disabled={loading || !razorpayLoaded || paymentStatus === 'processing'}
                >
                  {paymentStatus === 'processing' ? 'Processing Payment...' : 
                   loading ? 'Loading...' : 'Continue to Payment'}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl border border-gray-300 p-6 mb-6">
              <div className="font-semibold mb-4">Order Summary</div>
              
              {loading && !cartData && <div className="text-gray-500">Loading...</div>}
              {error && (
                <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
                  {error}
                </div>
              )}
              
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

      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive"
        onLoad={() => setRazorpayLoaded(true)}
      />
    </>
  );
}