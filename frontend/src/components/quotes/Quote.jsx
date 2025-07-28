'use client'

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function ({ quote, query }) {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);
  const textRef = useRef(null);

  function getQueryParam({query, param}) {
    const params = new URLSearchParams(query);
    return params.get(param) || '';
  }

  function highlightMatches({query, text}) {
    if (!query) {
      return text;
    }

    const highlight = getQueryParam({query: query, param: 'text'});

    const regex = new RegExp(`(${highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <span key={i} className="font-bold">
          {part}
        </span>
      ) : (
        <React.Fragment key={i}>{part}</React.Fragment>
      )
    );
  }

  useEffect(() => {
    const el = textRef.current;
    if (el) {
      const lineHeight = parseFloat(getComputedStyle(el).lineHeight);
      const maxHeight = lineHeight * 3;
      setClamped(el.scrollHeight > maxHeight + 2);
    }
  }, [quote.text, query]);

  return (
    <div
      className="area-quote relative p-4 border border-gray-100 rounded-sm bg-[#fbfbfb] hover:bg-[#f5f5f5] transition-colors duration-200"
    >
      <div
        ref={textRef}
        className={`text-sm transition-all ${expanded ? "" : "line-clamp-3"}`}
        style={{overflowWrap: 'anywhere'}}
      >
        {highlightMatches({query: query, text: quote.text})}
      </div>
      <div className="mt-1 mb-2">
        {clamped && (
          <button
            className="text-blue-600 hover:underline text-sm cursor-pointer mr-2"
            onClick={() => setExpanded(exp => !exp)}
            aria-label={expanded ? "hide" : "more"}
            tabIndex={-1}
          >
            {expanded ? (
              <span>hide &uarr;</span>
            ) : (
              <span>more &darr;</span>
            )}
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
      <p className="text-left text-sm pt-2 pb-2 ">{quote.author}</p>
      <div className="flex flex-wrap mt-2">
        {quote.categories.map((category) => (
          <span
            key={category}
            title={`Category: ${category}`}
            className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-sm mr-2 mb-2 hover:bg-gray-400 transition-colors duration-200 cursor-default"
          >
            {category}
          </span>
        ))}
      </div>
    </div>
  );
}
