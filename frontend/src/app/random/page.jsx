'use client';

import Navbar from '@/components/navigation/Navbar';
import Random from '@/components/common/Random';
import QuotesRandom from '@/components/quotes/QuotesRandom';

export default function Page() {
  return (
    <>
      <div className="bg-white">
        <Navbar />
        <Random />
        <QuotesRandom />
      </div>
    </>
  );
}
