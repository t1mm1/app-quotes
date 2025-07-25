import React from 'react';
import QuoteCard from '@/components/quotes/QuoteCard';

export default function QuotesGrid({ quotes, query }) {
  return (
    <>
      {Array.isArray(quotes) && quotes.length > 0 && (
        <div className="area-quotes-grid p-4 max-w-7xl w-full mx-auto sm:px-6 lg:px-8" id="quotes">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quotes.map((quote) => (
              <QuoteCard quote={quote} query={query} key={quote.id} />
            ))}
          </div>
        </div>
      )}
    </>
  );
}
