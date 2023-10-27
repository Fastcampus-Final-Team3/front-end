import CategoryPage from '@/components/category/CategoryPage';
import Navbar from '@/components/navbar/Navbar';
import { useLocation } from 'react-router-dom';

export default function Category() {
  const {
    state: { spaceType },
  } = useLocation();
  return (
    <>
      <Navbar />
      <CategoryPage spaceType={spaceType} />
    </>
  );
}
