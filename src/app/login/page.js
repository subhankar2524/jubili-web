import AuthNavbar from '../components/AuthNavbar';
import Image from 'next/image';

export default function Login() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AuthNavbar />
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row">
        {/* Image Section - Hidden on mobile */}
        <div className="hidden md:block w-full md:w-1/2 relative h-64 md:h-auto">
          <Image
            src="https://plus.unsplash.com/premium_photo-1663054774427-55adfb2be76f"
            alt="Login illustration"
            fill
            className="object-cover rounded-2xl"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>
        {/* Form Section */}
        <div className="w-full md:w-1/2 md:pl-12 mt-8 md:mt-0">
          <div className=" p-8 rounded-2xl max-w-md mx-auto">
            <h1 className="text-5xl font-bold mb-2">Sign in</h1>
            <p className="mb-6 text-gray-600">
              Ready to see what's new? Sign in to get personalized recommendations, track your orders, and manage your account.
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  placeholder="Example@email.com"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                  type="password"
                  placeholder="At least 8 characters"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                  minLength="8"
                />
              </div>
              <div className="flex justify-end">
                <a href="#" className="text-sm text-blue-600 hover:underline">Forgot Password?</a>
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Sign in
              </button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="w-full bg-white border border-gray-300 rounded-md py-2 px-4 flex items-center justify-center text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  Facebook
                </button>
              </div>
            </div>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{' '}
                <a href="/signup" className="text-blue-600 hover:underline">Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}