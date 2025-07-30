'use client';

import React from 'react';
import Link from 'next/link';

export default function Welcome() {
  return (
    <>
      <div className="area-welcome">
        <div className="relative px-6 pt-14 pb-4 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-balance wtite:text-gray-700 dark:text-white sm:text-7xl">
                Quotes for Every Occasion
              </h1>
              <p className="mt-8 font-medium text-pretty text-gray-500">
                Discover a vast collection of over 500,000 quotes, ranging from
                ancient philosophers to world-renowned authors and thinkers. Our
                service offers you daily inspiration, wisdom, and motivation,
                making it easy to find the right words for any situation.
                Whether you’re searching for guidance, reflection, or a spark of
                creativity, you’ll find quotes to suit every mood and need.
              </p>
            </div>
          </div>
        </div>
        <div className="flex pt-4 pb-4 items-center justify-center gap-x-6">
          <Link
            href={`/random`}
            className="rounded-md px-3.5 py-2.5 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none transition"
            title="Get random quotes"
            tabIndex={0}
            aria-label="Get random quotes"
          >
            Get random quotes
          </Link>
          <Link
            href={`https://github.com/t1mm1/app-quotes`}
            className="text-sm/6 font-semibold text-gray-900 dark:text-white"
            title="Get sources on GitHub"
            tabIndex={0}
            aria-label="Get sources on GitHub"
          >
            Learn more <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </>
  );
}
