'use client';

import { use } from 'react';

import Navbar from '@/components/navigation/Navbar';
import Single from '@/components/quotes/Single';
import Random from '@/components/quotes/Random';

export default function Page({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams.id;

  return (
    <>
      <Navbar />
      <Single id={id} />
      <Random />
    </>
  );
}
