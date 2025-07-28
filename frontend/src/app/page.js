import Navbar from '@/components/navigation/Navbar';
import Welcome from '@/components/common/Welcome';
import Search from '@/components/quotes/Search';

export default function Page() {
  return (
    <>
      <Navbar />
      <Welcome />
      <Search />
    </>
  );
}
