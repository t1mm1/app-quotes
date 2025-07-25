'use client';

import { useState } from 'react';

import QuotesGrid from '@/components/quotes/QuotesGrid';

export default function Search() {
  const [text, setText] = useState('');
  const [error, setError] = useState("");
  const [quotes, setQuotes] = useState([]);

  const createSearchQueryString = ({ text }) => {
    const params = new URLSearchParams();
    if (text) {
      params.append('text', text);
    }
    params.append('limit', 27);

    return params.toString();
  };

  const handleSearch = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (text.length < 4) {
      setError("Type minimun 4 charasters for search");
      return;
    }
    setError("");

    try {
      if (text.length > 2) {
        const query = createSearchQueryString({ text });
        const response = await fetch(`http://localhost:3001/quotes?${query}`);
        const data = await response.json();
        setQuotes(data);
      }
    } 
    catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  return (
    <>
      <div className="p-4 flex justify-center">
        <form className="w-full max-w-3xl" onSubmit={(e) => handleSearch(e)}>
          <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white shadow-sm dark:bg-gray-800 dark:border-gray-600">
            <input
              type="text"
              placeholder="Search quotes"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="flex-grow px-8 py-4 focus:outline-none bg-transparent text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              className="h-full px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition"
            >
              Search
            </button>
          </div>
          {error && (
            <div className="mt-2 text-center text-sm text-red-600 opacity-70">{error}</div>
          )}
        </form>
      </div>

      <QuotesGrid quotes={quotes} />
    </>
  );
}
