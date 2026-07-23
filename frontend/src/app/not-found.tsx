import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] px-4 text-center">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">404</h2>
      <p className="text-xl text-gray-600 mb-8">Oops! The page you're looking for couldn't be found.</p>
      <Link 
        href="/" 
        className="px-6 py-3 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition-colors"
      >
        Return Home
      </Link>
    </div>
  );
}
