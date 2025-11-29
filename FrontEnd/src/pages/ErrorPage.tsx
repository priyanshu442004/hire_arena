// src/pages/ErrorPage.tsx
import { Home, Mail, ArrowLeft, RotateCcw } from 'lucide-react';
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError() as { status?: number; statusText?: string } | null;
  const statusCode = error?.status || 404;
  // const statusText = error?.statusText || (statusCode === 404 ? 'Page Not Found' : 'Something Went Wrong');

  const isNotFound = statusCode === 404;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Hero */}
      <div className="flex flex-col items-center justify-center flex-1 px-4 py-12 text-center">
        {/* Animated SVG Illustration (inline, no image load) */}
        <div className="relative mb-10">
          <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-cyan-100 animate-pulse opacity-50"></div>
          <div className="relative z-10">
            <svg
              width="200"
              height="160"
              viewBox="0 0 200 160"
              className="mx-auto"
              aria-hidden="true"
            >
              {/* Cloud */}
              <path
                d="M40 60 Q60 40, 100 40 Q140 40, 160 60 Q180 80, 160 100 Q140 120, 100 120 Q80 120, 60 110 Q40 100, 40 80 Z"
                fill="#E0F2FE"
                stroke="#93C5FD"
                strokeWidth="2"
                className="animate-float"
              />
              {/* Lightning bolt (for 500) */}
              {statusCode === 500 && (
                <path
                  d="M90 70 L95 100 L85 100 L100 130 L90 110 L100 110 Z"
                  fill="#FBBF24"
                  stroke="#F59E0B"
                  strokeWidth="2"
                />
              )}
              {/* Broken chain (for 404) */}
              {statusCode === 404 && (
                <>
                  <circle cx="80" cy="85" r="12" fill="white" stroke="#94A3B8" strokeWidth="2" />
                  <circle cx="120" cy="85" r="12" fill="white" stroke="#94A3B8" strokeWidth="2" />
                  <line x1="92" y1="85" x2="108" y2="85" stroke="#94A3B8" strokeWidth="2" strokeDasharray="4,4" />
                </>
              )}
              {/* Small avatar (dot) inside cloud */}
              <circle cx="100" cy="85" r="8" fill="#60A5FA" />
            </svg>
          </div>
        </div>

        {/* Status Code */}
        <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-100 to-purple-100 text-cyan-800 font-medium mb-4">
          <RotateCcw className="mr-2" size={16} />
          Error {statusCode}
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          {isNotFound ? 'Page Lost in the Clouds' : 'Oops! Something Broke'}
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-gray-600 max-w-xl mb-8">
          {isNotFound
            ? 'The page you’re looking for doesn’t exist — like a pitch without a problem statement.'
            : 'Our AI stumbled during analysis. Don’t worry — no pitch data was harmed.'}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition shadow-md hover:shadow-lg"
          >
            <Home className="mr-2" size={18} />
            Back to Home
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-medium rounded-lg border border-gray-300 hover:bg-gray-50 transition"
          >
            <Mail className="mr-2" size={18} />
            Contact Support
          </Link>
        </div>

        {/* Helpful Tip */}
        <div className="mt-12 max-w-xl">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 border border-gray-200">
            <h3 className="font-semibold text-gray-900 flex items-center">
              <ArrowLeft className="mr-2 text-cyan-500" size={20} />
              Quick Recovery Tips
            </h3>
            <ul className="mt-3 text-sm text-gray-600 space-y-1">
              <li>• Check the URL for typos</li>
              <li>• Try refreshing — sometimes AI just needs a coffee break ☕</li>
              <li>• If this is unexpected, our team is already alerted (we monitor logs in real-time)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-500 text-sm border-t border-gray-200">
        © {new Date().getFullYear()} HireArena. Built for founders, by founders.
      </footer>
    </div>
  );
};

export default ErrorPage;