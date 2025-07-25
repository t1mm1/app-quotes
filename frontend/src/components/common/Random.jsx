import React from 'react';
import { useEffect, useState } from 'react';
import QuotesGrid from '@/components/quotes/QuotesGrid';

export default function Random() {
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async (e) => {
    if (e) {
      e.preventDefault();
    }
    const responce = await fetch('http://localhost:3001/quotes/random?limit=12');
    const data = await responce.json();
    setQuotes(data);
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <>
      <div className="relative isolate px-6 pt-14 pb-4 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Random Quotes
            </h1>
            <p className="mt-8 font-medium text-pretty text-gray-500">
              Get random quotes form collection of over 500,000 quotes, ranging from
              ancient philosophers to world-renowned authors and thinkers.
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-x-6">
        <a
          href="#"
          onClick={fetchQuotes}
          className="rounded-md px-3.5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition"
        >
          Get random qutes
        </a>
      </div>

      <QuotesGrid quotes={quotes} />
    </>
  );
}
