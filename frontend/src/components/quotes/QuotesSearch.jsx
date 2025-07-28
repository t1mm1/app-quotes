'use client';

import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchForm from '@/components/form/SearchForm';
import QuotesGrid from '@/components/quotes/QuotesGrid';

const URL_QUOTES_SEARCH = 'quotes';

const queryString = ({ text }) => {
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
  const [searchSubmitted, setSubmitted] = useState(false);

  const handle = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (text.length < 3) {
      setSubmitted(false);

      toast.error("Type minimun 3 charasters for search");
      return;
    }

    try {
      setSubmitted(true);

      const query = queryString({ text });
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_HOST}/${URL_QUOTES_SEARCH}?${query}`);
      if (!response.ok) {
        const errors = await response.json();
        if (!errors.errors || !Array.isArray(errors.errors)) {
          toast.error('An error occurred, please, check your input.');
          return;
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
        <SearchForm handle={handle} set={setText} />
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
