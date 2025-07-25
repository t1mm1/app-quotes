'use client';

import Navbar from '@/components/navigation/Navbar';
import NotFound from '@/components/common/NotFound';

export default function PageNotFound() {
  return (
    <>
      <div className="min-h-screen">
        <Navbar />
        <NotFound />
      </div>
    </>
  );
}
