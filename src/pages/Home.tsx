import HomeProfile from '@/components/home/HomeProfile';
import HomeRecentDocument from '@/components/home/HomeRecentDocument';
import HomeSpace from '@/components/home/HomeSpace';
import { Navbar } from '@/components/navbar/Navbar';

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="px-[24px] py-[22px] break-keep">
        <HomeProfile />
        <HomeSpace />
        <HomeRecentDocument />
      </div>
    </>
  );
}
