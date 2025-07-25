import React from 'react';
import { useEffect, useState } from 'react';
import QuotesGrid from '@/components/quotes/QuotesGrid';

export default function QuotesRandom() {
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
    <div className='area-quotes-random'>
      <div className="flex pt-4 pb-4 items-center justify-center gap-x-6">
        <a
          href="#"
          onClick={fetchQuotes}
          className="rounded-md px-3.5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition"
        >
          Get random qutes
        </a>
      </div>

      <QuotesGrid quotes={quotes} />
    </div>
  );
}
