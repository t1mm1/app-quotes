import React from 'react';

export default function Welcome() {
  return (
    <>
      <div className="relative isolate px-6 pt-14 pb-4 lg:px-8 lg:py-8">
        <div className="mx-auto max-w-2xl">
          <div className="text-center">
            <h1 className="text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
              Quotes for Every Occasion
            </h1>
            <p className="mt-8 font-medium text-pretty text-gray-500">
              Discover a vast collection of over 500,000 quotes, ranging from
              ancient philosophers to world-renowned authors and thinkers. Our
              service offers you daily inspiration, wisdom, and motivation, making
              it easy to find the right words for any situation. Whether you’re
              searching for guidance, reflection, or a spark of creativity, you’ll
              find quotes to suit every mood and need.
            </p>
            
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center gap-x-6">
        <a
          href="/random"
          className="rounded-md px-3.5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition"
        >
          Get random quotes
        </a>
        <a
          href="https://github.com/t1mm1/app-quotes"
          target="_blank"
          className="text-sm/6 font-semibold text-gray-900"
        >
          Learn more <span aria-hidden="true">→</span>
        </a>
      </div>
    </>
  );
}
