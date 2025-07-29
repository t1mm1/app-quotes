import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="area-page-not-found">
      <div className="grid place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-base font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href={`/`}
              className="rounded-md px-3.5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition"
              title="Go home"
              tabIndex={0}
              aria-label="Go home"
            >
              Go home
            </Link>
            <Link
              href={`https://github.com/t1mm1/app-quotes`}
              className="text-sm/6 font-semibold text-gray-900"
              title="Get sources on GitHub"
              tabIndex={0}
              aria-label="Get sources on GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
