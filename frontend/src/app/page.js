'use client';

import Navbar from '@/components/navigation/Navbar';
import Welcome from '@/components/common/Welcome';
import QuotesSearch from '@/components/quotes/QuotesSearch';

export default function Page() {
  return (
    <>
      <div className="bg-white">
        <Navbar />
        <Welcome />
        <QuotesSearch />
      </div>
    </>
  );
}
