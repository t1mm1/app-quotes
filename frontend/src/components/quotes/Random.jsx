'use client';

import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import QuotesGrid from '@/components/quotes/Quotes';
import Loader from '@/components/common/Loader';

const hasValidationErrors = async ({ response }) => {
  if (response.ok) return false;

  const errors = await response.json();
  if (!errors.errors || !Array.isArray(errors.errors)) {
    toast.error('An error occurred, please, check your input.');
    return true;
  }

  errors.errors
    .filter((err) => err.type === 'field')
    .forEach((err) => toast.error(`${err.msg} (${err.path} ${err.value})`));

  return true;
};

export default function Random({
  limit = 12,
  buttonLabel = 'Click to discover random quotes',
  quotesGridProps = {},
}) {
  const [loading, setLoading] = useState(false);
  const [quotes, setQuotes] = useState([]);

  const fetchQuotes = async (e) => {
    if (e) e.preventDefault();

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_HOST}/${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_QUOTES_RANDOM}?limit=${limit}`
      );

      if (await hasValidationErrors({ response })) return;

      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error: ', error);
      toast.error(error?.msg || 'Unknown error occurred.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [limit]);

  return (
    <div className="area-quotes-random" aria-live="polite">
      <div className="flex pt-4 pb-4 items-center justify-center gap-x-6">
        <button
          className="rounded-md px-3.5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition cursor-pointer"
          onClick={fetchQuotes}
          aria-label={buttonLabel}
          tabIndex={0}
          disabled={loading}
        >
          {buttonLabel}
        </button>
      </div>
      {quotes && quotes.length > 0 && (
        <QuotesGrid quotes={quotes} {...quotesGridProps} />
      )}
      {loading && <Loader />}
    </div>
  );
}

Random.propTypes = {
  limit: PropTypes.number,
  buttonLabel: PropTypes.string,
  quotesGridProps: PropTypes.object,
};
