'use client';

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import QuotesGrid from '@/components/quotes/QuotesGrid';

const createSearchQueryString = ({ text }) => {
  const params = new URLSearchParams();
  if (text) {
    params.append('text', text);
  }
  params.append('limit', 18);

  return params.toString();
};

export default function QuotesSearch() {
  const [text, setText] = useState('');
  const [query, setQuery] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (text.length < 3) {
      const error = "Type minimun 3 charasters for search";
      setError(error);
      toast.error(error);
      setQuotes([]);
      setSearchSubmitted(false);
      return;
    }
    setError('');

    try {
      if (text.length >= 3) {
        setSearchSubmitted(true);

        const query = createSearchQueryString({ text });
        const response = await fetch(`http://localhost:3001/quotes?${query}`);
        const data = await response.json();

        setQuery(query);
        setQuotes(data);
      }
    } 
    catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className='area-quotes-search'>
      <div className="p-4 pb-4 flex justify-center">
        <form className="relative w-full max-w-3xl" onSubmit={(e) => handleSearch(e)}>
          <div className="flex items-center border border-gray-300 rounded overflow-hidden bg-white shadow-sm dark:bg-gray-800 dark:border-gray-600">
            <input
              id="text"
              type="text"
              placeholder="Search quotes"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className={
                `flex-grow px-8 py-4 focus:outline-none bg-transparent text-gray-900 dark:text-white ${error ? ' text-red-500' : ''}`
              }
            />
            <button
              type="submit"
              className="h-full px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition"
            >
              Search
            </button>
            <ToastContainer 
              className="centered-toast-container"
              toastClassName="centered-toast"

              hideProgressBar={false}
              closeOnClick
              draggable
            />
          </div>
        </form>
      </div>

      {searchSubmitted ? (
        <>
          {quotes && quotes.length ? (
            <QuotesGrid quotes={quotes} query={query} />  
          ) : (
            <div className="w-full flex justify-center items-center p-4">
              <div className="text-gray-500 text-lg">Quotes wasn't found</div>
            </div>
          )}
        </>
      ) : (
        <div className="w-full flex justify-center items-center p-4 pb-0">
          <div className="text-gray-500 text-lg">Make search for the Quotes</div>
        </div>
      )}
    </div>
  );
}
