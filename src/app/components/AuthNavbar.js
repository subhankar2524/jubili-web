import Link from 'next/link';

export default function AuthNavbar() {
  return (
    <nav className="border-b border-gray-200 py-2">
      <div className="text-sm text-gray-600 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <div className="text-gray font-bold">India</div>
        <div className="flex space-x-6 text-gray600 text-sm">
          <Link href="/tracking" className="hover:text-blue-800 hover:underline">Tracking Package</Link>
          <Link href="/faq" className="hover:text-blue-800 hover:underline">FAQ</Link>
          <Link href="/about" className="hover:text-blue-800 hover:underline">About Us</Link>
          <Link href="/contact" className="hover:text-blue-800 hover:underline">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
}