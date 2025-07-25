import React, { useState } from 'react';

export default function QuoteCard({ quote }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = quote.text.length > 120;

  return (
    <div
      className={
        `area-quote relative p-4 border border-gray-100 rounded-sm bg-[#fbfbfb] hover:bg-[#f5f5f5]` +
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
        {quote.text}
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
