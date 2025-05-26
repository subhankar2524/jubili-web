// app/login/page.js
import Navbar from "@/components/Navbar";

export default function signupPage() {
  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-2xl overflow-hidden">
        {/* Right - Image Section */}
        <div className="hidden md:block">
          <img
            src="https://images.pexels.com/photos/15485500/pexels-photo-15485500/free-photo-of-a-group-of-young-people-at-an-event.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Login visual"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Left - Form Section */}
        <div className="p-10">
          <h2 className="text-3xl font-bold mb-4">Create Account</h2>
          <p className="text-gray-600 mb-6">
            Create an account and discover a world of amazing products, personalized shopping experiences, and special offers.
          </p>

          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="eg. John Doe"
              />
            </div>  
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
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                id="phone"
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="+91"
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

        
      </div>
    </div>
    </>
  );
}
