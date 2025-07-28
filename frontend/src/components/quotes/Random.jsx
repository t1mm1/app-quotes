'use client';

import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import QuotesGrid from '@/components/quotes/Quotes';

const URL_QUOTES_RANDOM = 'quotes/random';

export default function Random() {
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async (e) => {
    if (e) {
      e.preventDefault();
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/${URL_QUOTES_RANDOM}?limit=12`);
      if (!response.ok) {
        const errors = await response.json();
        if (!errors.errors) {
          toast.error('An error occurred, please, check your input.');
        }

        const messages = errors.errors
          .filter(err => err.type === 'field')
          .map(err => `${err.msg} (${err.path} ${err.value})`);

        if (messages) {
          messages.forEach(message => {
            toast.error(message);  
          });
        }

        return;
      }

      const data = await response.json();
      setQuotes(data);
    }
    catch (error) {
      console.error('Error: ', error);
      toast.error(error.msg);
    }
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
          Click to discover a random quotes
        </a>
      </div>

      <QuotesGrid quotes={quotes} />
    </div>
  );
}
