'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import Loader from '@/components/common/Loader';

export default function Single({ id }) {
  const [loading, setLoading] = useState(false);
  const [quote, setQuote] = useState(null);

  const isValidId = ({ d }) => {
    return id > 0 ? true : false;
  };

  const fetchQuote = async () => {
    if (!isValidId({ id })) {
      toast.error(`Invalid quote ID. ID must be an integer greated than 0.`);
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_HOST}/${process.env.NEXT_PUBLIC_BACKEND_ENDPOINT_GET_QUOTE}/${id}`
      );

      if (!response.ok) {
        const errors = await response.json();

        if (response.status === 404) {
          toast.error(`Quote with ID ${id} was not found.`);
          return;
        }

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

      const quote = await response.json();
      setQuote(quote);
    } catch (error) {
      toast.error(error.message);
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, [id]);

  return (
    <div
      className="area-quotes-grid p-4 max-w-4xl w-full mx-auto sm:px-6 lg:px-8"
      id="quotes"
    >
      <div className="grid grid-cols-1 gap-6">
        <div className="area-quote relative p-4 border border-gray-100 rounded-sm bg-[#fbfbfb]">
          <div className="mb-2">
            <Link
              href={`/random`}
              className="text-blue-600 hover:underline text-sm cursor-pointer pb-1"
              title="Home"
              tabIndex={0}
              aria-label="Go gome"
              passHref
            >
              <span className="relative -top-0.5">&larr;</span> back
            </Link>
          </div>
          {quote && (
            <>
              <div className={`text-sm dark:text-gray-950`}>{quote.text}</div>
              <p className="text-left text-sm pt-2 pb-2 dark:text-gray-950">
                {quote.author}
              </p>
              <div className="flex flex-wrap mt-2">
                {quote.categories &&
                  quote.categories.map((category) => (
                    <Link
                      href={`/?category=${encodeURIComponent(category)}`}
                      key={category}
                    >
                      <span
                        title={`Category: ${category}`}
                        className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-sm mr-2 mb-2 hover:bg-gray-400 transition-colors duration-200 cursor-pointer"
                      >
                        {category}
                      </span>
                    </Link>
                  ))}
              </div>
            </>
          )}
          {loading && <Loader />}
        </div>
      </div>
    </div>
  );
}

Single.propTypes = {
  id: PropTypes.number.isRequired,
};
