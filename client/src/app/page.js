'use client';

import { useEffect, useState } from 'react';

export default function Example() {
  const [quotes, setQuotes] = useState([]);
  useEffect(() => {
    const fetchQuotes = async () => {
      const responce = await fetch(
        'http://localhost:3000/quotes/random?limit=9'
      );
      const data = await responce.json();
      setQuotes(data);
    };

    fetchQuotes();
  }, []);

  const welcome = (
    <>
      <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen">
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Quotes for Every Occasion
            </h1>
            {Array.isArray(quotes) && quotes.length > 0 ? (
              <>
                <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                  Discover a vast collection of over 500,000 quotes, ranging
                  from ancient philosophers to world-renowned authors and
                  thinkers. Our service offers you daily inspiration, wisdom,
                  and motivation, making it easy to find the right words for any
                  situation. Whether you’re searching for guidance, reflection,
                  or a spark of creativity, you’ll find quotes to suit every
                  mood and need.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                  <a
                    href="#quotes"
                    className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Get started
                  </a>
                  <a href="#" className="text-sm/6 font-semibold text-gray-900">
                    Learn more <span aria-hidden="true">→</span>
                  </a>
                </div>
              </>
            ) : (
              <>
                <p className="mt-8 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
                  Something going wrong...
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );

  const grid = (
    <>
      {Array.isArray(quotes) && quotes.length > 0 && (
        <div
          className="p-4 max-w-7xl w-full mx-auto sm:px-6 lg:px-8"
          id="quotes"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotes.map((quote) => (
              <div
                key={quote.id}
                className="p-4 border-1 border-gray-100 rounded-sm bg-[#fcfcfc]"
              >
                <p className="mb-4 text-sm">"{quote.text}"</p>
                <p className="text-left text-sm">{quote.author}</p>
                <div className="flex flex-wrap mt-2">
                  {quote.categories.map((category) => (
                    <span
                      href="#"
                      key={category}
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-sm mr-2 mb-2 hover:bg-gray-400 transition-colors duration-200 cursor-default"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );

  return (
    <div className="bg-white">
      {welcome}
      {grid}
    </div>
  );
}
