'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Form from '@/components/form/Search';
import QuotesGrid from '@/components/quotes/Quotes';
import Loader from '@/components/common/Loader';

const queryString = ({ text, category }) => {
  const params = new URLSearchParams();

  if (text) params.append('text', text);
  if (category) params.append('category', category);

  return params.toString();
};

const hasValidationErrors = async ({ response }) => {
  if (response.ok) return false;

  const errors = await response.json();
  if (!errors.errors || !Array.isArray(errors.errors)) {
    toast.error(`An error occurred, please, check your input.`);
    return true;
  }

  const messages = errors.errors
    .filter((err) => err.type === 'field')
    .map((err) => `${err.msg} (${err.path} ${err.value})`);

  if (messages) {
    messages.forEach((message) => {
      toast.error(message);
    });
  }

  return true;
};

export default function Search() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [category, setCategory] = useState('');
  const [query, setQuery] = useState('');
  const [quotes, setQuotes] = useState([]);
  const [searchSubmitted, setSubmitted] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const text = searchParams.get('text') || '';
    const category = searchParams.get('category') || '';

    if (text || category) {
      setText(text);
      setCategory(category);
    }

    handle({ e: null, text: text, category: category });
  }, [searchParams]);

  const handle = async ({ e, text, category }) => {
    if (e) {
      e.preventDefault();
    }

    if (text && text.length < 3) {
      setSubmitted(false);
      toast.error(`Please enter at least 3 characters to search.`);
      return;
    }

    try {
      setSubmitted(true);
      setLoading(true);

      const query = queryString({ text, category });
      router.push(`?${query}`, { scroll: false });

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_HOST}/${
          text || category
            ? process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_QUOTES_SEARCH
            : process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_QUOTES_RANDOM
        }?${query}&limit=18`
      );

      if (await hasValidationErrors({ response })) {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="area-quotes-search">
      <div className="p-4 pb-4 flex justify-center">
        <Form handle={handle} text={text} set={setText} />
      </div>
      {searchSubmitted && quotes && quotes.length && (
        <QuotesGrid quotes={quotes} query={query} />
      )}
      {loading && <Loader />}
    </div>
  );
}
