import React from 'react';

export default function QuoteCard({ quote }) {
  return (
    <div
      className="p-4 border-1 border-gray-100 rounded-sm bg-[#fbfbfb]
        hover:bg-[#f5f5f5]
        transition-colors
        duration-200"
    >
      <p className="mb-4 text-lg">{quote.text}</p>
      <p className="text-left text-sm">{quote.author}</p>
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
