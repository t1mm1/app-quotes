import React, { useState } from 'react';

export default function QuoteCard({ quote, query }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = quote.text.length > 120;

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

  return (
    <div
      className={
        `area-quote relative p-4 border border-gray-100 rounded-sm bg-[#fbfbfb] hover:bg-[#f5f5f5] transition-colors duration-200` +
        (
          isLong
            ? ` cursor-pointer after:content-["*"] after:absolute after:right-2 after:top-2 after:text-sm after:text-gray-400`
            : ""
        )
      }
      onClick={() => setExpanded((e) => !e)}
      tabIndex={0}
      role="button"
      aria-expanded={expanded}
    >
      <div className={`text-lg transition-all ${expanded ? "" : "line-clamp-3"}`}>
        {highlightMatches({query: query, text: quote.text})}
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
