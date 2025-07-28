'use client';

import { useState } from 'react';
import { toast } from 'react-toastify';
import Form from '@/components/form/Search';
import QuotesGrid from '@/components/quotes/Quotes';

const URL_QUOTES_SEARCH = 'quotes';

const queryString = ({ text }) => {
  const params = new URLSearchParams();
  if (text) {
    params.append('text', text);
  }
  params.append('limit', 18);

  return params.toString();
};

export default function Search() {
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [searchSubmitted, setSubmitted] = useState(false);

  const handle = async (e) => {
    if (e) {
      e.preventDefault();
    }

    if (text.length < 3) {
      setSubmitted(false);
      toast.error(`Please enter at least 3 characters to search.`);
      return;
    }

    try {
      setSubmitted(true);

      const query = queryString({ text });
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/${URL_QUOTES_SEARCH}?${query}`
      );
      if (!response.ok) {
        const errors = await response.json();
        if (!errors.errors || !Array.isArray(errors.errors)) {
          toast.error(`An error occurred, please, check your input.`);
          return;
        }

        const messages = errors.errors
          .filter((err) => err.type === 'field')
          .map((err) => `${err.msg} (${err.path} ${err.value})`);

        if (messages) {
          messages.forEach((message) => {
            toast.error(message);
          });
        }

        return;
      }

      const data = await response.json();

      setQuery(query);
      setQuotes(data);

      if (data.length == 0) {
        toast.error(`No quotes were found. Please try another keyword.`);
      }
    } catch (error) {
      console.error('Error: ', error);
      toast.error(error.msg);
    }
  };

  return (
    <div className="area-quotes-search">
      <div className="p-4 pb-4 flex justify-center">
        <Form handle={handle} set={setText} />
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
