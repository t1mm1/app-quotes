'use client';

import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';

const getQueryParam = ({ query, param }) => {
  const params = new URLSearchParams(query);
  return params.get(param) || '';
};

const highlightText = ({ query, text, type }) => {
  if (!query) return text;

  const highlight = getQueryParam({ query: query, param: type });
  if (!highlight) return text;

  const regex = new RegExp(
    `(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`,
    'gi'
  );
  const parts = text.split(regex);

  return parts.map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="font-bold text-red-500">
        {part}
      </span>
    ) : (
      <React.Fragment key={i}>{part}</React.Fragment>
    )
  );
};

const highlightCategory = ({ query, category, type }) => {
  if (!query) return category;

  const highlight = getQueryParam({ query: query, param: type });
  if (!highlight) return category;

  if (category.toLowerCase() === highlight.toLowerCase()) {
    return <span className="font-bold text-red-500">{category}</span>;
  }

  return category;
};

export default function Quote({ quote, query }) {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const maxHeight = lineHeight * 3;
      setClamped(el.scrollHeight > maxHeight + 2);
    }
  }, [quote.text, query]);

  return (
    <div className="area-quote relative p-4 border border-gray-100 rounded-sm bg-[#fbfbfb] hover:bg-[#f5f5f5] dark:bg-[#e5e5e5] transition-colors duration-200">
      <div
        ref={textRef}
        className={`text-sm transition-all dark:text-gray-950 ${
          expanded ? '' : 'line-clamp-3'
        }`}
        style={{ overflowWrap: 'anywhere' }}
      >
        {highlightText({ query: query, text: quote.text, type: 'text' })}
      </div>
      <div className="mt-1 mb-2">
        {clamped && (
          <button
            className="text-blue-600 hover:underline text-sm cursor-pointer mr-2"
            onClick={() => setExpanded((exp) => !exp)}
            aria-label={expanded ? 'hide' : 'more'}
            tabIndex={-1}
          >
            {expanded ? <span>hide &uarr;</span> : <span>more &darr;</span>}
          </button>
        )}
        <Link
          href={`/quotes/${quote.id}`}
          className=" text-blue-600 hover:underline text-sm cursor-pointer"
          title="Open"
          tabIndex={0}
          aria-label="Open quote page"
          passHref
        >
          read<span className="relative -top-0.5">&rarr;</span>
        </Link>
      </div>
      <p className="text-left text-sm pt-2 pb-2 dark:text-gray-950">
        {quote.author}
      </p>
      <div className="flex flex-wrap mt-2">
        {quote.categories.map((category) => (
          <Link
            href={`/?category=${encodeURIComponent(category)}`}
            key={category}
          >
            <span
              title={`Category: ${category}`}
              className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-sm mr-2 mb-2 hover:bg-gray-400 transition-colors duration-200 cursor-pointer"
            >
              {highlightCategory({
                query: query,
                category: category,
                type: 'category',
              })}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

Quote.propTypes = {
  quote: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    text: PropTypes.string.isRequired,
    author: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
  }),
  query: PropTypes.string,
};
