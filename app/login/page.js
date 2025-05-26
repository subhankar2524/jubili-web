// app/login/page.js
import Navbar from "@/components/Navbar";

export default function LoginPage() {
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

          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Example@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="At least 8 characters"
              />
              <div className="text-right text-sm mt-1">
                <a href="#" className="text-blue-500 hover:underline">Forgot Password?</a>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900 transition"
            >
              Sign in
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
