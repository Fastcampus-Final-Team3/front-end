import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Wall from './pages/Wall';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/wall/:wallId" element={<Wall />} />
      {/* <Route path="/space/personal" element={<Space />} /> */}
      {/* <Route path="/category" element={<Category />} /> */}
      {/* <Route path="wall/temp" element={<WallAllPage />} /> */}
      {/* <Route path="wall/:wallId" element={<WallAllPage />} /> */}
    </Routes>
  );
}
