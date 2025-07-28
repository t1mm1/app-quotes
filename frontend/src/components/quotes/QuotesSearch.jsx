'use client';

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  const handleSearch = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (text.length < 3) {
      setSearchSubmitted(false);

      toast.error("Type minimun 3 charasters for search");
      return;
    }

    try {
      setSearchSubmitted(true);

      const query = createSearchQueryString({ text });
      const response = await fetch(`http://localhost:3001/quotes?${query}`);
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

      setQuery(query);
      setQuotes(data);

      if (data.length == 0) {
        toast.error("Quotes wasn't found");
      }
    } 
    catch (error) {
      console.error('Error: ', error);
      toast.error(error.msg);
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
              className='flex-grow px-8 py-4 focus:outline-none bg-transparent text-gray-900 dark:text-white}'
            />
            <button
              type="submit"
              className="h-full px-8 py-4 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition cursor-pointer"
            >
              Search
            </button>
            <ToastContainer 
              position="bottom-center"
              autoClose={3000}
              hideProgressBar={true}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              pauseOnHover
              theme="colored"
            />
          </div>
        </form>
      </div>

      {searchSubmitted && (
        <>
          {quotes && quotes.length && (
            <QuotesGrid quotes={quotes} query={query} />  
          )}
        </>
      )}
    </div>
  );
}
