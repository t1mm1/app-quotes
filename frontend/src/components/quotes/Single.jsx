'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Single({ id }) {
  const URL_QUOTES_QUOTE = 'quotes';
  const [quote, setQuote] = useState(null);
  
  useEffect(() => {
    if (id) {
      const url = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/${URL_QUOTES_QUOTE}/${id}`;
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error("Quote not found");
          }
          return response.json();
        })
        .then((quote) => setQuote(quote))
        .catch((error) => {
          setQuote(null); // можно отобразить ошибку пользователю
          console.error('Error:', error);
        });
    }
  }, [id]);

  return (
    <div className="area-quotes-grid p-4 max-w-7xl w-full mx-auto sm:px-6 lg:px-8" id="quotes">
      <div className="grid grid-cols-1 gap-6">
        <div
          className="area-quote relative p-4 border border-gray-100 rounded-sm bg-[#fbfbfb]"
        >
          <div className='mb-4'>
            <Link
              href={`/random`}
              className="pb-1 text-blue-600 hover:underline text-sm cursor-pointer"
              title="Open"
              tabIndex={0}
              aria-label="Go gome"
              passHref
            ><span className="relative -top-0.5">&larr;</span> back</Link>
          </div>
          {quote ? (
            <>
              <div className={`text-sm`}>
                {quote.text}
              </div>
              <p className="text-left text-sm pt-2 pb-2 ">{quote.author}</p>
              <div className="flex flex-wrap mt-2">
                {quote.categories.map((category) => (
                  <span
                    key={category}
                    title={`Category: ${category}`}
                    className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-sm mr-2 mb-2 hover:bg-gray-400 transition-colors duration-200 cursor-default"
                  >
                    {category}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className='text-sm'>
              Loading...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
