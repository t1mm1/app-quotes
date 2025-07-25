'use client';

import Navbar from '@/components/navigation/Navbar';
import Random from '@/components/common/Random';

export default function Page() {
  return (
    <>
      <div className="bg-white">
        <Navbar />
        <Random />
      </div>
    </>
  );
}
