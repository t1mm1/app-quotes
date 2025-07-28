import Navbar from '@/components/navigation/Navbar';
import Quotes from '@/components/quotes/Random';
import Random from '@/components/common/Random';

export default function Page() {
  return (
    <>
      <Navbar />
      <Random />
      <Quotes />
    </>
  );
}
