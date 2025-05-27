// app/login/page.js
"use client"; // Add "use client" at the top
import { useState } from 'react'; // Import useState
import { useRouter } from 'next/navigation'; // Import useRouter
import Navbar from "@/components/Navbar";

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://kickstart-59ea.onrender.com/api/users/login?email=${email}&password=${password}`);
      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem('userData', JSON.stringify(data.user));
        localStorage.setItem('token', data.token);
        router.push('/');
      } else if (response.status === 401) {
        setError(data.message || "Invalid credentials");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-2xl overflow-hidden">
        
        {/* Left - Form Section */}
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-4">Sign in</h2>
          <p className="text-gray-600 mb-6">
            Ready to see what’s new? Sign in to get personalized recommendations, track your orders, and manage your account.
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>} {/* Display error message */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email} // Set value to email state
                onChange={(e) => setEmail(e.target.value)} // Update email state onChange
                required // Add required attribute
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Example@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                value={password} // Set value to password state
                onChange={(e) => setPassword(e.target.value)} // Update password state onChange
                required // Add required attribute
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="At least 8 characters"
              />
              <div className="text-right text-sm mt-1">
                <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading} // Disable button when loading
              className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"} {/* Change button text when loading */}
            </button>
          </form>

          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-sm text-gray-500">Or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100">
              <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google" className="w-5 h-5" />
              Sign in with Google
            </button>
            <button className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100">
              <img src="https://www.svgrepo.com/show/448224/facebook.svg" alt="Facebook" className="w-5 h-5" />
              Sign in with Facebook
            </button>
          </div>

          <p className="mt-6 text-center text-sm">
            Don’t you have an account?{" "}
            <a href="#" className="text-blue-500 hover:underline">Sign up</a>
          </p>
        </div>

        {/* Right - Image Section */}
        <div className="hidden md:block">
          <img
            src="https://images.unsplash.com/photo-1513682121497-80211f36a7d3?q=80&w=1976&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Login visual"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
    </>
  );
}
